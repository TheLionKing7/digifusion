'use client';

import Link from 'next/link';
import { useCart } from '@/lib/shop/cart';
import { formatMoney } from '@/lib/utils/money';

export function CartView() {
  const { items, currency, subtotal, removeFromCart, setQty, clearCart } = useCart();

  if (!items.length || !currency) {
    return (
      <div className="min-h-screen max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-bold">Your cart is empty</h1>
        <p className="mt-3 text-muted">Have a look at the shop and add something you like.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Browse the shop
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Your cart</h1>
      <p className="mt-2 text-sm text-muted">Paying in {currency} · {items.length} item{items.length === 1 ? '' : 's'}</p>

      <div className="mt-8 rounded-xl bg-surface border border-border/40 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={item.product_id}
            className={`flex items-center gap-4 p-4 ${i !== items.length - 1 ? 'border-b border-border/40' : ''}`}
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-lighter shrink-0">
              {item.cover_image_url ? (
                <img src={item.cover_image_url} alt={item.name} className="w-full h-full object-cover" />
              ) : null}
            </div>

            <div className="flex-1 min-w-0">
              <Link href={`/shop/${item.slug}`} className="block font-serif text-base font-bold text-foreground hover:text-accent truncate">
                {item.name}
              </Link>
              <p className="text-xs text-muted mt-0.5">{formatMoney(item.unit_price, item.currency)} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQty(item.product_id, item.qty - 1)}
                className="w-7 h-7 rounded border border-border/40 text-muted hover:text-accent hover:border-accent/30 transition-colors"
                aria-label="Decrease quantity"
              >−</button>
              <span className="min-w-[24px] text-center text-sm font-medium">{item.qty}</span>
              <button
                type="button"
                onClick={() => setQty(item.product_id, item.qty + 1)}
                className="w-7 h-7 rounded border border-border/40 text-muted hover:text-accent hover:border-accent/30 transition-colors"
                aria-label="Increase quantity"
              >+</button>
            </div>

            <div className="w-24 text-right font-medium text-foreground">
              {formatMoney(item.unit_price * item.qty, item.currency)}
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(item.product_id)}
              className="text-muted/60 hover:text-red-400 transition-colors"
              aria-label={`Remove ${item.name}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-muted hover:text-red-400 transition-colors"
        >
          Clear cart
        </button>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-muted/70">Subtotal</p>
          <p className="font-serif text-2xl font-bold mt-1">{formatMoney(subtotal, currency)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-lg bg-surface border border-border/40 text-foreground text-sm font-medium text-center hover:border-accent/30 transition-colors"
        >
          Keep shopping
        </Link>
        <Link
          href="/checkout"
          className="px-6 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold text-center hover:opacity-90 transition-opacity"
        >
          Checkout →
        </Link>
      </div>
    </div>
  );
}
