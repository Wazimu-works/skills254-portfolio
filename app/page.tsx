import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { MixtapesSection } from "@/components/sections/mixtapes";
import { CoursesSection } from "@/components/sections/courses";
import { PackagesSection } from "@/components/sections/packages";
import { EventsSection } from "@/components/sections/events";
import { BookingForm } from "@/components/booking-form";
import { ContactForm } from "@/components/contact-form";
import { PaymentCard } from "@/components/payment-card";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/ui/section-heading";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(73,242,255,0.15),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(255,79,168,0.12),transparent_18%),linear-gradient(rgba(73,242,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(73,242,255,0.05)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px]" />
        <HeroSection />
        <SkillsSection />
        <MixtapesSection />
        <CoursesSection />
        <PackagesSection />
        <EventsSection />

        <section id="booking" className="py-24">
          <div className="shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <SectionHeading
                eyebrow="Bookings and Contact"
                title="One polished surface for event leads, direct contact, and mobile payments."
                description="The conversion layer is already shaped around secure API routes, Supabase inserts, and Daraja callbacks. Once your live credentials are added in Vercel, the payment flow can move from mock mode to production."
              />
              <div className="mt-8">
                <Suspense>
                  <BookingForm />
                </Suspense>
              </div>
            </div>

            <div className="space-y-6">
              <PaymentCard />
              <section id="contact">
                <ContactForm />
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
