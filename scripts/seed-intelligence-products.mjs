#!/usr/bin/env node
/**
 * Seed Intelligence Library products into Supabase.
 *
 * Usage:
 *   node --env-file=.env scripts/seed-intelligence-products.mjs
 *   node --env-file=.env scripts/seed-intelligence-products.mjs --dry-run
 */
import { createClient } from '@supabase/supabase-js';

const SKUS = [
  { slug: 'ave-diagnostic-kit', name: 'Automation Velocity Engine — Diagnostic Kit', category: 'playbook', prices: { USD: 19700, NGN: 8900000, GBP: 15700 }, featured: true,
    description: 'Complete AVE diagnostic system: Automation Opportunity Matrix, readiness scoring, adoption KPIs, and 3-phase deploy sequence.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/ave-diagnostic-kit.zip', filename: 'ave-diagnostic-kit.zip' } },
  { slug: 'deal-engine-field-kit', name: 'Deal Engine — B2B Field Kit', category: 'playbook', prices: { USD: 24700, NGN: 11200000, GBP: 19700 }, featured: true,
    description: 'ABM tier model, fit scoring, trigger-event targeting, and Dream 50 reprioritisation framework.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/deal-engine-field-kit.zip', filename: 'deal-engine-field-kit.zip' } },
  { slug: 'c2c-pillar-cluster-playbook', name: 'Content-to-Capital Pipeline — Pillar-Cluster Playbook', category: 'playbook', prices: { USD: 19700, NGN: 8900000, GBP: 15700 },
    description: 'Pillar-cluster architecture, STDC content matrix, and content-to-capital attribution system.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/c2c-pillar-cluster-playbook.zip', filename: 'c2c-pillar-cluster-playbook.zip' } },
  { slug: 'engagement-model-os', name: 'Engagement Model OS', category: 'playbook', prices: { USD: 29700, NGN: 13500000, GBP: 23700 },
    description: 'Client lifecycle OS: engagement blueprints, utilization, NPS loops, and economics model.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/engagement-model-os.zip', filename: 'engagement-model-os.zip' } },
  { slug: 'advertising-playbook-vol1', name: 'The Advertising Playbook — Vol. 1', category: 'field-guide', prices: { USD: 9700, NGN: 4500000, GBP: 7700 },
    description: 'Strategic advertising for SMBs: media selection, message architecture, and campaign budgeting.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/advertising-playbook-vol1.zip', filename: 'advertising-playbook-vol1.zip' } },
  { slug: 'executive-prompt-library', name: 'Executive Prompt Library', category: 'field-guide', prices: { USD: 6700, NGN: 3100000, GBP: 5300 },
    description: '300+ categorised prompts for strategy, operations, marketing, and leadership.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/executive-prompt-library.zip', filename: 'executive-prompt-library.zip' } },
  { slug: 'smb-automation-roi-pack', name: 'SMB Automation ROI Data Pack', category: 'research', prices: { USD: 4900, NGN: 2200000, GBP: 3900 },
    description: 'Premium research pack with full methodology, sector benchmarks, and ROI calculator.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/smb-automation-roi-pack.zip', filename: 'smb-automation-roi-pack.zip' } },
  { slug: 'african-ai-executive-brief', name: 'African C-Suite AI Executive Brief', category: 'research', prices: { USD: 7900, NGN: 3600000, GBP: 6300 },
    description: 'Executive brief for Nigeria, Ghana, Kenya, and South Africa — AVE-aligned C-suite playbook.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/african-ai-executive-brief.zip', filename: 'african-ai-executive-brief.zip' } },
  { slug: 'affiliateos-headless-commerce-case-study', name: 'AffiliateOS — The Headless Commerce Paradigm', category: 'research', prices: { USD: 8499, NGN: 3950000, GBP: 6800 }, featured: true,
    description: 'Full case study: intent decay model, Sigil + edge architecture, competitive matrix, TAM/SAM/SOM, interactive HTML + PDF.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/affiliateos-headless-commerce-case-study.zip', filename: 'affiliateos-headless-commerce-case-study.zip' } },
  { slug: 'openmarket-africa-coordination-case-study', name: 'OpenMarket Africa — The Coordination Imperative', category: 'research', prices: { USD: 9999, NGN: 4650000, GBP: 7900 }, featured: true,
    description: 'McKinsey-grade case study: informal trade economics, coordination protocol, AACI engine, AfCFTA/PAPSS, interactive HTML + PDF.',
    fulfillment: { r2_key: 'Digifusion/Playbooks/Business/openmarket-case-study-v2.pdf', filename: 'openmarket-africa-coordination-case-study.pdf' } },
  { slug: 'intelligence-pass-annual', name: 'DigiFusion Intelligence Pass', category: 'bundle', prices: { USD: 49700, NGN: 22500000, GBP: 39700 }, featured: true,
    description: 'Annual access to all playbooks, field guides, and research packs plus quarterly updates.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/intelligence-pass-annual.zip', filename: 'intelligence-pass-bundle.zip' } },
  { slug: 'intelligence-firm-license', name: 'Firm Intelligence License', category: 'bundle', prices: { USD: 149700, NGN: 68000000, GBP: 119700 },
    description: 'Team license (10 seats) + full library + 2 strategy sessions.',
    fulfillment: { r2_key: 'Digifusion/Intelligence/intelligence-firm-license.zip', filename: 'intelligence-firm-license.zip' } },
];

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dryRun = process.argv.includes('--dry-run');

if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const db = createClient(url, key);

for (const sku of SKUS) {
  const row = {
    slug: sku.slug,
    name: sku.name,
    description: sku.description,
    type: 'download',
    category: sku.category,
    prices: sku.prices,
    recurring: null,
    fulfillment: sku.fulfillment,
    cover_image_url: null,
    featured: !!sku.featured,
    active: true,
    updated_at: new Date().toISOString(),
  };

  if (dryRun) {
    console.log('Would upsert:', sku.slug, sku.prices.USD / 100, 'USD');
    continue;
  }

  const { error } = await db.from('products').upsert(row, { onConflict: 'slug' });
  if (error) console.error('✗', sku.slug, error.message);
  else console.log('✓', sku.slug);
}

console.log(dryRun ? 'Dry run complete.' : 'Done.');
