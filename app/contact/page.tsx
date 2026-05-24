import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { PaymentCard } from "@/components/payment-card";

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Bookings, direct inquiries, and M-Pesa payment actions in one focused place."
        description="This page handles the practical conversion layer: event requests, collaboration messages, and payment initiation through secure server routes."
      />
      <section className="py-24">
        <div className="shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="max-w-2xl">
              <p className="eyebrow">Booking Intake</p>
              <h2 className="section-title mt-3">Send event details and reserve your date.</h2>
              <p className="mt-4 text-sm leading-7 text-copy/75 sm:text-base">
                Booking requests are validated server-side and designed to connect directly into payment confirmation and admin workflows.
              </p>
            </div>
            <div className="mt-8">
              <Suspense>
                <BookingForm />
              </Suspense>
            </div>
          </div>

          <div className="space-y-6">
            <PaymentCard />
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
