"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AdminLoginForm({ next }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase public credentials are not configured.");
      setBusy(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setBusy(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    window.location.href = next || "/admin";
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 shadow-glow sm:p-8">
      <div className="grid gap-4">
        <label className="space-y-2 text-sm text-copy/75">
          <span>Admin email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
          />
        </label>
        <label className="space-y-2 text-sm text-copy/75">
          <span>Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 pr-12 text-white outline-none transition focus:border-turquoise/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-copy/60 transition hover:bg-white/5 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </label>
      </div>
      <button
        type="submit"
        disabled={busy}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-semibold text-white shadow-neon transition hover:bg-turquoise/20"
      >
        {busy ? "Signing in..." : "Sign in to admin"}
      </button>
      {error ? <p className="mt-4 text-sm text-pink">{error}</p> : null}
    </form>
  );
}
