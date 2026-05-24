import { GraduationCap } from "lucide-react";
import { courses } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function CoursesSection() {
  return (
    <section id="courses" className="py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="DJ Courses"
          title="Structured mentorship products with a clean payment-ready path."
          description="Each course block is designed to connect naturally to Daraja STK Push, a Supabase payment record, and later a gated student resource area stored in private buckets."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {courses.map((course) => (
            <article key={course.title} className="glass rounded-[2rem] p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-copy/70">
                  {course.level}
                </span>
                <GraduationCap className="size-5 text-pink" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-white">{course.title}</h3>
              <p className="mt-4 text-sm leading-7 text-copy/70">{course.summary}</p>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="font-display text-3xl text-white">{course.price}</p>
                  <p className="mt-2 text-sm text-copy/60">{course.duration}</p>
                </div>
                <a href="/contact" className="text-sm text-turquoise transition hover:text-white">
                  Enroll interest
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
