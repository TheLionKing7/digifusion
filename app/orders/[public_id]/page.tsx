import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getShopDb } from '@/lib/shop/supabase';
import { formatMoney } from '@/lib/utils/money';
import type { Order, OrderItem, Download } from '@/types/shop';

export const metadata = { title: 'Your order' };
export const dynamic = 'force-dynamic'; // never cache — payment status changes

interface Props {
  params: Promise<{ public_id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { public_id } = await params;
  const db = getShopDb();

  const { data: order, error } = await db
    .from('orders')
    .select('*')
    .eq('public_id', public_id)
    .maybeSingle();

  if (error || !order) notFound();
  const o = order as Order;

  const [{ data: items }, { data: downloads }] = await Promise.all([
    db.from('order_items').select('*').eq('order_id', o.id),
    db
      .from('downloads')
      .select('*, order_items!inner(order_id)')
      .eq('order_items.order_id', o.id),
  ]);

  const orderItems = (items || []) as OrderItem[];
  const dls        = (downloads || []) as Download[];

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-12">
      <Link href="/shop" className="text-sm text-muted hover:text-foreground inline-flex items-center gap-2 group">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        Back to shop
      </Link>

      <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted/70">Order</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mt-1">
            #{o.public_id}
          </h1>
        </div>
        <StatusPill status={o.status} />
      </div>

      <p className="mt-2 text-sm text-muted">
        Placed {new Date(o.created_at).toLocaleString()} · {o.customer_email}
      </p>

      {o.status === 'pending' && (
        <div className="mt-6 p-4 rounded-lg border border-amber-500/30 bg-amber-500/5 text-sm text-amber-200/90">
          We&rsquo;re waiting for the payment to confirm. Refresh this page in a minute, or check your email — we&rsquo;ll
          notify you the moment it clears.
        </div>
      )}

      {/* Items */}
      <div className="mt-8 rounded-xl bg-surface border border-border/40 overflow-hidden">
        {orderItems.map((it, i) => (
          <div
            key={it.id}
            className={`flex items-center justify-between gap-4 p-4 ${
              i !== orderItems.length - 1 ? 'border-b border-border/40' : ''
            }`}
          >
            <div className="min-w-0">
              <p className="font-serif text-base font-bold truncate">{it.snapshot?.name || 'Item'}</p>
              <p className="text-xs text-muted mt-0.5">
                {it.qty > 1 && `${it.qty} × `}{formatMoney(it.unit_price, o.currency)}
              </p>
            </div>
            <p className="font-medium">{formatMoney(it.unit_price * it.qty, o.currency)}</p>
          </div>
        ))}
        <div className="flex justify-between p-4 border-t border-border/40 font-serif font-bold">
          <span>Total</span>
          <span>{formatMoney(o.total, o.currency)}</span>
        </div>
      </div>

      {/* Downloads */}
      {dls.length > 0 && (
        <div className="mt-8">
          <h2 className="font-serif text-xl font-bold mb-4">Downloads</h2>
          <div className="space-y-3">
            {dls.map((d) => {
              const expired = new Date(d.expires_at) < new Date();
              const used = d.used_count >= d.max_uses;
              const disabled = expired || used;
              return (
                <a
                  key={d.id}
                  href={disabled ? undefined : `/api/download/${d.token}`}
                  className={`flex items-center justify-between gap-4 p-4 rounded-lg bg-surface border ${
                    disabled ? 'border-border/30 opacity-60 cursor-not-allowed' : 'border-border/40 hover:border-accent/30'
                  } transition-colors`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{d.filename}</p>
                      <p className="text-[11px] text-muted mt-0.5">
                        {expired
                          ? 'Link expired'
                          : used
                            ? 'No downloads left'
                            : `Valid until ${new Date(d.expires_at).toLocaleString()} · ${d.max_uses - d.used_count} of ${d.max_uses} downloads left`}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-accent">{disabled ? '—' : 'Download'}</span>
                </a>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-muted">
            Need fresh links? Email <a className="text-accent" href={`mailto:${process.env.SHOP_FROM_EMAIL || 'support@digifusion.ai'}`}>support</a> with your order number.
          </p>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: Order['status'] }) {
  const map: Record<Order['status'], { bg: string; fg: string; label: string }> = {
    pending:  { bg: 'bg-amber-500/10',   fg: 'text-amber-300',   label: 'Pending' },
    paid:     { bg: 'bg-emerald-500/10', fg: 'text-emerald-300', label: 'Paid' },
    failed:   { bg: 'bg-red-500/10',     fg: 'text-red-300',     label: 'Failed' },
    refunded: { bg: 'bg-blue-500/10',    fg: 'text-blue-300',    label: 'Refunded' },
    canceled: { bg: 'bg-muted/10',       fg: 'text-muted',       label: 'Canceled' },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.bg} ${s.fg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.fg.replace('text-', 'bg-')}`} />
      {s.label}
    </span>
  );
}
