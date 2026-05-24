import { requireAdminUser } from "@/lib/admin-auth";
import { djAssetSections } from "@/content/admin-config";

export default async function AdminDjAssetsPage() {
  await requireAdminUser();

  return (
    <div className="space-y-6">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">DJ asset collections</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Manage extendeds, acapellas, redrums, genre playlists, and clean HD videos as dedicated asset groups for performance prep and premium distribution.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {djAssetSections.map((section) => (
          <article key={section.title} className="glass rounded-[1.75rem] p-6 shadow-glow">
            <h3 className="font-display text-2xl text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-copy/70">{section.description}</p>
            <div className="mt-6 rounded-[1.5rem] border border-dashed border-turquoise/25 bg-white/5 px-4 py-8 text-center text-sm text-copy/65">
              Upload manager placeholder for {section.title}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
