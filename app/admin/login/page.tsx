import { redirect } from "next/navigation";
import { Radio } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAuthenticatedUser, isAdminUser } from "@/lib/admin-auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const user = await getAuthenticatedUser();

  if (user) {
    const allowed = await isAdminUser(user.id, user.app_metadata?.role ?? null);
    if (allowed) {
      redirect("/admin");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base bg-hero-radial px-4 py-12">
      <div className="w-full max-w-md">
        <div className="glass mb-6 rounded-[2rem] p-8 text-center shadow-glow">
          <span className="mx-auto inline-flex rounded-full border border-turquoise/30 bg-turquoise/10 p-3 text-turquoise shadow-neon">
            <Radio className="size-5" />
          </span>
          <p className="eyebrow mt-5">Admin Login</p>
          <h1 className="mt-3 font-display text-4xl text-white">Skills 254 Control Center</h1>
          <p className="mt-4 text-sm leading-7 text-copy/70">
            Sign in with a Supabase Auth admin account. Access is granted to users marked as admin in Supabase.
          </p>
          {params.error === "forbidden" ? (
            <p className="mt-4 text-sm text-pink">
              This account is authenticated but not allowed into the admin workspace.
            </p>
          ) : null}
        </div>
        <AdminLoginForm next={params.next} />
      </div>
    </main>
  );
}
