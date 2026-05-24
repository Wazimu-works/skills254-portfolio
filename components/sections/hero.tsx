import Image from "next/image";
import { ArrowRight, Disc3, Sparkles } from "lucide-react";
import { heroStats } from "@/content/site";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-14 sm:pt-20">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-copy/75 shadow-glow">
            <Sparkles className="size-3.5 text-pink" />
            Nairobi DJ brand, performance portfolio, and course hub
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Calm futuristic energy for{" "}
            <span className="bg-gradient-to-r from-turquoise via-white to-pink bg-clip-text text-transparent">
              unforgettable nights.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-copy/75 sm:text-lg">
            Deejay Skills 254 blends premium nightclub atmosphere, clean event curation,
            and practical DJ mentorship into one polished digital presence.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#booking">
              Reserve a date
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              href="#mixtapes"
              className="border-white/15 bg-white/5 shadow-none hover:bg-white/10"
            >
              Explore mixtapes
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map((item) => (
              <div key={item.label} className="glass rounded-3xl p-5 shadow-glow">
                <p className="font-display text-3xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-copy/65">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-8 inset-y-12 rounded-full bg-turquoise/10 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] border border-white/10 p-4 shadow-neon">
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-base/60 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-copy/70">
              <Disc3 className="size-3.5 text-turquoise" />
              Live Frequency
            </div>
            <div className="absolute inset-x-10 top-20 h-px bg-gradient-to-r from-transparent via-turquoise/60 to-transparent animate-pulseLine" />
            <Image
              src="/images/dj-avatar.png"
              alt="Deejay Skills 254 portrait"
              width={900}
              height={1100}
              priority
              className="h-[520px] w-full rounded-[1.5rem] object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
