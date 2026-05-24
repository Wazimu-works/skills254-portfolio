import { requireAdminUser } from "@/lib/admin-auth";
import { getMixtapesAdminData } from "@/lib/admin-data";

export default async function AdminMixtapesPage() {
  await requireAdminUser();
  const { data } = await getMixtapesAdminData();

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Mixtape library</h2>
        <div className="mt-6 space-y-4">
          {data.length === 0 ? (
            <p className="text-sm text-copy/60">No mixtapes found. Add your first mix from the manager panel.</p>
          ) : (
            data.map((mix) => (
              <article key={mix.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-white">{mix.title}</h3>
                    <p className="mt-2 text-sm text-copy/60">{mix.genre ?? "No genre set"}</p>
                    <p className="mt-2 text-sm text-copy/70">{mix.description ?? "No description yet."}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mix.is_featured ? <span className="rounded-full border border-turquoise/20 bg-turquoise/10 px-3 py-1 text-xs text-turquoise">Featured</span> : null}
                    {mix.is_trending ? <span className="rounded-full border border-pink/25 bg-pink/10 px-3 py-1 text-xs text-pink">Trending</span> : null}
                    {mix.is_premium ? <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white">Premium</span> : null}
                  </div>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-copy/60 md:grid-cols-2">
                  <p>Plays: {(mix.play_count ?? 0).toLocaleString()}</p>
                  <p>Tags: {(mix.tags ?? []).join(", ") || "None"}</p>
                  <p>Audio: {mix.audio_file_path ?? "Not uploaded"}</p>
                  <p>Video: {mix.video_file_path ?? "Not uploaded"}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Mix manager</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Use this structure for uploading audio/video mixes, adding YouTube links, thumbnails, genre tags, and premium flags. Wire the form to Supabase inserts or uploads as you finish live data setup.
        </p>
        <div className="mt-6 grid gap-4">
          {[
            "Title",
            "Genre tags",
            "YouTube link",
            "Thumbnail asset path",
            "Audio mix path",
            "Video mix path",
          ].map((label) => (
            <label key={label} className="space-y-2 text-sm text-copy/75">
              <span>{label}</span>
              <input className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
            </label>
          ))}
          <label className="space-y-2 text-sm text-copy/75">
            <span>Description</span>
            <textarea rows={5} className="w-full rounded-3xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Featured", "Trending", "Premium"].map((flag) => (
              <label key={flag} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-copy/75">
                <input type="checkbox" className="size-4 accent-cyan-400" />
                {flag}
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
