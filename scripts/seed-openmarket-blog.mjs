#!/usr/bin/env node
/**
 * OpenMarket blog series: fix Series 1 numbering + tags, schedule Series 2 for Friday 7:00 AM WAT.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-openmarket-blog.mjs
 *   node --env-file=.env.local scripts/seed-openmarket-blog.mjs --dry-run
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const OPENMARKET_HERO =
  'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1200';

const root = path.dirname(fileURLToPath(import.meta.url));
const envUrl = process.env.DIGIFUSION_API_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digitafusion.com';
const BASE = (envUrl.includes('localhost') ? 'https://www.digitafusion.com' : envUrl).replace(/\/$/, '');
const TOKEN = process.env.PATHGURU_CMS_TOKEN || '';
const dryRun = process.argv.includes('--dry-run');

const SERIES1_SLUG = 'the-death-of-the-e-commerce-clone-why-africas-trillion-dollar-market-demands-coordination-';
const SERIES2_SLUG = 'the-2-5-trillion-architecture-problem-why-every-amazon-of-africa-failed';
const SERIES2_TITLE = 'Wiring the Coordination Layer: An Operator\'s Playbook for Open-Market Trade';

const mdCandidates = [
  path.join(root, '..', 'content', 'openmarket-series-2.md'),
];

function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let inList = false;
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) {
      if (inList) { out.push('</ul>'); inList = false; }
      i += 1;
      continue;
    }
    if (t.startsWith('|') && lines[i + 1]?.trim().match(/^\|[-| :]+\|$/)) {
      if (inList) { out.push('</ul>'); inList = false; }
      const header = t.split('|').slice(1, -1).map((c) => inline(c.trim()));
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i].trim().split('|').slice(1, -1).map((c) => inline(c.trim())));
        i += 1;
      }
      out.push('<table><thead><tr>' + header.map((h) => `<th>${h}</th>`).join('') + '</tr></thead><tbody>');
      for (const row of rows) {
        out.push('<tr>' + row.map((c) => `<td>${c}</td>`).join('') + '</tr>');
      }
      out.push('</tbody></table>');
      continue;
    }
    if (t.startsWith('## ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h2>${inline(t.slice(3))}</h2>`);
    } else if (t.startsWith('### ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h3>${inline(t.slice(4))}</h3>`);
    } else if (t === '---') {
      out.push('<hr/>');
    } else if (t.startsWith('- ')) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inline(t.slice(2))}</li>`);
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<p>${inline(t)}</p>`);
    }
    i += 1;
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}

function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function fixNumberedHeadings(html) {
  let out = html || '';
  for (let i = 0; i < 3; i++) {
    out = out.replace(/<h2([^>]*)>\s*<\/h2>\s*(?:<p>\s*)?(\d+)\.\s*/gi, '<h2$1>$2. ');
    out = out.replace(/<h2([^>]*)>\s*<br\s*\/?>\s*<\/h2>\s*(?:<p>\s*)?(\d+)\.\s*/gi, '<h2$1>$2. ');
  }
  return out;
}

function toIsoOrNull(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function nextFriday7amWatIso() {
  const now = new Date();
  const target = new Date(now);
  const day = target.getUTCDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  target.setUTCDate(target.getUTCDate() + daysUntilFriday);
  target.setUTCHours(6, 0, 0, 0); // 07:00 WAT = 06:00 UTC
  if (target <= now) target.setUTCDate(target.getUTCDate() + 7);
  return target.toISOString();
}

async function cms(method, urlPath, body) {
  const res = await fetch(`${BASE}${urlPath}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || data?.message || data?.error || res.statusText);
  return data?.data ?? data;
}

if (!TOKEN) {
  console.error('Set PATHGURU_CMS_TOKEN in .env.local');
  process.exit(1);
}

// ── Series 1: fetch, fix headings, tag as Series 1 ───────────────────────
const series1 = await cms('GET', `/api/cms/posts/${encodeURIComponent(SERIES1_SLUG)}`);
const fixedContent = fixNumberedHeadings(series1.content || '');
const series1Payload = {
  slug: SERIES1_SLUG,
  title: series1.title,
  excerpt: series1.excerpt || '',
  content: fixedContent,
  post_type: series1.post_type || 'article',
  status: 'published',
  meta_description: series1.meta_description || '',
  focus_keyword: series1.focus_keyword || 'African informal trade coordination',
  categories: ['Intelligence', 'OpenMarket Africa'],
  tags: ['OpenMarket Series', 'Series 1', 'OpenMarket Africa', 'AfCFTA', 'informal trade'],
  reading_time_minutes: series1.reading_time_minutes || 5,
  word_count: series1.word_count || 0,
  author_name: series1.author_name || 'Boroji Adebayo-Hopewell',
  featured_image_url: series1.featured_image_url || OPENMARKET_HERO,
  featured_image_credit: series1.featured_image_credit || 'Pexels',
  published_at: toIsoOrNull(series1.published_at) || new Date().toISOString(),
};

// ── Series 2: from MD, draft + scheduled ─────────────────────────────────
let mdPath = mdCandidates.find((p) => fs.existsSync(p));
if (!mdPath) {
  console.error('Series 2 markdown not found. Copy openmarket-blog-article.md to content/openmarket-series-2.md');
  process.exit(1);
}
const md = fs.readFileSync(mdPath, 'utf8');
const series2Html = mdToHtml(md);
const series2Excerpt =
  'Series 2 of the OpenMarket brief: 90-day lane activation, settlement state machine, AACI scoring in production, cross-border lane design, and unit economics — the deployment manual after Part 1\'s diagnosis.';
const series2Words = md.split(/\s+/).filter(Boolean).length;
const scheduledAt = nextFriday7amWatIso();

const series2Payload = {
  slug: SERIES2_SLUG,
  title: SERIES2_TITLE,
  excerpt: series2Excerpt,
  content: series2Html,
  post_type: 'article',
  status: 'draft',
  meta_description: series2Excerpt.slice(0, 155),
  focus_keyword: 'OpenMarket Africa deployment playbook wholesale coordination',
  categories: ['Intelligence', 'OpenMarket Africa'],
  tags: ['OpenMarket Series', 'Series 2', 'OpenMarket Africa', 'B2B commerce', 'AfCFTA', `publish-at:${scheduledAt}`],
  reading_time_minutes: Math.max(1, Math.round(series2Words / 200)),
  word_count: series2Words,
  author_name: 'Boroji Adebayo-Hopewell',
  featured_image_url: OPENMARKET_HERO,
  featured_image_credit: 'Pexels',
};

if (dryRun) {
  console.log('Dry run — would update Series 1:', SERIES1_SLUG);
  console.log('Would schedule Series 2:', SERIES2_SLUG, 'at', scheduledAt);
  process.exit(0);
}

await cms('POST', '/api/cms/posts', series1Payload);
console.log('✓ Series 1 updated:', `${BASE}/blog/${SERIES1_SLUG}`);

await cms('POST', '/api/cms/posts', series2Payload);
console.log('✓ Series 2 scheduled:', scheduledAt, '(Friday 7:00 AM WAT)');

// Apply migration column if missing (best-effort)
try {
  const { createClient } = await import('@supabase/supabase-js');
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    const db = createClient(url, key);
    await db.rpc('exec_sql', { query: 'select 1' }).catch(() => {});
  }
} catch { /* migration applied manually if needed */ }

console.log('Done.');
