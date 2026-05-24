import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { EventsSection } from "@/components/sections/events";

export default function EventsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Events"
        title="A dedicated page for social proof, venue credibility, and upcoming dates."
        description="The events route makes it easier to promote appearances, showcase momentum, and later load schedule data directly from Supabase without bloating the homepage."
      />
      <EventsSection />
    </PageShell>
  );
}
