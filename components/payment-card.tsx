"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PaymentCard() {
  const [form, setForm] = useState({
    phone: "",
    amount: "15000",
    paymentType: "course",
    description: "DJ Course Payment",
  });
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback("");

    const response = await fetch("/api/payments/stk-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
      }),
    });

    const data = (await response.json()) as { message?: string; customerMessage?: string };
    setSubmitting(false);
    setFeedback(response.ok ? data.customerMessage ?? "Prompt sent to phone." : data.message ?? "Payment failed.");
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 shadow-glow">
      <p className="eyebrow">M-Pesa STK Push</p>
      <h3 className="mt-3 font-display text-2xl text-white">Payment-ready flow</h3>
      <p className="mt-3 text-sm leading-7 text-copy/70">
        This secure server route scaffolds course payments, booking deposits, and premium mixtape unlocks without exposing Daraja secrets in the browser.
      </p>
      <div className="mt-6 grid gap-4">
        <input
          placeholder="Safaricom phone number"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
        />
        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
          className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
        />
        <select
          value={form.paymentType}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              paymentType: event.target.value,
              description:
                event.target.value === "booking"
                  ? "Booking Deposit"
                  : event.target.value === "mixtape"
                    ? "Premium Mixtape Access"
                    : "DJ Course Payment",
            }))
          }
          className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
        >
          <option value="course">Course payment</option>
          <option value="booking">Booking deposit</option>
          <option value="mixtape">Premium mixtape</option>
        </select>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-copy/60">Sandbox-safe when credentials are not configured.</p>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Trigger STK Push"}
        </Button>
      </div>
      {feedback ? <p className="mt-4 text-sm text-turquoise">{feedback}</p> : null}
    </form>
  );
}
