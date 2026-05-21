/**
 * Currency context — provides the buyer's selected currency to all shop
 * components. Initial value is detected from country (Cloudflare/Vercel
 * geolocation headers when available, else navigator.language as fallback),
 * then user can override via the picker in the header.
 *
 * Persisted to localStorage so we don't keep nagging.
 */

'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Currency } from '@/types/shop';
import { setCartCurrency } from '@/lib/shop/cart';

const KEY = 'digifusion_currency_v1';

interface Ctx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** True when the user has explicitly chosen (vs. inferred from geo). */
  manual: boolean;
}

const CurrencyContext = createContext<Ctx>({
  currency: 'USD',
  setCurrency: () => {},
  manual: false,
});

function detectFromBrowser(): Currency {
  if (typeof navigator === 'undefined') return 'USD';
  const lang = (navigator.language || '').toLowerCase();
  if (lang.includes('en-ng') || lang.endsWith('-ng')) return 'NGN';
  if (lang.includes('en-gb') || lang.endsWith('-gb') || lang.endsWith('-uk')) return 'GBP';
  return 'USD';
}

export function CurrencyProvider({ children, initial }: { children: ReactNode; initial?: Currency }) {
  const [currency, setCurrencyState] = useState<Currency>(initial || 'USD');
  const [manual, setManual] = useState(false);

  // On mount, prefer saved choice; else fall back to browser hint
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY) as Currency | null;
      if (saved && ['USD', 'NGN', 'GBP'].includes(saved)) {
        setCurrencyState(saved);
        setManual(true);
      } else if (!initial) {
        setCurrencyState(detectFromBrowser());
      }
    } catch { /* localStorage blocked — keep default */ }
  }, [initial]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    setManual(true);
    try { window.localStorage.setItem(KEY, c); } catch {}
    // Cart can't span currencies — clear it on change.
    setCartCurrency(c);
  }, []);

  const value = useMemo(() => ({ currency, setCurrency, manual }), [currency, setCurrency, manual]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
