import 'server-only';
import { listProductsByCategory } from '@/lib/shop/products';
import {
  INTELLIGENCE_SKUS,
  skuBySlug,
  type IntelligenceCategory,
  type IntelligenceSku,
} from '@/lib/constants/intelligence-catalog';
import type { Product } from '@/types/shop';

export async function getIntelligenceProducts(category: IntelligenceCategory): Promise<Product[]> {
  return listProductsByCategory(category);
}

export function mergeSkuWithShop(sku: IntelligenceSku, products: Product[]): Product | null {
  return products.find((p) => p.slug === sku.slug) || null;
}

export async function getCategoryCatalog(category: IntelligenceCategory) {
  const skus = INTELLIGENCE_SKUS.filter((s) => s.category === category);
  const products = await getIntelligenceProducts(category);
  return skus.map((sku) => ({
    sku,
    shopProduct: mergeSkuWithShop(sku, products),
  }));
}

export async function resolveShopProduct(slug: string): Promise<Product | null> {
  const products = await listProductsByCategory();
  return products.find((p) => p.slug === slug) || null;
}

export function getPlaybookShopSlug(playbookSlug: string): string | null {
  const mapped: Record<string, string> = {
    'agency-operations-playbook': 'ave-diagnostic-kit',
    'smb-lead-machine': 'deal-engine-field-kit',
    'hospitality-automation-suite': 'engagement-model-os',
  };
  const catalogSlug = mapped[playbookSlug] || playbookSlug;
  return skuBySlug(catalogSlug)?.shopReady ? catalogSlug : null;
}
