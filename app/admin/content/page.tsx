import { requireAdminUser } from "@/lib/admin-auth";
import { getContentAdminData } from "@/lib/admin-data";

export default async function AdminContentPage() {
  await requireAdminUser();
  const { data } = await getContentAdminData();

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Editable content records</h2>
        <div className="mt-6 space-y-4">
          {data.content.length === 0 ? (
            <p className="text-sm text-copy/60">No site content records yet. Seed hero/about/contact records in Supabase to manage them here.</p>
          ) : (
            data.content.map((item) => (
              <article key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-turquoise/75">{item.key}</p>
                <h3 className="mt-2 font-display text-xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-copy/70">{item.body}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Content editor</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Manage homepage copy, hero messaging, about copy, CTA text, social links, and contact details without editing source files.
        </p>
        <form action="/api/admin/content" method="post" className="mt-6 grid gap-4">
          {["content key", "title"].map((label) => (
            <label key={label} className="space-y-2 text-sm text-copy/75">
              <span className="capitalize">{label}</span>
              <input name={label.replace(" ", "_")} className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
            </label>
          ))}
          <label className="space-y-2 text-sm text-copy/75">
            <span>Body</span>
            <textarea name="body" rows={5} className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
          </label>
          <label className="space-y-2 text-sm text-copy/75">
            <span>Metadata (JSON)</span>
            <textarea name="metadata" rows={5} className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 font-mono text-white outline-none" placeholder='{"ctaText":"Book now"}' />
          </label>
          <button type="submit" className="inline-flex justify-center rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-semibold text-white shadow-neon">
            Save content record
          </button>
        </form>
      </section>
    </div>
  );
}
