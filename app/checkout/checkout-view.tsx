'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/lib/shop/cart';
import { formatMoney, gatewaysForCurrency } from '@/lib/utils/money';
import type { Gateway } from '@/types/shop';

const GATEWAY_META: Record<'stripe' | 'flutterwave' | 'opay' | 'paystack', { label: string; sub: string }> = {
  stripe:      { label: 'Card',                     sub: 'Visa, Mastercard, Amex · powered by Stripe' },
  paystack:    { label: 'Card / Bank / USSD',       sub: 'NGN, USD · powered by Paystack' },
  flutterwave: { label: 'Card / Bank transfer',     sub: 'NGN, USD · powered by Flutterwave' },
  opay:        { label: 'OPay / Mobile money',      sub: 'Nigeria — bank transfer, USSD, OPay wallet' },
};

export function CheckoutView() {
  const router = useRouter();
  const { items, currency, subtotal, clearCart } = useCart();

  const [email, setEmail] = useState('');
  const [name, setName]   = useState('');
  const [gateway, setGateway] = useState<Gateway | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!items.length || !currency) {
    return (
      <div className="min-h-screen max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold">Nothing to check out</h1>
        <p className="mt-3 text-muted">Add something to your cart first.</p>
        <Link href="/shop" className="inline-block mt-6 text-accent hover:underline">← Back to shop</Link>
      </div>
    );
  }

  const gatewayOptions = gatewaysForCurrency(currency);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !/.+@.+\..+/.test(email)) {
      setError('Please enter a valid email — we send your downloads + receipt here.');
      return;
    }
    if (!gateway) {
      setError('Pick a payment method.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gateway,
          customer_email: email.trim(),
          customer_name:  name.trim() || null,
          currency,
          items: items.map((it) => ({ product_id: it.product_id, qty: it.qty })),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `Checkout failed (${res.status})`);
      }

      // The API can either return a redirect URL or a client-side action url.
      if (data.redirect_url) {
        // Clear cart now — buyer is leaving for the gateway
        clearCart();
        window.location.href = data.redirect_url;
        return;
      }

      // Manual fallback — show success page directly
      router.push(`/checkout/success?o=${data.public_id}`);
    } catch (err) {
      setError((err as Error).message);
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 mt-8">
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Contact */}
          <section>
            <h2 className="font-serif text-xl font-bold mb-4">Contact</h2>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted/70 font-medium">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <span className="block mt-1 text-[11px] text-muted">We send downloads and your receipt here.</span>
            </label>

            <label className="block mt-4">
              <span className="text-xs uppercase tracking-wider text-muted/70 font-medium">Name (optional)</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should we call you?"
                className="mt-1.5 w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </label>
          </section>

          {/* Payment method */}
          <section>
            <h2 className="font-serif text-xl font-bold mb-4">Payment method</h2>
            <div className="space-y-2">
              {gatewayOptions.length === 0 ? (
                <p className="text-sm text-red-400">
                  No payment method available for {currency} — try a different currency.
                </p>
              ) : (
                gatewayOptions.map((g) => {
                  const meta = GATEWAY_META[g];
                  const selected = gateway === g;
                  return (
                    <label
                      key={g}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        selected ? 'border-accent bg-accent/5' : 'border-border/40 bg-surface hover:border-border'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gateway"
                        value={g}
                        checked={selected}
                        onChange={() => setGateway(g)}
                        className="mt-1 accent-accent"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground">{meta.label}</div>
                        <div className="text-xs text-muted mt-0.5">{meta.sub}</div>
                      </div>
                    </label>
                  );
                })
              )}
            </div>
          </section>

          {error && (
            <p className="text-sm text-red-400" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !gatewayOptions.length}
            className="w-full px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Redirecting…' : `Pay ${formatMoney(subtotal, currency)}`}
          </button>

          <p className="text-[11px] text-muted text-center">
            Your payment is processed securely by {gateway ? GATEWAY_META[gateway as 'stripe'|'flutterwave'|'opay'|'paystack'].label.split(' ')[0] : 'the gateway'}.
            DigiFusion never sees your card details.
          </p>
        </form>

        {/* Order summary */}
        <aside className="rounded-xl bg-surface border border-border/40 p-5 h-fit">
          <h2 className="font-serif text-lg font-bold mb-4">Order</h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.product_id} className="flex justify-between gap-3 text-sm">
                <span className="text-muted truncate">{item.name}{item.qty > 1 && ` × ${item.qty}`}</span>
                <span className="text-foreground font-medium whitespace-nowrap">
                  {formatMoney(item.unit_price * item.qty, item.currency)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border/40 flex justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="font-serif font-bold text-lg">{formatMoney(subtotal, currency)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
