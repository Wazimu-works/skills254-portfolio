import { redirect } from "next/navigation";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function isAdminUser(userId: string, appRole?: string | null) {
  if (appRole === "admin") {
    return true;
  }

  const adminClient = createSupabaseAdminClient();
  if (!adminClient) {
    return false;
  }

  const { data, error } = await adminClient
    .from("admin_users")
    .select("id")
    .eq("id", userId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    return false;
  }

  return Boolean(data);
}

export async function requireAdminUser() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  const allowed = await isAdminUser(user.id, user.app_metadata?.role ?? null);

  if (!allowed) {
    redirect("/admin/login?error=forbidden");
  }

  return user;
}
