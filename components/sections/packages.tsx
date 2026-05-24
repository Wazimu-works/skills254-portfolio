import { ArrowUpRight } from "lucide-react";
import { packages } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function PackagesSection() {
  return (
    <section id="packages" className="py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Event Packages"
          title="Clear package options that sell confidence before the first call."
          description="Packages balance speed and trust: the visitor understands the tier, sees the expected deposit, and can move into a booking or STK Push flow without leaving the site."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-4">
          {packages.map((item, index) => (
            <article
              key={item.name}
              className="glass flex h-full flex-col rounded-[2rem] p-6 shadow-glow"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-2xl text-white">{item.name}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-copy/65">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-4 font-display text-4xl text-white">{item.price}</p>
              <p className="mt-3 text-sm text-copy/60">Deposit via M-Pesa: {item.deposit}</p>
              <p className="mt-6 flex-1 text-sm leading-7 text-copy/70">{item.details}</p>
              <a
                href={`/booking?package=${encodeURIComponent(item.name)}`}
                className="mt-8 inline-flex items-center gap-2 text-sm text-turquoise transition hover:text-white"
              >
                Start booking
                <ArrowUpRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
