import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { SkillsSection } from "@/components/sections/skills";

export default function SoundPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Sound"
        title="The Deejay Skills 254 sound is engineered for momentum, balance, and memory."
        description="This page isolates the performance identity from the rest of the portfolio so visitors can understand the mixing discipline, genre flexibility, and event philosophy without scrolling through unrelated content."
      />
      <SkillsSection />
    </PageShell>
  );
}
