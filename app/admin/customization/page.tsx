import { requireAdminUser } from "@/lib/admin-auth";
import { getContentAdminData } from "@/lib/admin-data";
import { homepageCustomizationSections, themePalettes } from "@/content/admin-config";

export default async function AdminCustomizationPage() {
  await requireAdminUser();
  const { data } = await getContentAdminData();

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-3">
        {themePalettes.map((palette) => (
          <article key={palette.name} className="glass rounded-[1.75rem] p-6 shadow-glow">
            <h2 className="font-display text-2xl text-white">{palette.name}</h2>
            <p className="mt-3 text-sm leading-7 text-copy/70">{palette.description}</p>
            <div className="mt-6 flex gap-3">
              {palette.colors.map((color) => (
                <span
                  key={color}
                  className="size-12 rounded-2xl border border-white/10 shadow-glow"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <form action="/api/admin/content" method="post" className="mt-6">
              <input type="hidden" name="mode" value="setting" />
              <input type="hidden" name="key" value="theme_colors" />
              <input
                type="hidden"
                name="value"
                value={JSON.stringify({
                  palette: palette.name,
                  primary: palette.colors[0],
                  secondary: palette.colors[1],
                  accent: palette.colors[2],
                  background: palette.colors[3],
                })}
              />
              <button type="submit" className="inline-flex justify-center rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-semibold text-white shadow-neon">
                Apply palette
              </button>
            </form>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Website customization</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Control theme colors, homepage banners, hero media, featured mixtapes, and featured courses from stored settings instead of hardcoded values.
        </p>
        <div className="mt-6 space-y-5">
          {homepageCustomizationSections.map((section) => (
            <form key={section.key} action="/api/admin/content" method="post" className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <input type="hidden" name="mode" value="setting" />
              <input type="hidden" name="key" value={section.key} />
              <div className="mb-4">
                <h3 className="font-display text-xl text-white">{section.title}</h3>
              </div>
              <textarea
                name="value"
                rows={5}
                className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 font-mono text-white outline-none"
                placeholder={section.placeholder}
              />
              <button type="submit" className="mt-4 inline-flex justify-center rounded-full border border-turquoise/30 bg-turquoise/10 px-5 py-3 text-sm font-semibold text-white shadow-neon">
                Save {section.title}
              </button>
            </form>
          ))}
        </div>
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
      </section>
    </div>
  );
}
