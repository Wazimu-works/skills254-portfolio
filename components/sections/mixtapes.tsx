import Image from "next/image";
import { Play } from "lucide-react";
import { mixtapes } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function MixtapesSection() {
  return (
    <section id="mixtapes" className="py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="YouTube Mixtapes"
          title="Fast-loading mixtape previews with room for premium unlocks later."
          description="The UI uses lightweight artwork cards and keeps heavy embeds out of the initial render, so the homepage stays fast while leaving a clean path for gated private mixes through Supabase signed URLs."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {mixtapes.map((mix) => (
            <article key={mix.title} className="glass group overflow-hidden rounded-[2rem] shadow-glow">
              <div className="relative">
                <Image
                  src={mix.image}
                  alt={mix.title}
                  width={900}
                  height={700}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <a
                  href={mix.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-base/35 opacity-0 transition group-hover:opacity-100"
                >
                  <span className="rounded-full border border-white/20 bg-white/10 p-5 text-white shadow-neon">
                    <Play className="size-6 fill-white" />
                  </span>
                </a>
              </div>
              <div className="p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-turquoise/75">
                  {mix.genre}
                </p>
                <h3 className="mt-3 font-display text-2xl text-white">{mix.title}</h3>
                <p className="mt-2 text-sm text-copy/65">{mix.duration}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
