import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getAuthenticatedUser, isAdminUser } from "@/lib/admin-auth";

const allowedStatuses = new Set(["pending", "confirmed", "completed", "cancelled"]);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthenticatedUser();
  if (!user || !(await isAdminUser(user.id, user.app_metadata?.role ?? null))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const formData = await request.formData();
  const status = formData.get("status")?.toString() ?? "";

  if (!allowedStatuses.has(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    return NextResponse.redirect(new URL("/admin/bookings", request.url));
  }

  await admin
    .from("bookings")
    .update({ status })
    .eq("id", id);

  return NextResponse.redirect(new URL("/admin/bookings", request.url));
}
