-- 0004_add_article_post_type.sql
-- Adds 'article' to the posts_post_type_check constraint.
-- The original inline CHECK is named posts_post_type_check by Postgres.

alter table posts
  drop constraint if exists posts_post_type_check;

alter table posts
  add constraint posts_post_type_check
  check (post_type in (
    'listicle',
    'how-to',
    'case-study',
    'review',
    'roundup',
    'guide',
    'opinion',
    'article'
  ));
