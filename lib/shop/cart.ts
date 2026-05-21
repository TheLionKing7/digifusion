/**
 * Cart — minimal localStorage-backed store with a React hook.
 *
 * The cart is purely client-side until checkout. Items are stored as snapshots
 * (product_id + name + price at add time) so a server-side product edit can't
 * change what the buyer sees in their cart.
 *
 * One cart per currency: switching currency clears the cart, because mixing
 * USD and NGN line items in one order makes no sense.
 */

'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { CartItem, Currency } from '@/types/shop';

const KEY = 'digifusion_cart_v1';

interface CartState {
  currency: Currency | null;
  items: CartItem[];
}

const emptyState: CartState = { currency: null, items: [] };

/* ── Listener bus ─────────────────────────────────── */
const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

function readState(): CartState {
  if (typeof window === 'undefined') return emptyState;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return emptyState;
    return parsed as CartState;
  } catch {
    return emptyState;
  }
}

function writeState(s: CartState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // quota exceeded or storage disabled — silent
  }
  emit();
}

/* ── Imperative API (also usable outside React) ────── */

export function getCart(): CartState {
  return readState();
}

export function addToCart(item: CartItem): { added: true } | { added: false; reason: 'currency_mismatch' } {
  const cur = readState();

  if (cur.currency && cur.currency !== item.currency) {
    return { added: false, reason: 'currency_mismatch' };
  }

  const idx = cur.items.findIndex((i) => i.product_id === item.product_id);
  let next: CartItem[];
  if (idx >= 0) {
    next = cur.items.slice();
    next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
  } else {
    next = [...cur.items, item];
  }

  writeState({ currency: item.currency, items: next });
  return { added: true };
}

export function removeFromCart(productId: string) {
  const cur = readState();
  const items = cur.items.filter((i) => i.product_id !== productId);
  writeState({ currency: items.length ? cur.currency : null, items });
}

export function setQty(productId: string, qty: number) {
  if (qty <= 0) return removeFromCart(productId);
  const cur = readState();
  writeState({
    ...cur,
    items: cur.items.map((i) => (i.product_id === productId ? { ...i, qty } : i)),
  });
}

export function clearCart() {
  writeState(emptyState);
}

/** Hard reset — used when buyer changes currency on the shop page. */
export function setCartCurrency(currency: Currency) {
  const cur = readState();
  if (cur.currency === currency) return;
  writeState({ currency, items: [] });
}

/* ── React hook ────────────────────────────────────── */

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) cb(); };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', onStorage);
  };
}

export function useCart() {
  const state = useSyncExternalStore(subscribe, readState, () => emptyState);
  const itemCount = state.items.reduce((n, i) => n + i.qty, 0);
  const subtotal = state.items.reduce((n, i) => n + i.unit_price * i.qty, 0);

  return {
    ...state,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    setCartCurrency,
  };
}

/** Defer reads to after hydration to avoid flash-of-empty-cart. */
export function useHydratedCart() {
  const cart = useCart();
  const ready = typeof window !== 'undefined';
  useEffect(() => { /* noop — triggers re-render after mount */ }, []);
  return { ...cart, ready };
}
