"use client";

import { Menu, Radio } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base/60 backdrop-blur-2xl">
      <div className="shell flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <span className="rounded-full border border-turquoise/30 bg-turquoise/10 p-2 text-turquoise shadow-neon">
            <Radio className="size-4" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-white">Deejay Skills 254</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-copy/55">
              Future Club Portfolio
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-copy/70 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#booking">Book The Vibe</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/10 p-3 text-white md:hidden"
        >
          <Menu className="size-4" />
        </button>
      </div>

      <div className={cn("md:hidden", open ? "block" : "hidden")}>
        <div className="shell flex flex-col gap-4 pb-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-copy/80"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
