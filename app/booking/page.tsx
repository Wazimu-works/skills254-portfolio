import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";

export default function BookingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Book Deejay Skills 254"
        title="Submit event details and hold your date."
        description="This route remains available as a focused booking landing page for social links, QR campaigns, and direct client outreach."
      />
      <section className="shell py-20">
        <Suspense>
          <BookingForm />
        </Suspense>
      </section>
    </PageShell>
  );
}
