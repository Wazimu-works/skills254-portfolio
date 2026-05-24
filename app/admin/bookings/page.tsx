import Link from "next/link";
import { requireAdminUser } from "@/lib/admin-auth";
import { getBookingsAdminData } from "@/lib/admin-data";

const statuses = ["pending", "confirmed", "completed", "cancelled"] as const;

export default async function AdminBookingsPage() {
  await requireAdminUser();
  const { data } = await getBookingsAdminData();

  return (
    <div className="space-y-6">
      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Booking requests</h2>
        <p className="mt-3 text-sm leading-7 text-copy/70">
          Review client info, event details, deposit progress, invoice numbers, and status actions from one responsive table.
        </p>

        <div className="mt-6 space-y-4">
          {data.length === 0 ? (
            <p className="text-sm text-copy/60">No booking requests found.</p>
          ) : (
            data.map((booking) => (
              <article key={booking.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl text-white">{booking.full_name}</h3>
                    <p className="text-sm text-copy/65">{booking.email} | {booking.phone}</p>
                    <p className="text-sm text-copy/70">
                      {booking.event_type} on {booking.event_date} at {booking.location}
                    </p>
                    <p className="text-sm text-copy/70">
                      Package: {booking.package_name} | Guests: {booking.guest_count}
                    </p>
                    <p className="text-sm text-copy/60">Invoice: {booking.invoice_number ?? "Not generated"}</p>
                  </div>

                  <div className="flex flex-col gap-3 xl:items-end">
                    <div className="flex flex-wrap gap-2">
                      {statuses.map((status) => (
                        <form key={status} action={`/api/admin/bookings/${booking.id}/status`} method="post">
                          <input type="hidden" name="status" value={status} />
                          <button
                            type="submit"
                            className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-copy/70 transition hover:border-turquoise/30 hover:text-white"
                          >
                            {status}
                          </button>
                        </form>
                      ))}
                    </div>
                    <p className="text-sm text-copy/60">
                      Deposit: KSh {(booking.deposit_paid ?? 0).toLocaleString()} / {(booking.deposit_required ?? 0).toLocaleString()}
                    </p>
                    {booking.client_whatsapp ? (
                      <Link
                        href={`https://wa.me/${booking.client_whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        className="rounded-full border border-turquoise/20 bg-turquoise/10 px-4 py-2 text-sm text-turquoise transition hover:text-white"
                      >
                        WhatsApp client
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
