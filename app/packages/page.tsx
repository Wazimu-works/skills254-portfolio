import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { PackagesSection } from "@/components/sections/packages";

export default function PackagesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Packages"
        title="Transparent event packages designed to convert faster and reduce friction."
        description="Each offer is separated into its own browsing context so clients can compare tiers, understand deposits, and move directly into the booking pipeline."
      />
      <PackagesSection />
    </PageShell>
  );
}
