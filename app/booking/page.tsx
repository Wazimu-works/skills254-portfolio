import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function BookingPage() {
  return (
    <>
      <SiteHeader />
      <main className="shell py-20">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Book Deejay Skills 254</p>
          <h1 className="section-title mt-3">Submit event details and hold your date.</h1>
          <p className="mt-4 text-copy/70">
            This page is split out so campaigns, QR codes, and social links can send traffic directly into the booking flow.
          </p>
        </div>
        <Suspense>
          <BookingForm />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
