# DigiFusion blog — editorial standards

Non-negotiable rules for every post on digitafusion.com.

## Title

- The **page `<h1>`** (CMS `title` field) is the **only** post title.
- **Never** repeat the title as `<h1>` or `<h2>` in `content` HTML.
- The renderer strips duplicate leading headings automatically; still avoid shipping duplicates from the CMS.

## Author attribution

| Location | What to show |
|----------|----------------|
| **Header** (date row) | **First name only** — e.g. `Boroji`, `Kayode` |
| **Footer** (“Written by”) | **Full name** + optional role line + bio |

Canonical profiles live in `lib/constants/blog-authors.ts`.

### Authors

| CMS `author_name` | Header | Footer full name | Bio focus |
|-------------------|--------|------------------|-----------|
| `Boroji Adebayo-Hopewell` | Boroji | Boroji Adebayo-Hopewell | System thinking, AI automation, BD, digital media |
| `Kayode` | Kayode | Kayode | Digital Media, IP Law, Branding |
| `Digital Fusion Team` | Digital Fusion Team | Digital Fusion Team | Practice insights |

Store **full name only** in `author_name` (no `, Founder` suffix). Roles are defined in code.

## Featured image

Every published post should have `featured_image_url` (1200×630 or 21:9 hero). Use `/assets/blog/...` on the site or a CDN URL.

## Body content

- Do not include a byline or author bio in HTML — the footer block handles that.
- Use `<h2>` / `<h3>` for sections only.
- Link CTAs to the correct product URL (case study page vs shop SKU).

## PathGuru / seed scripts

When publishing via `scripts/seed-*-blog.mjs`:

- Set `title` and `excerpt` in payload; omit title from markdown source.
- Set `author_name` to full name (e.g. `Boroji Adebayo-Hopewell`).
- Set `featured_image_url` to absolute production URL.
