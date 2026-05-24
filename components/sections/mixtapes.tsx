import Image from "next/image";
import { Play } from "lucide-react";
import { mixtapes } from "@/content/site";
import { mixtapeGenreOrder } from "@/content/admin-config";
import { SectionHeading } from "@/components/ui/section-heading";

export function MixtapesSection() {
  const groupedMixtapes = mixtapeGenreOrder
    .map((genre) => ({
      genre,
      items: mixtapes.filter((mix) => mix.genre === genre),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="mixtapes" className="py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="YouTube Mixtapes"
          title="Fast-loading mixtape previews, organized by genre in performance order."
          description="The mixtape page is now categorized for OHANGLAH, RHUMBA, BONGO, LINGALA, AFROBEAT, KOMPA MUSIC, and REGGEA so visitors and clients can browse by vibe immediately."
        />

        <div className="mt-10 space-y-12">
          {groupedMixtapes.map((group) => (
            <div key={group.genre}>
              <div className="mb-6 flex items-center gap-4">
                <p className="font-display text-2xl text-white">{group.genre}</p>
                <div className="h-px flex-1 bg-gradient-to-r from-turquoise/50 to-transparent" />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {group.items.map((mix) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
