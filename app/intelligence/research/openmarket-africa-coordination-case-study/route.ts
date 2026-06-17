import fs from 'fs';
import path from 'path';
import { getProductBySlug } from '@/lib/shop/products';
import { formatMoney } from '@/lib/utils/money';

export const dynamic = 'force-dynamic';

const PRODUCT_SLUG = 'openmarket-africa-coordination-case-study';

export async function GET() {
  const htmlPath = path.join(
    process.cwd(),
    'content/intelligence/openmarket/openmarket-case-study.html',
  );

  if (!fs.existsSync(htmlPath)) {
    return new Response('Case study not found.', { status: 404 });
  }

  const product = await getProductBySlug(PRODUCT_SLUG);
  const priceLabel = product?.prices?.USD
    ? formatMoney(product.prices.USD, 'USD')
    : '$99.99';

  let html = fs.readFileSync(htmlPath, 'utf8');

  const configScript = `<script>
window.__INTEL_CONFIG = {
  productId: ${JSON.stringify(product?.id || '')},
  slug: ${JSON.stringify(PRODUCT_SLUG)},
  priceLabel: ${JSON.stringify(priceLabel)},
  returnPath: '/intelligence/research/openmarket-africa-coordination-case-study'
};
</script>
<script src="/intelligence/intelligence-paywall.js" defer></script>`;

  if (!html.includes('intelligence-paywall.js')) {
    html = html.replace('</head>', `${configScript}\n</head>`);
  }

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
