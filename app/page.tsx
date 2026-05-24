import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/hero";
import { MixtapesSection } from "@/components/sections/mixtapes";
import { CoursesSection } from "@/components/sections/courses";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";

const featureLinks = [
  {
    title: "Sound",
    href: "/sound",
    copy: "Learn the mixing style, event curation approach, and signature energy behind the brand.",
  },
  {
    title: "Packages",
    href: "/packages",
    copy: "Explore booking tiers, deposits, and event-fit options for clubs, weddings, and festivals.",
  },
  {
    title: "Events",
    href: "/events",
    copy: "See the latest live appearances, venue profile, and upcoming city dates.",
  },
  {
    title: "Contact",
    href: "/contact",
    copy: "Send booking details, direct inquiries, or trigger a payment-ready M-Pesa flow.",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />

      <section className="py-24">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Explore The Brand</p>
              <h2 className="section-title mt-3">Each major section now lives on its own dedicated page.</h2>
              <p className="mt-4 text-sm leading-7 text-copy/75 sm:text-base">
                The home page stays focused as the main landing experience, while detailed browsing flows move into individual routes for better clarity and scalability.
              </p>
            </div>
            <Button href="/contact">Start a booking</Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass rounded-[2rem] p-6 shadow-glow transition hover:-translate-y-1 hover:border-turquoise/25"
              >
                <h3 className="font-display text-2xl text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-copy/70">{item.copy}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-turquoise">
                  Open page
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MixtapesSection />
      <CoursesSection />
    </PageShell>
  );
}
