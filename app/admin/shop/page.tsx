import Link from 'next/link';
import { getShopDb } from '@/lib/shop/supabase';
import { formatMoney } from '@/lib/utils/money';
import type { Order, Product } from '@/types/shop';

export const metadata = { title: 'Shop admin' };
export const dynamic = 'force-dynamic';

export default async function AdminShopHome() {
  const db = getShopDb();

  const [{ data: products }, { data: orders }] = await Promise.all([
    db.from('products').select('*').order('created_at', { ascending: false }).limit(20),
    db.from('orders').select('*').order('created_at', { ascending: false }).limit(20),
  ]);

  const totals = computeTotals((orders as Order[]) || []);

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-12">
      <header className="flex items-end justify-between gap-4 flex-wrap mb-10">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted/70">Admin</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Shop</h1>
        </div>
        <Link
          href="/admin/shop/products/new"
          className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90"
        >
          + New product
        </Link>
      </header>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Metric label="Products"     value={String(products?.length ?? 0)} />
        <Metric label="Orders (20)"  value={String(orders?.length ?? 0)} />
        <Metric label="Revenue USD"  value={formatMoney(totals.USD, 'USD', { compact: true })} />
        <Metric label="Revenue NGN"  value={formatMoney(totals.NGN, 'NGN', { compact: true })} />
      </div>

      {/* Products */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-bold">Recent products</h2>
          <Link href="/admin/shop/products" className="text-xs text-muted hover:text-accent">View all →</Link>
        </div>
        {!products?.length ? (
          <EmptyState text="No products yet. Create your first one to start selling." />
        ) : (
          <div className="rounded-xl bg-surface border border-border/40 overflow-hidden">
            {(products as Product[]).map((p, i) => (
              <Link
                key={p.id}
                href={`/admin/shop/products/${p.id}`}
                className={`flex items-center justify-between gap-4 p-4 hover:bg-surface-lighter/40 transition-colors ${
                  i !== products.length - 1 ? 'border-b border-border/40' : ''
                }`}
              >
                <div className="min-w-0">
                  <p className="font-serif text-base font-bold truncate">{p.name}</p>
                  <p className="text-xs text-muted mt-0.5 capitalize">
                    {p.type}{p.recurring && ` · ${p.recurring}`} · {p.slug}
                  </p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.active ? 'bg-emerald-500/10 text-emerald-300' : 'bg-muted/10 text-muted'}`}>
                  {p.active ? 'Active' : 'Hidden'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Orders */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-bold">Recent orders</h2>
          <Link href="/admin/shop/orders" className="text-xs text-muted hover:text-accent">View all →</Link>
        </div>
        {!orders?.length ? (
          <EmptyState text="No orders yet." />
        ) : (
          <div className="rounded-xl bg-surface border border-border/40 overflow-hidden">
            {(orders as Order[]).map((o, i) => (
              <Link
                key={o.id}
                href={`/admin/shop/orders/${o.id}`}
                className={`flex items-center justify-between gap-4 p-4 hover:bg-surface-lighter/40 transition-colors ${
                  i !== orders.length - 1 ? 'border-b border-border/40' : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{o.customer_email}</p>
                  <p className="text-xs text-muted mt-0.5">
                    #{o.public_id} · {o.gateway} · {new Date(o.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatMoney(o.total, o.currency)}</p>
                  <p className="text-xs text-muted mt-0.5 capitalize">{o.status}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-surface border border-border/40">
      <p className="text-xs uppercase tracking-wider text-muted/70">{label}</p>
      <p className="mt-1 font-serif text-2xl font-bold">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="text-sm text-muted p-6 text-center bg-surface/50 rounded-xl border border-border/30">{text}</p>;
}

function computeTotals(orders: Order[]) {
  const totals = { USD: 0, NGN: 0, GBP: 0 };
  for (const o of orders) {
    if (o.status !== 'paid') continue;
    totals[o.currency] = (totals[o.currency] || 0) + o.total;
  }
  return totals;
}
