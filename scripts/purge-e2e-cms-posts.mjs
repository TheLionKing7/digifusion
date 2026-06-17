#!/usr/bin/env node
/**
 * Permanently delete E2E CMS smoke posts from Supabase (all statuses).
 *
 * Usage:
 *   node --env-file=.env.local scripts/purge-e2e-cms-posts.mjs
 *   node --env-file=.env.local scripts/purge-e2e-cms-posts.mjs --dry-run
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dryRun = process.argv.includes('--dry-run');

if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const db = createClient(url, key);
const { data: rows, error } = await db
  .from('posts')
  .select('id, slug, title, status')
  .or('slug.ilike.e2e-cms-%,title.ilike.%E2E CMS smoke%');

if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`Found ${rows?.length || 0} E2E post(s)${dryRun ? ' (dry-run)' : ''}`);
for (const r of rows || []) console.log(`  - ${r.slug} [${r.status}]`);

if (dryRun || !rows?.length) process.exit(0);

const ids = rows.map((r) => r.id);
const { data: deleted, error: delErr } = await db.from('posts').delete().in('id', ids).select('slug');
if (delErr) {
  console.error('Delete failed:', delErr.message);
  process.exit(1);
}
console.log(`✓ Permanently deleted ${deleted?.length || 0} post(s)`);
