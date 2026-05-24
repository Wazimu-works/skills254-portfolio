import { requireAdminUser } from "@/lib/admin-auth";
import { getContentAdminData } from "@/lib/admin-data";

export default async function AdminCustomizationPage() {
  await requireAdminUser();
  const { data } = await getContentAdminData();

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Website customization</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Control theme colors, homepage banners, hero media, featured mixtapes, and featured courses from stored settings instead of hardcoded values.
        </p>
        <form action="/api/admin/content" method="post" className="mt-6 grid gap-4">
          <input type="hidden" name="mode" value="setting" />
          {[
            ["key", "setting key"],
            ["value", "JSON value"],
          ].map(([name, label]) => (
            <label key={name} className="space-y-2 text-sm text-copy/75">
              <span className="capitalize">{label}</span>
              {name === "value" ? (
                <textarea name={name} rows={5} className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 font-mono text-white outline-none" placeholder='{"heroImage":"/images/dj-avatar.png"}' />
              ) : (
                <input name={name} className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
              )}
            </label>
          ))}
          <button type="submit" className="inline-flex justify-center rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-semibold text-white shadow-neon">
            Save setting
          </button>
        </form>
      </section>

      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Current stored settings</h2>
        <div className="mt-6 space-y-4">
          {data.settings.length === 0 ? (
            <p className="text-sm text-copy/60">No customization settings stored yet.</p>
          ) : (
            data.settings.map((item) => (
              <article key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-turquoise/75">{item.key}</p>
                <pre className="mt-3 overflow-x-auto rounded-2xl bg-base-soft/60 p-4 text-xs text-copy/70">
                  {JSON.stringify(item.value, null, 2)}
                </pre>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
