import { listActiveProducts } from '@/lib/shop/products';
import { ShopGrid } from './shop-grid';

// Skip build-time prerender — this page reads from Supabase (service_role),
// whose env vars are only present at runtime on the hosting platform.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Intelligence Store',
  description:
    'License DigiFusion playbooks, field guides, and research packs. Instant secure download after checkout.',
};

export default async function ShopPage() {
  const products = await listActiveProducts();
  return <ShopGrid products={products} />;
}
