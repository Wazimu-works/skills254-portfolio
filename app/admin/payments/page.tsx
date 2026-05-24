import Link from "next/link";
import { requireAdminUser } from "@/lib/admin-auth";
import { getPaymentsAdminData } from "@/lib/admin-data";

export default async function AdminPaymentsPage() {
  await requireAdminUser();
  const { data } = await getPaymentsAdminData();
  const successful = data.filter((item) => item.status === "completed").length;
  const failed = data.filter((item) => item.status === "failed").length;

  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <p className="text-sm text-copy/60">Successful payments</p>
          <p className="mt-4 font-display text-4xl text-white">{successful}</p>
        </article>
        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <p className="text-sm text-copy/60">Failed payments</p>
          <p className="mt-4 font-display text-4xl text-white">{failed}</p>
        </article>
        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <p className="text-sm text-copy/60">Tracked transactions</p>
          <p className="mt-4 font-display text-4xl text-white">{data.length}</p>
        </article>
        <article className="glass rounded-[1.75rem] p-6 shadow-glow">
          <p className="text-sm text-copy/60">Exports</p>
          <Link href="/api/admin/payments/export" className="mt-4 inline-flex text-sm text-turquoise">
            Download CSV report
          </Link>
        </article>
      </section>

      <section className="glass rounded-[1.75rem] p-6 shadow-glow">
        <h2 className="font-display text-2xl text-white">Payment ledger</h2>
        <div className="mt-6 space-y-4">
          {data.length === 0 ? (
            <p className="text-sm text-copy/60">No payments found.</p>
          ) : (
            data.map((payment) => (
              <article key={payment.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-copy/45">Purpose</p>
                    <p className="mt-2 text-sm text-white">{payment.description}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-copy/45">Phone</p>
                    <p className="mt-2 text-sm text-white">{payment.phone ?? "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-copy/45">Transaction ID</p>
                    <p className="mt-2 text-sm text-white">{payment.receipt_number ?? payment.checkout_request_id ?? "Pending"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-copy/45">Amount</p>
                    <p className="mt-2 text-sm text-white">KSh {(payment.paid_amount ?? payment.amount ?? 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-copy/45">Status</p>
                    <p className="mt-2 text-sm text-turquoise">{payment.status}</p>
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
