import { CalendarRange, MessageSquareMore, Music4, Wallet } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

async function getDashboardData() {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const [{ count: bookings }, { count: payments }, { count: messages }, { data: recentBookings }] =
    await Promise.all([
      supabase.from("bookings").select("*", { count: "exact", head: true }),
      supabase.from("payments").select("*", { count: "exact", head: true }),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }),
      supabase
        .from("bookings")
        .select("id,full_name,event_type,event_date,package_name,status,created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  return {
    bookings: bookings ?? 0,
    payments: payments ?? 0,
    messages: messages ?? 0,
    recentBookings: recentBookings ?? [],
  };
}

export default async function AdminPage() {
  const data = await getDashboardData();
  const statCards = data
    ? [
        { label: "Bookings", value: `${data.bookings}`, icon: CalendarRange },
        { label: "Payments", value: `${data.payments}`, icon: Wallet },
        { label: "Messages", value: `${data.messages}`, icon: MessageSquareMore },
      ]
    : [];

  return (
    <main className="shell py-16">
      <div className="max-w-3xl">
        <p className="eyebrow">Admin Dashboard</p>
        <h1 className="section-title mt-3">Operational overview for bookings, payments, and leads.</h1>
        <p className="mt-4 text-copy/70">
          This route is protected with HTTP basic auth in middleware so it stays inaccessible without admin credentials.
        </p>
      </div>

      {!data ? (
        <div className="glass mt-10 rounded-[2rem] p-8 shadow-glow">
          <p className="text-copy/75">
            Add Supabase project keys in your environment to load live admin metrics here.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="glass rounded-[2rem] p-6 shadow-glow">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-copy/65">{card.label}</p>
                    <Icon className="size-5 text-turquoise" />
                  </div>
                  <p className="mt-4 font-display text-4xl text-white">{card.value}</p>
                </div>
              );
            })}
          </div>

          <div className="glass mt-10 rounded-[2rem] p-6 shadow-glow">
            <div className="flex items-center gap-3">
              <Music4 className="size-5 text-pink" />
              <h2 className="font-display text-2xl text-white">Recent bookings</h2>
            </div>
            <div className="mt-6 space-y-4">
              {data.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-copy/75"
                >
                  <p className="font-semibold text-white">{booking.full_name}</p>
                  <p className="mt-1">
                    {booking.event_type} on {booking.event_date} | {booking.package_name}
                  </p>
                  <p className="mt-1 text-copy/55">Status: {booking.status}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
