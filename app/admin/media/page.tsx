import { MediaFilter } from "@/components/admin/media-filter";
import { requireAdminUser } from "@/lib/admin-auth";
import { getMediaAdminData } from "@/lib/admin-data";

export default async function AdminMediaPage() {
  await requireAdminUser();
  const { data } = await getMediaAdminData();

  return (
    <div className="space-y-6">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Media library</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Central library for images, videos, audio, flyers, logos, and course files with search, filters, folder organization, and upload-ready structure.
        </p>
      </section>

      <section className="glass rounded-[1.75rem] border border-dashed border-turquoise/25 p-8 text-center shadow-glow">
        <p className="font-display text-2xl text-white">Drag and drop upload zone</p>
        <p className="mt-3 text-sm text-copy/65">
          Connect this panel to Supabase Storage signed uploads for browser-based file transfer into `dj-images`, `audio-mixtapes`, `video-mixtapes`, and `course-files`.
        </p>
      </section>

      <MediaFilter items={data} />
    </div>
  );
}
