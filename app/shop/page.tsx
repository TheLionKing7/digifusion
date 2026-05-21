import { listActiveProducts } from '@/lib/shop/products';
import { ShopGrid } from './shop-grid';

export const metadata = {
  title: 'Shop',
  description:
    'Digital downloads, services, and subscriptions from DigiFusion — built for the intelligence layer.',
};

export default async function ShopPage() {
  const products = await listActiveProducts();
  return <ShopGrid products={products} />;
}
