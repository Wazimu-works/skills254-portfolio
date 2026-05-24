"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFeedback("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    const data = (await response.json()) as { message?: string };
    setSubmitting(false);
    setFeedback(response.ok ? "Message sent." : data.message ?? "Unable to send message.");

    if (response.ok) {
      setState({ name: "", email: "", phone: "", subject: "", message: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-6 shadow-glow">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["name", "Name"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["subject", "Subject"],
        ].map(([key, label]) => (
          <label key={key} className="space-y-2 text-sm text-copy/75">
            <span>{label}</span>
            <input
              required={key !== "phone"}
              value={state[key as keyof typeof state]}
              onChange={(event) =>
                setState((current) => ({ ...current, [key]: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block space-y-2 text-sm text-copy/75">
        <span>Message</span>
        <textarea
          rows={5}
          required
          value={state.message}
          onChange={(event) => setState((current) => ({ ...current, message: event.target.value }))}
          className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
        />
      </label>
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-copy/60">For gigs, collabs, interviews, and workshop inquiries.</p>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send message"}
        </Button>
      </div>
      {feedback ? <p className="mt-4 text-sm text-turquoise">{feedback}</p> : null}
    </form>
  );
}
