"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: string;
  packageName: string;
  notes: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  guestCount: "",
  packageName: "",
  notes: "",
};

export function BookingForm() {
  const searchParams = useSearchParams();
  const presetPackage = useMemo(() => searchParams.get("package") ?? "", [searchParams]);
  const [form, setForm] = useState<FormState>({ ...initialState, packageName: presetPackage });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    setForm((current) => ({ ...current, packageName: presetPackage }));
  }, [presetPackage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback("");

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        guestCount: Number(form.guestCount),
      }),
    });

    const data = (await response.json()) as { message?: string; bookingId?: string };
    setSubmitting(false);
    setFeedback(
      response.ok
        ? `Booking captured. Reference: ${data.bookingId ?? "pending"}.`
        : data.message ?? "Unable to save booking right now.",
    );

    if (response.ok) {
      setForm({ ...initialState, packageName: presetPackage });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 shadow-glow">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["fullName", "Full name"],
          ["email", "Email address"],
          ["phone", "Safaricom phone"],
          ["eventType", "Event type"],
          ["eventDate", "Event date"],
          ["location", "Venue / town"],
          ["guestCount", "Guest count"],
          ["packageName", "Selected package"],
        ].map(([key, label]) => (
          <label key={key} className="space-y-2 text-sm text-copy/75">
            <span>{label}</span>
            <input
              required={key !== "packageName"}
              value={form[key as keyof FormState]}
              onChange={(event) =>
                setForm((current) => ({ ...current, [key]: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block space-y-2 text-sm text-copy/75">
        <span>Event notes</span>
        <textarea
          rows={5}
          value={form.notes}
          onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
          className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
        />
      </label>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-copy/60">
          Booking requests are validated server-side, rate-limited, and ready for M-Pesa deposit collection.
        </p>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send booking"}
        </Button>
      </div>
      {feedback ? <p className="mt-4 text-sm text-turquoise">{feedback}</p> : null}
    </form>
  );
}
