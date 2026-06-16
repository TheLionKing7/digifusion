import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getShopDb } from '@/lib/shop/supabase';
import type { Order } from '@/types/shop';

export const metadata = { title: 'Thanks for your order' };
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ o?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { o } = await searchParams;

  if (o) {
    const db = getShopDb();
    const { data: orderRow } = await db
      .from('orders')
      .select('metadata')
      .eq('public_id', o)
      .maybeSingle();

    const meta = (orderRow as Pick<Order, 'metadata'> | null)?.metadata as
      | { return_path?: string }
      | null
      | undefined;

    if (meta?.return_path && meta.return_path.startsWith('/')) {
      redirect(`${meta.return_path}?o=${encodeURIComponent(o)}`);
    }

    redirect(`/orders/${o}`);
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 mx-auto mb-6 flex items-center justify-center text-accent">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Payment received</h1>
      <p className="mt-3 text-muted">
        Your receipt and any download links are on their way by email. If you don&rsquo;t see it in a few
        minutes, check the spam folder.
      </p>
      <Link
        href="/shop"
        className="inline-block mt-8 text-sm text-accent hover:underline"
      >
        ← Back to shop
      </Link>
    </div>
  );
}
