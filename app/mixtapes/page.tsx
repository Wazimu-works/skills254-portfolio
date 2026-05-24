import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { MixtapesSection } from "@/components/sections/mixtapes";

export default function MixtapesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Mixtapes"
        title="Public drops, premium sessions, and clean playback-ready discovery."
        description="This route is positioned for public YouTube mixes today and private Supabase-backed premium sessions later, without needing to restructure the content model."
      />
      <MixtapesSection />
    </PageShell>
  );
}
