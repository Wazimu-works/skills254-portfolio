import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { sendStkPush } from "@/lib/mpesa";
import { rateLimit } from "@/lib/rate-limit";
import { normalizeKenyanPhone, stkPushSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limit = rateLimit({ key: `stk:${ip}`, limit: 5, windowMs: 60_000 });

  if (!limit.allowed) {
    return NextResponse.json({ message: "Too many payment attempts." }, { status: 429 });
  }

  const payload = await request.json();
  const parsed = stkPushSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const reference = parsed.data.referenceId ?? crypto.randomUUID();

  let paymentRecordId = reference;

  if (supabase) {
    const { data, error } = await supabase
      .from("payments")
      .insert({
        id: reference,
        payment_type: parsed.data.paymentType,
        amount: parsed.data.amount,
        phone: normalizeKenyanPhone(parsed.data.phone),
        description: parsed.data.description,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    paymentRecordId = data.id;
  }

  try {
    const mpesaResponse = await sendStkPush({
      phone: parsed.data.phone,
      amount: parsed.data.amount,
      accountReference: paymentRecordId.slice(0, 12),
      description: parsed.data.description,
    });

    if (supabase) {
      await supabase
        .from("payments")
        .update({
          merchant_request_id: mpesaResponse.MerchantRequestID,
          checkout_request_id: mpesaResponse.CheckoutRequestID,
          provider_response: mpesaResponse,
        })
        .eq("id", paymentRecordId);
    }

    return NextResponse.json({
      customerMessage:
        mpesaResponse.CustomerMessage ?? "STK Push sent. Check your phone to confirm.",
      paymentId: paymentRecordId,
      provider: mpesaResponse,
    });
  } catch (error) {
    if (supabase) {
      await supabase
        .from("payments")
        .update({
          status: "failed",
          provider_response: { error: error instanceof Error ? error.message : "Unknown error" },
        })
        .eq("id", paymentRecordId);
    }

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Payment failed." },
      { status: 500 },
    );
  }
}
