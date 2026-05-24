import { requireAdminUser } from "@/lib/admin-auth";
import { getPricingAdminData } from "@/lib/admin-data";

export default async function AdminPricingPage() {
  await requireAdminUser();
  const { data } = await getPricingAdminData();

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Event packages</h2>
        <div className="mt-6 grid gap-4">
          {data.length === 0 ? (
            <p className="text-sm text-copy/60">No pricing packages found.</p>
          ) : (
            data.map((item) => (
              <article key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl text-white">{item.name}</h3>
                    <p className="mt-2 text-sm text-copy/70">{item.description ?? "No description yet."}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-white">KSh {(item.base_price_kes ?? 0).toLocaleString()}</p>
                    <p className="mt-1 text-sm text-copy/60">Deposit KSh {(item.deposit_kes ?? 0).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(item.features ?? []).map((feature: string) => (
                    <span key={feature} className="rounded-full border border-white/10 px-3 py-1 text-xs text-copy/65">
                      {feature}
                    </span>
                  ))}
                </div>
                {item.is_discount_enabled ? (
                  <p className="mt-4 text-sm text-pink">
                    Promo: {item.promo_text ?? "Discount active"} ({item.discount_percentage ?? 0}% off)
                  </p>
                ) : null}
              </article>
            ))
          )}
        </div>
      </section>

      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Package editor</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Manage package names, pricing, features, and promos for Small Vibe, Club Vibe, Wedding Vibe, Full Night Vibe, and future offers.
        </p>
        <div className="mt-6 grid gap-4">
          {["Package name", "Base price", "Deposit", "Feature list (comma separated)", "Promo text", "Discount percentage"].map((label) => (
            <label key={label} className="space-y-2 text-sm text-copy/75">
              <span>{label}</span>
              <input className="w-full rounded-2xl border border-white/10 bg-base-soft/70 px-4 py-3 text-white outline-none" />
            </label>
          ))}
          <div className="grid gap-3 sm:grid-cols-2">
            {["Featured package", "Enable promo discount"].map((label) => (
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
