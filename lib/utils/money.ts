/**
 * Money helpers — everything stored as minor units (integer cents/kobo/pence),
 * formatted only at display time.
 */

import type { Currency, PriceMap } from '@/types/shop';

const CURRENCY_META: Record<Currency, { symbol: string; minorPerMajor: number; locale: string }> = {
  USD: { symbol: '$',  minorPerMajor: 100, locale: 'en-US' },
  GBP: { symbol: '£',  minorPerMajor: 100, locale: 'en-GB' },
  NGN: { symbol: '₦',  minorPerMajor: 100, locale: 'en-NG' },
};

/** Format minor-unit amount in given currency. e.g. (4900, 'USD') → "$49.00" */
export function formatMoney(minor: number, currency: Currency, opts?: { compact?: boolean }): string {
  const meta = CURRENCY_META[currency];
  if (!meta) return `${minor}`;

  const major = minor / meta.minorPerMajor;

  try {
    return new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: opts?.compact && major % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(major);
  } catch {
    return `${meta.symbol}${major.toFixed(2)}`;
  }
}

/** Get the price in a given currency from a PriceMap, or undefined if missing. */
export function priceIn(prices: PriceMap, currency: Currency): number | undefined {
  return prices[currency];
}

/** True if the product can be bought in this currency. */
export function isAvailableIn(prices: PriceMap, currency: Currency): boolean {
  return typeof prices[currency] === 'number';
}

/** Which currencies does this product list a price for? */
export function availableCurrencies(prices: PriceMap): Currency[] {
  return (Object.keys(prices) as Currency[]).filter((c) => typeof prices[c] === 'number');
}

/** Total a cart in a single currency. Assumes items already share currency. */
export function sumLineItems(items: { unit_price: number; qty: number }[]): number {
  return items.reduce((sum, it) => sum + it.unit_price * it.qty, 0);
}

/** Which payment gateways can process this currency? */
export function gatewaysForCurrency(currency: Currency): ('stripe' | 'flutterwave' | 'opay')[] {
  switch (currency) {
    case 'USD': return ['stripe', 'flutterwave'];
    case 'GBP': return ['stripe'];
    case 'NGN': return ['flutterwave', 'opay'];
    default:    return [];
  }
}

/** Symbol for inline display in places too tight for full Intl formatting. */
export function currencySymbol(currency: Currency): string {
  return CURRENCY_META[currency]?.symbol ?? currency;
}
