import { requireAdminUser } from "@/lib/admin-auth";
import { getCoursesAdminData } from "@/lib/admin-data";

export default async function AdminCoursesPage() {
  await requireAdminUser();
  const { data } = await getCoursesAdminData();

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Course catalog</h2>
        <div className="mt-6 space-y-4">
          {data.courses.length === 0 ? (
            <p className="text-sm text-copy/60">No courses found yet.</p>
          ) : (
            data.courses.map((course) => {
              const moduleCount = data.modules.filter((module) => module.course_id === course.id).length;
              return (
                <article key={course.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl text-white">{course.title}</h3>
                      <p className="mt-2 text-sm text-copy/60">{course.level ?? "Unspecified level"}</p>
                      <p className="mt-2 text-sm text-copy/70">{course.summary ?? "No summary yet."}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-white">KSh {(course.price_kes ?? 0).toLocaleString()}</p>
                      <p className="mt-1 text-sm text-copy/55">{course.enrollments_count ?? 0} enrollments</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-copy/65">{moduleCount} modules</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-copy/65">{course.is_active ? "Active" : "Draft"}</span>
                    <span className="rounded-full border border-turquoise/20 bg-turquoise/10 px-3 py-1 text-turquoise">{course.is_premium ? "Premium" : "Free"}</span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Course builder</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Create courses, add lessons or modules, attach PDFs, audio, and videos, then control payment-gated access and downloadable resources through Supabase storage paths.
        </p>
        <div className="mt-6 grid gap-4">
          {["Course title", "Level", "Price (KSh)", "Cover image path", "Primary course file path"].map((label) => (
            <label key={label} className="space-y-2 text-sm text-copy/75">
              <span>{label}</span>
              <input className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
            </label>
          ))}
          <label className="space-y-2 text-sm text-copy/75">
            <span>Course summary</span>
            <textarea rows={4} className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Premium course", "Allow download resources"].map((label) => (
              <label key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-copy/75">
                <input type="checkbox" className="size-4 accent-cyan-400" />
                {label}
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
