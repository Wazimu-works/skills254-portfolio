"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminSignOut() {
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    setBusy(true);
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-copy/75 transition hover:border-white/20 hover:text-white"
    >
      <LogOut className="size-4" />
      {busy ? "Signing out..." : "Sign out"}
    </button>
  );
}
