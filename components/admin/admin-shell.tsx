import type { ReactNode } from "react";
import { Radio } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminSignOut } from "@/components/admin/admin-sign-out";

export function AdminShell({
  title = "Futuristic admin workspace for bookings, content, payments, and media.",
  description = "This control center is authenticated through Supabase Auth and organized around DJ operations instead of generic CMS screens.",
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base bg-hero-radial text-copy">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[280px_1fr]">
        <aside className="glass rounded-[2rem] p-5 shadow-glow">
          <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-6">
            <span className="rounded-full border border-turquoise/30 bg-turquoise/10 p-2 text-turquoise shadow-neon">
              <Radio className="size-4" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-white">Skills 254 Admin</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-copy/50">
                Control Center
              </p>
            </div>
          </div>

          <AdminNav />
        </aside>

        <div className="space-y-6">
          <header className="glass flex flex-col gap-5 rounded-[2rem] p-6 shadow-glow sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow">Supabase Authenticated Admin</p>
              <h1 className="section-title mt-3">{title}</h1>
              <p className="mt-4 text-sm leading-7 text-copy/75">{description}</p>
            </div>
            <AdminSignOut />
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
