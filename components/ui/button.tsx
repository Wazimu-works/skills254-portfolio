import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ href, children, className, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-semibold text-white shadow-neon transition hover:-translate-y-0.5 hover:bg-turquoise/20",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
