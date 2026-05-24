import { AudioLines, BookOpenCheck, CalendarCheck2, Wallet } from "lucide-react";
import { requireAdminUser } from "@/lib/admin-auth";
import { getAdminDashboardData } from "@/lib/admin-data";

export default async function AdminDashboardHomePage() {
  await requireAdminUser();
  const { data } = await getAdminDashboardData();

  const cards = [
    { label: "Total bookings", value: data.totalBookings, icon: CalendarCheck2 },
    { label: "Mixtape plays", value: data.totalMixtapePlays, icon: AudioLines },
    { label: "Course enrollments", value: data.totalCourseEnrollments, icon: BookOpenCheck },
    { label: "Recent revenue", value: `KSh ${data.revenue.toLocaleString()}`, icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="glass rounded-[1.75rem] p-6 shadow-glow">
              <div className="flex items-center justify-between">
                <p className="text-sm text-copy/60">{card.label}</p>
                <Icon className="size-5 text-turquoise" />
              </div>
              <p className="mt-4 font-display text-4xl text-white">{card.value}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <h2 className="font-display text-2xl text-white">Recent payments</h2>
          <div className="mt-6 space-y-4">
            {data.recentPayments.length === 0 ? (
              <p className="text-sm text-copy/60">No payment records yet.</p>
            ) : (
              data.recentPayments.map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{payment.description}</p>
                      <p className="mt-1 text-sm text-copy/60">{payment.phone ?? "No phone number"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-white">
                        KSh {(payment.paid_amount ?? payment.amount ?? 0).toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-turquoise/80">
                        {payment.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <h2 className="font-display text-2xl text-white">Booking pipeline</h2>
          <div className="mt-6 space-y-4">
            {data.recentBookings.length === 0 ? (
              <p className="text-sm text-copy/60">No booking requests yet.</p>
            ) : (
              data.recentBookings.map((booking) => (
                <div key={booking.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{booking.full_name}</p>
                  <p className="mt-1 text-sm text-copy/65">
                    {booking.event_type} on {booking.event_date} at {booking.location}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-copy/55">Deposit: KSh {(booking.deposit_paid ?? 0).toLocaleString()} / {(booking.deposit_required ?? 0).toLocaleString()}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-turquoise/80">
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>
    </div>
  );
}
