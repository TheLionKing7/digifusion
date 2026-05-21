'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CurrencyProvider, useCurrency } from '@/lib/shop/currency-context';
import { CurrencyPicker } from '@/components/shop/currency-picker';
import { CartButton } from '@/components/shop/cart-button';
import { addToCart, useCart } from '@/lib/shop/cart';
import { formatMoney, priceIn, availableCurrencies, gatewaysForCurrency } from '@/lib/utils/money';
import type { Product } from '@/types/shop';

const TYPE_LABEL: Record<Product['type'], string> = {
  download:     'Digital download',
  subscription: 'Subscription',
  service:      'Service',
};

export function ProductDetail({ product }: { product: Product }) {
  return (
    <CurrencyProvider>
      <Inner product={product} />
    </CurrencyProvider>
  );
}

function Inner({ product }: { product: Product }) {
  const router = useRouter();
  const { currency } = useCurrency();
  const cart = useCart();

  const price = priceIn(product.prices, currency);
  const avail = availableCurrencies(product.prices);
  const supported = price != null;
  const gateways = supported ? gatewaysForCurrency(currency) : [];

  const [error, setError] = useState<string | null>(null);

  function handleAdd(goToCheckout: boolean) {
    setError(null);
    if (!supported || price == null) {
      setError(`This product isn't available in ${currency}. Try ${avail.join(' or ')}.`);
      return;
    }
    const res = addToCart({
      product_id:      product.id,
      slug:            product.slug,
      name:            product.name,
      type:            product.type,
      qty:             1,
      unit_price:      price,
      currency,
      cover_image_url: product.cover_image_url,
    });
    if (!res.added) {
      setError(`Your cart is in ${cart.currency}. Switch currency or clear the cart first.`);
      return;
    }
    if (goToCheckout) router.push('/checkout');
  }

  return (
    <article className="max-w-5xl mx-auto px-6 py-8 md:py-12">
      <div className="flex items-center justify-end gap-3 mb-8">
        <CurrencyPicker />
        <CartButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-surface-lighter via-surface to-surface flex items-center justify-center">
          {product.cover_image_url ? (
            <img src={product.cover_image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-24 h-24 text-accent/15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-accent/15 text-accent">
              {TYPE_LABEL[product.type]}
              {product.recurring && ` · ${product.recurring}`}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-4 text-base text-muted leading-relaxed whitespace-pre-wrap">{product.description}</p>
          )}

          <div className="mt-8 pt-6 border-t border-border/40">
            {supported && price != null ? (
              <p className="font-serif text-4xl font-bold text-foreground">
                {formatMoney(price, currency)}
                {product.recurring && (
                  <span className="text-sm text-muted ml-2 font-sans font-normal">/{product.recurring === 'monthly' ? 'month' : 'year'}</span>
                )}
              </p>
            ) : (
              <div>
                <p className="text-base text-muted">Not available in {currency}.</p>
                {avail.length > 0 && (
                  <p className="text-sm text-muted mt-1">Try {avail.join(' or ')}.</p>
                )}
              </div>
            )}

            <div className="mt-2 flex items-center gap-2 text-xs text-muted">
              <span>Pay with</span>
              {gateways.length === 0 ? (
                <span className="text-muted/60">—</span>
              ) : (
                gateways.map((g) => (
                  <span key={g} className="px-2 py-0.5 rounded bg-surface border border-border/40 text-foreground capitalize">
                    {g}
                  </span>
                ))
              )}
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400" role="alert">{error}</p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => handleAdd(true)}
              disabled={!supported}
              className="flex-1 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy now
            </button>
            <button
              type="button"
              onClick={() => handleAdd(false)}
              disabled={!supported}
              className="flex-1 px-6 py-3 rounded-lg bg-surface border border-border text-foreground font-medium hover:border-accent/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
