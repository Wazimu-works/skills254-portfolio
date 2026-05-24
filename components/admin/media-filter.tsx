"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

type MediaItem = {
  id: string;
  name: string;
  bucket: string;
  file_path: string;
  kind: string;
  folder: string | null;
  tags: string[] | null;
  size_bytes: number | null;
  created_at: string | null;
};

export function MediaFilter({ items }: { items: MediaItem[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const text = `${item.name} ${item.bucket} ${item.folder ?? ""} ${(item.tags ?? []).join(" ")}`.toLowerCase();
      const matchesQuery = query.length === 0 || text.includes(query.toLowerCase());
      const matchesKind = kind === "all" || item.kind === kind;
      return matchesQuery && matchesKind;
    });
  }, [items, kind, query]);

  return (
    <div className="space-y-5">
      <div className="glass flex flex-col gap-4 rounded-[2rem] p-5 shadow-glow md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-copy/45" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search media, folders, buckets, tags"
            className="w-full rounded-2xl border border-white/10 bg-base-soft/70 py-3 pl-11 pr-4 text-white outline-none transition focus:border-turquoise/50"
          />
        </label>
        <select
          value={kind}
          onChange={(event) => setKind(event.target.value)}
          className="rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none transition focus:border-turquoise/50"
        >
          <option value="all">All file types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="audio">Audio</option>
          <option value="document">Documents</option>
        </select>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.id} className="glass rounded-[1.5rem] p-5 shadow-glow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-copy/60">
                  {item.bucket} / {item.folder ?? "root"}
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-copy/55">
                {item.kind}
              </span>
            </div>
            <p className="mt-4 truncate text-sm text-copy/70">{item.file_path}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(item.tags ?? []).map((tag) => (
                <span key={tag} className="rounded-full border border-turquoise/20 bg-turquoise/10 px-3 py-1 text-xs text-turquoise">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
