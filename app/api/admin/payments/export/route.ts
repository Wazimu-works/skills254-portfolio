import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getAuthenticatedUser, isAdminUser } from "@/lib/admin-auth";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user || !(await isAdminUser(user.id, user.app_metadata?.role ?? null))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.json({ message: "Supabase admin client missing." }, { status: 503 });
  }

  const { data } = await admin
    .from("payments")
    .select("id,status,receipt_number,phone,payment_type,description,amount,paid_amount,created_at")
    .order("created_at", { ascending: false });

  const rows = [
    ["id", "status", "receipt_number", "phone", "payment_type", "description", "amount", "paid_amount", "created_at"].join(","),
    ...(data ?? []).map((item) =>
      [
        item.id,
        item.status,
        item.receipt_number ?? "",
        item.phone ?? "",
        item.payment_type,
        `"${(item.description ?? "").replace(/"/g, '""')}"`,
        item.amount ?? 0,
        item.paid_amount ?? 0,
        item.created_at ?? "",
      ].join(","),
    ),
  ].join("\n");

  return new NextResponse(rows, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="skills254-payments.csv"',
    },
  });
}
