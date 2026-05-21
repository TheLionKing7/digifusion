'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Product, ProductType } from '@/types/shop';

interface Props {
  initial?: Partial<Product>;
}

export function ProductForm({ initial }: Props = {}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [slug, setSlug]   = useState(initial?.slug || '');
  const [name, setName]   = useState(initial?.name || '');
  const [desc, setDesc]   = useState(initial?.description || '');
  const [type, setType]   = useState<ProductType>((initial?.type as ProductType) || 'download');
  const [recurring, setRecurring] = useState<'monthly' | 'yearly' | ''>(initial?.recurring || '');
  const [active, setActive] = useState(initial?.active ?? true);
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.cover_image_url || '');

  // Pricing — store major units for UI ease, convert to minor on submit.
  const [usd, setUsd] = useState(initial?.prices?.USD != null ? String(initial.prices.USD / 100) : '');
  const [ngn, setNgn] = useState(initial?.prices?.NGN != null ? String(initial.prices.NGN / 100) : '');
  const [gbp, setGbp] = useState(initial?.prices?.GBP != null ? String(initial.prices.GBP / 100) : '');

  const [fulfillmentJson, setFulfillmentJson] = useState(
    initial?.fulfillment ? JSON.stringify(initial.fulfillment, null, 2) : '{}'
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const prices: Record<string, number> = {};
    if (usd) prices.USD = Math.round(parseFloat(usd) * 100);
    if (ngn) prices.NGN = Math.round(parseFloat(ngn) * 100);
    if (gbp) prices.GBP = Math.round(parseFloat(gbp) * 100);

    let fulfillment: object;
    try {
      fulfillment = JSON.parse(fulfillmentJson || '{}');
    } catch {
      setError('Fulfillment JSON is invalid.');
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(initial?.id ? `/api/admin/products/${initial.id}` : '/api/admin/products', {
        method: initial?.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug, name, description: desc, type, recurring: recurring || null,
          active, featured,
          cover_image_url: coverImageUrl || null,
          prices, fulfillment,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Save failed (${res.status})`);

      router.push('/admin/shop');
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <Row>
        <Field label="Slug" hint="Used in /shop/[slug]. Lowercase, hyphens only.">
          <input value={slug} onChange={(e) => setSlug(e.target.value)} required pattern="[a-z0-9-]+" className={inputClass} />
        </Field>
        <Field label="Name">
          <input value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
        </Field>
      </Row>

      <Field label="Description">
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} className={inputClass} />
      </Field>

      <Row>
        <Field label="Type">
          <select value={type} onChange={(e) => setType(e.target.value as ProductType)} className={inputClass}>
            <option value="download">Download</option>
            <option value="subscription">Subscription</option>
            <option value="service">Service</option>
          </select>
        </Field>
        <Field label="Recurring (subscriptions only)">
          <select value={recurring} onChange={(e) => setRecurring(e.target.value as 'monthly' | 'yearly' | '')} className={inputClass}>
            <option value="">—</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </Field>
      </Row>

      <fieldset>
        <legend className="text-xs uppercase tracking-wider text-muted/70 font-medium mb-2">Prices (major units)</legend>
        <Row>
          <Field label="USD"><input type="number" step="0.01" min="0" value={usd} onChange={(e) => setUsd(e.target.value)} placeholder="49.00" className={inputClass} /></Field>
          <Field label="NGN"><input type="number" step="0.01" min="0" value={ngn} onChange={(e) => setNgn(e.target.value)} placeholder="65000" className={inputClass} /></Field>
          <Field label="GBP"><input type="number" step="0.01" min="0" value={gbp} onChange={(e) => setGbp(e.target.value)} placeholder="39.00" className={inputClass} /></Field>
        </Row>
        <p className="text-[11px] text-muted mt-1">Leave blank to disable that currency.</p>
      </fieldset>

      <Field label="Cover image URL (optional)">
        <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="https://..." className={inputClass} />
      </Field>

      <Field
        label="Fulfillment JSON"
        hint="Download: {&quot;r2_key&quot;: &quot;ebooks/x.pdf&quot;, &quot;filename&quot;: &quot;Book.pdf&quot;} · Service: {&quot;calendar_url&quot;: &quot;...&quot;} · Subscription: {&quot;stripe_price_id&quot;: &quot;price_...&quot;}"
      >
        <textarea
          value={fulfillmentJson}
          onChange={(e) => setFulfillmentJson(e.target.value)}
          rows={6}
          className={inputClass + ' font-mono text-xs'}
          spellCheck={false}
        />
      </Field>

      <Row>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-accent" />
          Active (visible in the shop)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-accent" />
          Featured
        </label>
      </Row>

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <div className="flex items-center justify-end gap-3 pt-2">
        <Link href="/admin/shop" className="text-sm text-muted hover:text-foreground">Cancel</Link>
        <button type="submit" disabled={busy} className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 disabled:opacity-40">
          {busy ? 'Saving…' : initial?.id ? 'Save changes' : 'Create product'}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  'w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block flex-1 min-w-0">
      <span className="block text-xs uppercase tracking-wider text-muted/70 font-medium mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-muted mt-1">{hint}</span>}
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col sm:flex-row gap-4">{children}</div>;
}
