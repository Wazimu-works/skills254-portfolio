import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type CallbackPayload = {
  Body?: {
    stkCallback?: {
      CheckoutRequestID?: string;
      MerchantRequestID?: string;
      ResultCode?: number;
      ResultDesc?: string;
      CallbackMetadata?: {
        Item?: Array<{ Name: string; Value?: string | number }>;
      };
    };
  };
};

export async function POST(request: NextRequest) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ message: "Supabase is not configured." }, { status: 503 });
  }

  const payload = (await request.json()) as CallbackPayload;
  const callback = payload.Body?.stkCallback;

  if (!callback?.CheckoutRequestID) {
    return NextResponse.json({ message: "Invalid callback payload." }, { status: 400 });
  }

  const items = callback.CallbackMetadata?.Item ?? [];
  const receipt = items.find((item) => item.Name === "MpesaReceiptNumber")?.Value;
  const amount = items.find((item) => item.Name === "Amount")?.Value;
  const phone = items.find((item) => item.Name === "PhoneNumber")?.Value;

  const status = callback.ResultCode === 0 ? "completed" : "failed";

  const { error } = await supabase
    .from("payments")
    .update({
      status,
      receipt_number: typeof receipt === "string" ? receipt : null,
      paid_amount: typeof amount === "number" ? amount : null,
      phone: typeof phone === "number" ? `${phone}` : null,
      callback_payload: payload,
    })
    .eq("checkout_request_id", callback.CheckoutRequestID);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Callback processed." });
}
