'use client';

import { useCurrency } from '@/lib/shop/currency-context';
import type { Currency } from '@/types/shop';

const OPTIONS: { code: Currency; label: string; flag: string }[] = [
  { code: 'USD', label: 'USD', flag: '🇺🇸' },
  { code: 'NGN', label: 'NGN', flag: '🇳🇬' },
  { code: 'GBP', label: 'GBP', flag: '🇬🇧' },
];

export function CurrencyPicker() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className="inline-flex items-center gap-0 rounded-full bg-surface border border-border/40 p-1"
      role="radiogroup"
      aria-label="Display currency"
    >
      {OPTIONS.map((opt) => {
        const active = opt.code === currency;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => setCurrency(opt.code)}
            role="radio"
            aria-checked={active}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              active
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <span aria-hidden="true">{opt.flag}</span>
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
