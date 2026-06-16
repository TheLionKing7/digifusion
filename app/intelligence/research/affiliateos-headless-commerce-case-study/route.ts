import fs from 'fs';
import path from 'path';
import { getProductBySlug } from '@/lib/shop/products';
import { formatMoney } from '@/lib/utils/money';

export const dynamic = 'force-dynamic';

const PRODUCT_SLUG = 'affiliateos-headless-commerce-case-study';

export async function GET() {
  const htmlPath = path.join(
    process.cwd(),
    'content/intelligence/affiliateos/affiliateos-case-study.html',
  );

  if (!fs.existsSync(htmlPath)) {
    return new Response('Case study not found.', { status: 404 });
  }

  const product = await getProductBySlug(PRODUCT_SLUG);
  const priceLabel = product?.prices?.USD
    ? formatMoney(product.prices.USD, 'USD')
    : '$84.99';

  let html = fs.readFileSync(htmlPath, 'utf8');

  const configScript = `<script>
window.__AFFOS_CONFIG = {
  productId: ${JSON.stringify(product?.id || '')},
  slug: ${JSON.stringify(PRODUCT_SLUG)},
  priceLabel: ${JSON.stringify(priceLabel)},
  returnPath: '/intelligence/research/affiliateos-headless-commerce-case-study'
};
</script>
<script src="/intelligence/affiliateos-paywall.js" defer></script>`;

  if (!html.includes('affiliateos-paywall.js')) {
    html = html.replace('</head>', `${configScript}\n</head>`);
  }

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
