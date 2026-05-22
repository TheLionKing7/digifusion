# DigiFusion

**Enterprise AI consultancy, digital media, products and a knowledge base.**

Live at [www.digitafusion.com](https://www.digitafusion.com) — deployed on Vercel, database on Supabase.

---

## Project status

### Done

| Area | Status |
|---|---|
| Site — Strategy Session landing page (`/agency/booking`) | ✓ Live |
| Site — Four Pillars grid (Agency, Digital Media, Products, Knowledge Base) | ✓ Live |
| Site — Social links (Facebook, Twitter/X, Quora, email) | ✓ Live |
| CMS API — 15 endpoints under `/api/cms/*` | ✓ Built |
| Database — `posts` table with RLS (blog content) | ✓ Migrated |
| Database — `settings` table seeded with `terms` and `shipping` keys | ✓ Migrated |
| PathGuru integration — bearer token auth on all CMS routes | ✓ Live |

### Pending

- **`/blog` page** — posts are stored in the `posts` table (PathGuru publishes to it); no public-facing page renders them yet
- **Checkout** — orders, payment gateways (Flutterwave active for testing, Stripe pending), buyer flow
- **`/terms` page** — reads from `settings` where key = `'terms'`; page exists as a placeholder

---

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in values
npm run dev
```

App runs on `http://localhost:3000`.

---

## Environment variables

Set these in Vercel (Settings → Environment Variables) and locally in `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://vyljyzaesbauuorsonpl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...     # safe to expose — enforced by RLS
SUPABASE_URL=https://vyljyzaesbauuorsonpl.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...         # private — server-side only, never expose

# CMS API auth (PathGuru integration)
PATHGURU_CMS_TOKEN=...                # must match DIGIFUSION_CMS_TOKEN in PathGuru .env

# Cloudflare R2 (blog media storage)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=...
R2_PUBLIC_URL=...

# Payment gateways (for refund processing via CMS API)
FLW_SECRET_KEY=...                    # Flutterwave — active for testing
STRIPE_SECRET_KEY=...                 # Stripe — add when ready

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=        # Google Analytics 4 — leave blank to disable

# PathGuru backend (for any direct server → server calls)
NEXT_PUBLIC_PATHGURU_API=https://pathguru-publishers.onrender.com
```

---

## CMS API

All endpoints live under `/api/cms/*` and require `Authorization: Bearer <PATHGURU_CMS_TOKEN>`.

They are called by PathGuru's backend — never directly from a browser. PathGuru holds the token; DigiFusion verifies it.

| Method | Path | What it does |
|---|---|---|
| `POST` | `/api/cms/posts` | Upsert blog post (create or update by slug) |
| `GET` | `/api/cms/posts` | List posts — filter by status/type, paginated |
| `GET` | `/api/cms/posts/:slug` | Get single post |
| `DELETE` | `/api/cms/posts/:slug` | Archive post (soft-delete) |
| `GET` | `/api/cms/products` | List products |
| `POST` | `/api/cms/products` | Create product |
| `PUT` | `/api/cms/products/:id` | Update product (partial) |
| `GET` | `/api/cms/orders` | List orders — filter by status/gateway/date |
| `POST` | `/api/cms/orders/:id/mark-paid` | Mark order paid + trigger fulfilment |
| `POST` | `/api/cms/orders/:id/refund` | Refund via Flutterwave / Stripe / manual |
| `GET` | `/api/cms/subscriptions` | Active subs + MRR + 30d churn |
| `GET` | `/api/cms/bookings` | Service bookings + order/product info |
| `GET` | `/api/cms/analytics?range=7d\|30d\|90d` | Revenue, orders, AOV, per-currency breakdown |
| `PUT` | `/api/cms/settings/terms` | Save T&C content to `settings` table |
| `PUT` | `/api/cms/settings/shipping` | Save shipping rules to `settings` table |

---

## Database

Supabase project: `vyljyzaesbauuorsonpl`

Key tables (from migrations):

- `posts` — blog content (slug unique, post_type enum, status: draft/published/archived, RLS: anon can read published rows)
- `settings` — key/value store for site-wide config (`terms`, `shipping`)
- `orders` — purchases across all gateways
- `products` — digital products and services
- `subscriptions` — recurring plans
- `service_bookings` — bookings created at checkout

Migrations live in `supabase/migrations/`. Run them via the Supabase SQL editor (incognito if the dashboard has connectivity issues).

---

## Deployment

Deployed on Vercel. Push to `main` triggers a production deploy automatically.

All environment variables above must be set in the Vercel dashboard before deploying — the build will succeed without them but CMS API calls will fail at runtime with 503s.
