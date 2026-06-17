-- Scheduled blog publication (PathGuru → CMS)
alter table posts
  add column if not exists scheduled_publish_at timestamptz;

create index if not exists idx_posts_scheduled_publish
  on posts (scheduled_publish_at)
  where status = 'draft' and scheduled_publish_at is not null;
