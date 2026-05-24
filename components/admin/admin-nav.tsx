"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AudioLines,
  BarChart3,
  BookOpen,
  Home,
  LayoutTemplate,
  LibraryBig,
  Palette,
  Settings2,
  Ticket,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/cn";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/mixtapes", label: "Mixtapes", icon: AudioLines },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/bookings", label: "Bookings", icon: Ticket },
  { href: "/admin/pricing", label: "Pricing", icon: WalletCards },
  { href: "/admin/payments", label: "Payments", icon: Settings2 },
  { href: "/admin/content", label: "Content", icon: LayoutTemplate },
  { href: "/admin/media", label: "Media", icon: LibraryBig },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/customization", label: "Customization", icon: Palette },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {adminLinks.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition",
              active
                ? "border-turquoise/35 bg-turquoise/12 text-white shadow-glow"
                : "border-white/10 bg-white/5 text-copy/70 hover:border-white/20 hover:text-white",
            )}
          >
            <Icon className={cn("size-4", active ? "text-turquoise" : "text-copy/50")} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
