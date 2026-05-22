-- ════════════════════════════════════════════════════════════════════════════
-- DigiFusion — Migration 0002: posts + settings tables
--
-- Run in Supabase SQL editor (Dashboard → SQL Editor → New query → paste → Run).
--
-- posts  : CMS-managed blog posts, published via PathGuru → DigiFusion CMS API.
--          Column names match the mapPostFromDB() mapper in lib/api/pathguru.ts.
-- settings: Key/value store for site-wide config (T&C text, shipping rules, etc.)
-- ════════════════════════════════════════════════════════════════════════════

-- ── posts ─────────────────────────────────────────────────────────────────

create table if not exists posts (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,

  -- Core content
  title                 text not null,
  excerpt               text not null default '',
  content               text not null default '',

  -- Post typing — mirrors BlogPostType in types/blog.ts
  post_type             text not null default 'guide'
                        check (post_type in ('listicle', 'how-to', 'case-study', 'review', 'roundup', 'guide', 'opinion')),

  -- SEO
  meta_description      text not null default '',
  focus_keyword         text not null default '',

  -- Media
  featured_image_url    text,
  featured_image_credit text,

  -- Social
  social_caption        text default '',
  linkedin_caption      text default '',

  -- Taxonomy (stored as jsonb string arrays, e.g. ["AI Automation", "Guides"])
  categories            jsonb not null default '[]'::jsonb,
  tags                  jsonb not null default '[]'::jsonb,

  -- Metrics
  reading_time_minutes  integer not null default 5,
  word_count            integer not null default 0,

  -- Author snapshot (no users table needed for v1)
  author_name           text not null default 'DigiFusion',
  author_avatar         text,

  -- Post-type specific fields (nullable; only populated for the relevant type)
  -- listicle:   list_items  → string[]
  -- how-to:     steps       → { title, content, imageUrl? }[]
  -- case-study: client_name, client_results → { metric, value }[]
  -- review:     rating (0–10), pros_cons → { pros: string[], cons: string[] }
  -- roundup:    experts → { name, role, company?, avatar?, quote }[]
  list_items            jsonb default '[]'::jsonb,
  steps                 jsonb default '[]'::jsonb,
  client_name           text,
  client_results        jsonb default '[]'::jsonb,
  rating                numeric(3,1) check (rating is null or (rating >= 0 and rating <= 10)),
  pros_cons             jsonb default '{}'::jsonb,
  experts               jsonb default '[]'::jsonb,

  -- Lifecycle
  status                text not null default 'draft'
                        check (status in ('draft', 'published', 'archived')),
  published_at          timestamptz,

  created_at            timestamptz default now(),
  updated_at            timestamptz default now()
);

-- Indexes that matter for the CMS list queries
create index if not exists idx_posts_status       on posts(status);
create index if not exists idx_posts_post_type    on posts(post_type);
create index if not exists idx_posts_published_at on posts(published_at desc);
create index if not exists idx_posts_slug         on posts(slug);

-- Auto-publish: set published_at when status flips to 'published'
create or replace function set_published_at()
returns trigger as $$
begin
  if new.status = 'published' and (old.status is distinct from 'published') then
    new.published_at = coalesce(new.published_at, now());
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_posts_published_at on posts;
create trigger trg_posts_published_at
  before insert or update on posts
  for each row execute function set_published_at();

-- Reuse the shared updated_at trigger from 0001
drop trigger if exists trg_posts_touch on posts;
create trigger trg_posts_touch
  before update on posts
  for each row execute function touch_updated_at();

-- ── settings ──────────────────────────────────────────────────────────────
--
-- A simple key/value config store. Keys are defined below; values are jsonb
-- so they can hold anything (plain text, structured rules, arrays, etc.).
--
-- Pre-seeded keys:
--   'terms'    → { "content": "<markdown or HTML string>" }
--   'shipping' → { "rules": [...], "free_threshold_usd": 0, ... }

create table if not exists settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

drop trigger if exists trg_settings_touch on settings;
create trigger trg_settings_touch
  before update on settings
  for each row execute function touch_updated_at();

-- Seed default keys so PUT routes can always do an UPDATE (never blind INSERT)
insert into settings (key, value) values
  ('terms',    '{"content": ""}'::jsonb),
  ('shipping', '{"rules": [], "free_threshold_usd": 0, "notes": ""}'::jsonb)
on conflict (key) do nothing;

-- ── Row Level Security ─────────────────────────────────────────────────────
-- Service-role key only for all writes. Anon key may read published posts
-- (so blog pages can be server-rendered without an extra API hop if needed).

alter table posts    enable row level security;
alter table settings enable row level security;

drop policy if exists posts_public_read on posts;
create policy posts_public_read
  on posts for select to anon
  using (status = 'published');

-- settings is internal only — no anon policy
