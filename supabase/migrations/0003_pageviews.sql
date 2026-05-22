-- Migration: 0003_pageviews
-- Lightweight page-view tracker for digitafusion.com
-- PathGuru reads aggregated stats via the CMS API (service-role only).

create table if not exists pageviews (
  id          bigserial primary key,
  path        text        not null,
  referrer    text,
  country     text,
  user_agent  text,
  session_id  text,
  created_at  timestamptz not null default now()
);

-- Indexes used by analytics queries
create index if not exists pageviews_created_at_idx on pageviews (created_at desc);
create index if not exists pageviews_path_idx       on pageviews (path);

-- Row-level security: no public access — only service_role key reads/writes
alter table pageviews enable row level security;

-- (No public policies — service_role bypasses RLS entirely)
