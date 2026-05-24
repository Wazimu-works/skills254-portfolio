import { requireAdminUser } from "@/lib/admin-auth";
import { getAnalyticsAdminData } from "@/lib/admin-data";

export default async function AdminAnalyticsPage() {
  await requireAdminUser();
  const { data } = await getAnalyticsAdminData();

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Operational insights</h2>
        <div className="mt-6 space-y-4">
          {data.snapshots.length === 0 ? (
            <p className="text-sm text-copy/60">
              No analytics snapshots recorded yet. This page is ready for metrics such as booking conversion, visitor countries, device usage, and revenue snapshots.
            </p>
          ) : (
            data.snapshots.slice(0, 8).map((item) => (
              <article key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-turquoise/75">{item.metric_key}</p>
                <h3 className="mt-2 font-display text-xl text-white">{item.metric_label}</h3>
                <p className="mt-3 text-3xl text-white">{item.value_numeric ?? item.value_text ?? "N/A"}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="space-y-6">
        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <h2 className="font-display text-2xl text-white">Most played mixtapes</h2>
          <div className="mt-6 space-y-3">
            {data.topMixtapes.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-sm text-white">{item.title}</span>
                <span className="text-sm text-turquoise">{item.play_count ?? 0} plays</span>
              </div>
            ))}
          </div>
        </article>

        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <h2 className="font-display text-2xl text-white">Top courses</h2>
          <div className="mt-6 space-y-3">
            {data.topCourses.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-sm text-white">{item.title}</span>
                <span className="text-sm text-turquoise">{item.enrollments_count ?? 0} students</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
