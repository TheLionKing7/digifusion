#!/usr/bin/env node
/** Backfill featured_image_url for posts missing a hero image. */
import { createClient } from '@supabase/supabase-js';

const HERO = {
  openmarket:
    'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1200',
  default:
    'https://images.pexels.com/photos/8442027/pexels-photo-8442027.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

function pickHero(post) {
  const hay = `${post.slug} ${post.title} ${(post.tags || []).join(' ')}`.toLowerCase();
  if (/openmarket|e-commerce-clone|coordination/.test(hay)) return HERO.openmarket;
  return HERO.default;
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const dryRun = process.argv.includes('--dry-run');

if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const db = createClient(url, key);
const { data: posts, error } = await db
  .from('posts')
  .select('id, slug, title, tags, featured_image_url')
  .in('status', ['published', 'draft']);

if (error) {
  console.error(error.message);
  process.exit(1);
}

const missing = (posts || []).filter((p) => !(p.featured_image_url || '').trim());
console.log(`Missing hero: ${missing.length}${dryRun ? ' (dry-run)' : ''}`);
for (const post of missing) {
  const hero = pickHero(post);
  console.log(`  ${post.slug}`);
  if (!dryRun) {
    await db.from('posts').update({ featured_image_url: hero, featured_image_credit: 'Pexels' }).eq('id', post.id);
  }
}
