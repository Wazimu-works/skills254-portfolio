import { AudioLines, Mic2, Sparkles, Waves } from "lucide-react";
import { skills } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [AudioLines, Waves, Mic2, Sparkles];

export function SkillsSection() {
  return (
    <section id="sound" className="py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Signature Sound"
          title="A premium booth style built for vibe, clarity, and movement."
          description="The site positions the DJ as both a performer and a creative operator: smooth transitions, crowd awareness, strong visual identity, and a clear upgrade path into lessons or bookings."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {skills.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.title} className="glass rounded-[1.75rem] p-6 shadow-glow">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-turquoise/20 bg-turquoise/10 p-3 text-turquoise">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-copy/70">{item.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
