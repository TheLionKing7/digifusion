#!/usr/bin/env node
/**
 * Smoke-test Paystack reference routing (no network).
 *
 *   node scripts/test-paystack-router.mjs
 */
function extractReference(rawBody) {
  try {
    const payload = JSON.parse(rawBody);
    return payload?.data?.reference ?? null;
  } catch {
    return null;
  }
}

function isShop(reference) {
  return typeof reference === 'string' && reference.startsWith('df_');
}

function isAffiliateOS(reference) {
  return typeof reference === 'string' && reference.toLowerCase().startsWith('affos_');
}

function productFromReference(reference) {
  if (!reference) return null;
  const lower = reference.toLowerCase();
  if (lower.startsWith('vek_') || lower.startsWith('vk_')) return 'vektor';
  if (lower.startsWith('sw_')) return 'sabiwork';
  return null;
}

function resolve(rawBody) {
  const reference = extractReference(rawBody);
  if (isShop(reference)) return { destination: 'shop' };
  if (isAffiliateOS(reference)) return { destination: 'affiliateos' };
  const product = productFromReference(reference);
  if (product) return { destination: 'products', product };
  return { destination: 'unknown', reference };
}

const cases = [
  ['df_order_123', 'shop'],
  ['affos_zyx9k2m1_a1b2c3d4e5f6', 'affiliateos'],
  ['affos_store_creator_slug_a1b2c3d4e5f6', 'affiliateos'],
  ['vek_sub_abc', 'products'],
  ['random_ref_xyz', 'unknown'],
];

let failed = 0;
for (const [ref, expected] of cases) {
  const body = JSON.stringify({ event: 'charge.success', data: { reference: ref, amount: 100 } });
  const route = resolve(body);
  const ok = route.destination === expected;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${ref} → ${route.destination} (expected ${expected})`);
  if (!ok) failed++;
}

process.exit(failed ? 1 : 0);
