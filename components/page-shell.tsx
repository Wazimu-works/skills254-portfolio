import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(73,242,255,0.15),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(255,79,168,0.12),transparent_18%),linear-gradient(rgba(73,242,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(73,242,255,0.05)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px]" />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
