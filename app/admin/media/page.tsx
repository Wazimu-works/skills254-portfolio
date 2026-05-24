import { MediaFilter } from "@/components/admin/media-filter";
import { requireAdminUser } from "@/lib/admin-auth";
import { getMediaAdminData } from "@/lib/admin-data";

export default async function AdminMediaPage() {
  await requireAdminUser();
  const { data } = await getMediaAdminData();
  const uploadKinds = [
    { title: "Audio uploads", formats: "MP3, WAV, AAC, FLAC, M4A, OGG", folder: "audio-mixtapes" },
    { title: "Video uploads", formats: "MP4, MOV, MKV, AVI, WEBM, M4V", folder: "video-mixtapes" },
    { title: "Thumbnail uploads", formats: "JPG, PNG, WEBP, AVIF", folder: "dj-images/thumbnails" },
  ];

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

      <section className="grid gap-6 xl:grid-cols-3">
        {uploadKinds.map((item) => (
          <article key={item.title} className="glass rounded-[1.75rem] p-6 shadow-glow">
            <h2 className="font-display text-2xl text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-copy/70">Upload destination: `{item.folder}`</p>
            <p className="mt-3 text-sm text-turquoise">{item.formats}</p>
            <label className="mt-6 block rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 px-4 py-8 text-center text-sm text-copy/65">
              Choose files
              <input type="file" className="hidden" />
            </label>
          </article>
        ))}
      </section>

      <MediaFilter items={data} />
    </div>
  );
}
