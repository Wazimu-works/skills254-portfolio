import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { CoursesSection } from "@/components/sections/courses";

export default function CoursesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Courses"
        title="Professional DJ mentorship products with a clear progression path."
        description="The course page is separated so enrollment traffic, campaign links, and student interest can land on a focused learning offer rather than a mixed portfolio page."
      />
      <CoursesSection />
    </PageShell>
  );
}
