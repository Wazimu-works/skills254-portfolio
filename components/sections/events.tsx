import { CalendarDays, MapPin } from "lucide-react";
import { events } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function EventsSection() {
  return (
    <section id="events" className="py-24">
      <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Upcoming Events"
          title="Visible social proof for clubs, festivals, and destination sets."
          description="This section makes recent and upcoming gigs feel alive while staying easy to maintain from Supabase later."
        />

        <div className="space-y-4">
          {events.map((event) => (
            <article
              key={event.name}
              className="glass flex flex-col gap-5 rounded-[1.75rem] p-6 shadow-glow sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-display text-2xl text-white">{event.name}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-copy/65">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4 text-turquoise" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-pink" />
                    {event.venue}, {event.city}
                  </span>
                </div>
              </div>
              <a
                href="#contact"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-turquoise/35 hover:text-turquoise"
              >
                Request invite
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
