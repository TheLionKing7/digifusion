-- Migration: 0006_pageviews_enriched
-- Creates the pageviews table with all enriched analytics columns.
-- This supersedes 0003_pageviews.sql which was never applied.

create table if not exists pageviews (
  id            bigserial     primary key,
  path          text          not null,
  event         text          not null default 'pageview',
  referrer      text,
  user_agent    text,
  session_id    text,
  page_title    text,
  scroll_depth  integer,
  time_on_page  integer,
  click_target  text,
  viewport      text,
  language      text,
  timezone      text,
  device_type   text          not null default 'desktop',
  country       text,
  city          text,
  region        text,
  ip_anon       text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  created_at    timestamptz   not null default now()
);

-- Indexes for common analytics query patterns
create index if not exists pageviews_created_at_idx  on pageviews (created_at desc);
create index if not exists pageviews_path_idx        on pageviews (path);
create index if not exists pageviews_event_idx       on pageviews (event);
create index if not exists pageviews_device_idx      on pageviews (device_type);
create index if not exists pageviews_country_idx     on pageviews (country);
create index if not exists pageviews_utm_source_idx  on pageviews (utm_source);

-- Row-level security: no public access — only service_role key reads/writes
alter table pageviews enable row level security;

-- (No public policies — service_role bypasses RLS entirely)
