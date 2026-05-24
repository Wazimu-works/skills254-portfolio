import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { bookingSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limit = rateLimit({ key: `booking:${ip}`, limit: 8, windowMs: 60_000 });

  if (!limit.allowed) {
    return NextResponse.json({ message: "Too many booking attempts." }, { status: 429 });
  }

  const payload = await request.json();
  const parsed = bookingSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Supabase is not configured yet. Booking validated locally only." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      full_name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      event_type: parsed.data.eventType,
      event_date: parsed.data.eventDate,
      location: parsed.data.location,
      guest_count: parsed.data.guestCount,
      package_name: parsed.data.packageName,
      notes: parsed.data.notes,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Booking saved.", bookingId: data.id });
}
