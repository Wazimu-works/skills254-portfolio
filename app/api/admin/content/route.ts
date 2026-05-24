import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { getAuthenticatedUser, isAdminUser } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user || !(await isAdminUser(user.id, user.app_metadata?.role ?? null))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const mode = formData.get("mode")?.toString() ?? "content";
  const admin = createSupabaseAdminClient();

  if (!admin) {
    return NextResponse.redirect(new URL("/admin/content", request.url));
  }

  if (mode === "setting") {
    const key = formData.get("key")?.toString().trim();
    const value = formData.get("value")?.toString().trim();

    if (!key || !value) {
      return NextResponse.redirect(new URL("/admin/customization", request.url));
    }

    let parsedValue: unknown = value;
    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }

    await admin.from("site_settings").upsert(
      {
        key,
        value: parsedValue,
      },
      { onConflict: "key" },
    );

    return NextResponse.redirect(new URL("/admin/customization", request.url));
  }

  const key = formData.get("content_key")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const body = formData.get("body")?.toString().trim();
  const metadata = formData.get("metadata")?.toString().trim();

  if (!key || !title || !body) {
    return NextResponse.redirect(new URL("/admin/content", request.url));
  }

  let parsedMetadata: unknown = null;
  if (metadata) {
    try {
      parsedMetadata = JSON.parse(metadata);
    } catch {
      parsedMetadata = { raw: metadata };
    }
  }

  await admin.from("site_content").upsert(
    {
      key,
      title,
      body,
      metadata: parsedMetadata,
    },
    { onConflict: "key" },
  );

  return NextResponse.redirect(new URL("/admin/content", request.url));
}
