# DigiFusion

**Enterprise AI agency, digital media, SaaS products, and a premium intelligence library.**

Live at [www.digitafusion.com](https://www.digitafusion.com) — deployed on Vercel, database on Supabase.

The frontend storefront for the DigiFusion Intelligence Network. Content, products, and intelligence flow in from PathGuru (the backend engine). Visitors are engaged and qualified by the built-in AI Assistant, which is powered by PathGuru's Agent Network.

```
PathGuru (Render)  ──────────────────────────────────▶  DigiFusion (Vercel)
7 Agents · Publishing · Research · Blog CMS              Blog · Intelligence · Products · Agency · Assistant
```

---

## Site architecture

DigiFusion is structured around four interconnected pillars:

```
Blog (attract)  →  Intelligence (convert)  →  Products (retain)  →  Agency (upsell)
```

| Pillar | Route | Purpose |
|---|---|---|
| **Blog** | `/blog` | Free intelligence — attracts organic traffic, builds trust |
| **Intelligence** | `/intelligence` | Premium knowledge library — field guides, playbooks, research, tools |
| **Products** | `/products` | SaaS products — SabiWork, Receptra, AdPilot, Vektor |
| **Agency** | `/agency` | Three practice areas — AI Automation, Business Development, Digital Media |

---

## Agency — Three Practice Areas

The `/agency` page is the main pillar page for all three service tracks. Each is powered by a proprietary framework.

| Track | Framework | Powered By | Route |
|---|---|---|---|
| **AI & SaaS Automation** | Automation Velocity Engine (AVE) | Nova | `/agency#ai-automation` |
| **Business Development** | Deal Engine | Atlas | `/agency#business-development` |
| **Digital Media** | C2C Pipeline | Nexus / Aether | `/agency#digital-media` |

### Automation Velocity Engine (AVE) — Nova
5-phase system: **DIAGNOSE** (BCG DAI + McKinsey 7S) → **ARCHITECT** (AWS CAF + 12-Factor App) → **BUILD** (IBM Garage 14-day sprints) → **DEPLOY** (Gartner Hyperautomation + ADKAR) → **SCALE** (Andrew Ng AI Transformation + PLG).

Key tools: Automation Opportunity Matrix, Automation Velocity Scorecard (20Q), 12-Factor Compliance Check, Adoption Index, Automation ROI Dashboard.
Client maturity: Manual (0–39) → Connected (40–69) → Intelligent (70–100).

### Deal Engine — Atlas
5-phase BD system fusing: ABM (Dream 50) + SPIN Selling + Challenger Sale (Insight Hook) + Miller Heiman (Blue Sheet) + Value Proposition Design.

Key tools: Dream 50 Protocol, Deal Strategy Worksheet (Blue Sheet), Win-Results Framework, BD Maturity Scorecard (20Q).
Client maturity: Ad-Hoc/Reactive (0–39) → Managed Pipeline (40–69) → Predictable Growth Engine (70–100).

### C2C Pipeline — Nexus / Aether
Pillar-cluster authority architecture: ICP Search Journey Map → Topic Authority Index → Editorial Production → Distribution → Attribution Dashboard.

---

## AI Assistant — VA Widget

A floating chat widget (`components/ui/AssistantChat.tsx`) lives on every page, powered by the **DigiFusion Assistant agent** running on PathGuru's backend.

The VA is loaded with the full proprietary knowledge base (AVE, Deal Engine, C2C Pipeline, pricing, engagement model) so it can answer framework-level questions directly, without a backend round-trip. Quick-reply chips surface the most common visitor questions on first open.

How it works:
- Visitor opens the chat → VA greets and offers framework quick-replies
- Progressive qualification: challenge → company → timeline → authority → booking offer
- Lead scored 0–5 as conversation progresses
- Score ≥ 4 → Calendly booking button appears
- Qualified leads saved to Supabase `leads` table; team notified via Pulse (push + WhatsApp)

---

## Analytics — Full Visitor Footprint

`POST /api/track` receives enriched beacons from every page. `GET /api/cms/analytics/pageviews` returns the aggregated dashboard for PathGuru's analytics panel.

### Tracked per event:
| Signal | Description |
|---|---|
| `path`, `page_title` | Page visited |
| `event` | `pageview` \| `scroll_depth` \| `click` \| `exit` \| `focus_time` |
| `session_id` | Client-generated UUID (sessionStorage) |
| `scroll_depth` | Max scroll % reached (0–100) |
| `time_on_page` | Seconds on page (sent on exit) |
| `click_target` | Text/aria-label of clicked A or BUTTON elements |
| `device_type` | `desktop` \| `mobile` \| `tablet` |
| `country`, `city`, `region` | Vercel geo headers (automatic) |
| `ip_anon` | Anonymised IP (/24 IPv4, /64 IPv6) — GDPR-safe |
| `utm_source`, `utm_medium`, `utm_campaign` | Persisted via sessionStorage |
| `language`, `timezone`, `viewport` | Browser signals |

### Analytics dashboard response adds:
- Bounce rate, avg scroll depth, avg time on page
- Top pages with per-page scroll/time stats
- Device breakdown, top countries, top referrers
- Daily views + unique sessions
- Top clicked elements, UTM breakdown, events breakdown

---

## Sitemap

`/sitemap.xml` — generated by `app/sitemap.ts` (XML, submitted to Google Search Console).
`/sitemap` — human-readable HTML index page (not submitted to GSC).

**Google complaint fix:** The XML sitemap (`/sitemap.xml`) and HTML sitemap (`/sitemap`) are separate routes. Only `/sitemap.xml` is submitted to Google Search Console. The HTML page at `/sitemap` is excluded from the XML sitemap submission to prevent the "HTML page submitted as XML sitemap" error.

---

## Intelligence sub-sections

| Section | Route | Content |
|---|---|---|
| Field Guides | `/intelligence/field-guides` | Premium advertising & AI books |
| Playbooks | `/intelligence/playbooks` | Industry-specific automation workflow packs |
| Research | `/intelligence/research` | Research papers and case studies |
| Tools | `/intelligence/tools` | Browser extensions and lightweight utilities |

---

## SaaS Products

| Product | Route | What it does |
|---|---|---|
| SabiWork | `/products/sabiwork` | AI cost-estimator for artisans & contractors |
| Receptra | `/products/receptra` | AI-powered receptionist for hospitality & law |
| AdPilot | `/products/adpilot` | AI marketing assistant inside WhatsApp |
| Vektor | `/products/vektor` | AI-powered prospecting intelligence |

---

## Project status

| Area | Status |
|---|---|
| Site — full layout, navigation, Header + Footer | ✓ Live |
| Site — Blog with PathGuru CMS integration | ✓ Live |
| Site — Agency pillar page (3 tracks, 3 frameworks) | ✓ Live |
| Site — Agency sub-pages (services, methodology, case studies, booking) | ✓ Live |
| Site — Topic cluster pillar pages | ✓ Live |
| Site — Intelligence hub + 4 sub-pages | ✓ Live |
| Site — Products hub + 4 product landing pages | ✓ Live |
| Site — XML sitemap + robots.txt + JSON-LD schema | ✓ Live |
| CMS API — 15+ endpoints under `/api/cms/*` | ✓ Built |
| Analytics — full visitor footprint (scroll, time, clicks, geo, UTM) | ✓ Built |
| AI Assistant VA — framework knowledge base wired in | ✓ Built |
| Database — `posts`, `products`, `orders`, `subscriptions`, `pageviews` tables | ✓ Migrated |
| PathGuru integration — bearer token auth on all CMS routes | ✓ Live |

### Pending

| Area | Status |
|---|---|
| Checkout | Orders in DB; buyer-facing payment flow (Stripe) not yet built |
| Intelligence product purchases | Payment flow for Field Guides / Tools when ready |
| `/terms` page | Reads from `settings` where key = `'terms'`; placeholder only |
| SabiWork / Receptra / AdPilot | SaaS products in development; Early Access CTA only |
| pageviews Supabase migration | Add new columns: `event`, `page_title`, `scroll_depth`, `time_on_page`, `click_target`, `viewport`, `language`, `timezone`, `device_type`, `country`, `city`, `region`, `ip_anon`, `utm_source`, `utm_medium`, `utm_campaign` |

---

## File structure

```
app/
├── layout.tsx                  Root layout — Header, Footer, AssistantChat, analytics tracker
├── page.tsx                    Homepage
├── agency/
│   ├── page.tsx                Agency pillar — 3 practice areas (AI, BD, Digital Media)
│   ├── services/page.tsx       Pricing for all 3 tracks
│   ├── methodology/page.tsx    4-phase engagement model
│   ├── case-studies/page.tsx   Client results
│   └── booking/page.tsx        Strategy session booking
├── blog/                       Blog listing + post pages
├── intelligence/               Intelligence hub + sub-sections
├── products/                   Products hub + product pages
├── api/
│   ├── track/route.ts          Analytics beacon (full visitor footprint)
│   ├── cms/analytics/          Analytics dashboard API (pageviews, revenue)
│   └── ...
└── sitemap.ts                  XML sitemap (submitted to GSC)

components/
├── layout/
│   ├── header.tsx
│   └── footer.tsx
├── ui/
│   ├── AssistantChat.tsx       VA widget — framework knowledge base + lead qual
│   └── ...
```

---

## Environment variables

```bash
# PathGuru backend (publishing engine + agent network)
NEXT_PUBLIC_PATHGURU_API=https://pathguru-publishers.onrender.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...     # public, safe to expose
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...         # private — server-side only

# Site URL (used in sitemap + canonical URLs)
NEXT_PUBLIC_SITE_URL=https://www.digitafusion.com

# Cloudflare R2 (blog media)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=...
R2_PUBLIC_URL=...

# CMS integration (shared secret with PathGuru)
PATHGURU_CMS_TOKEN=...
```

---

## Supabase — pageviews table migration

The analytics upgrade requires new columns on the `pageviews` table. Run this migration:

```sql
ALTER TABLE pageviews
  ADD COLUMN IF NOT EXISTS event          text DEFAULT 'pageview',
  ADD COLUMN IF NOT EXISTS page_title     text,
  ADD COLUMN IF NOT EXISTS scroll_depth   integer,
  ADD COLUMN IF NOT EXISTS time_on_page   integer,
  ADD COLUMN IF NOT EXISTS click_target   text,
  ADD COLUMN IF NOT EXISTS viewport       text,
  ADD COLUMN IF NOT EXISTS language       text,
  ADD COLUMN IF NOT EXISTS timezone       text,
  ADD COLUMN IF NOT EXISTS device_type    text DEFAULT 'desktop',
  ADD COLUMN IF NOT EXISTS country        text,
  ADD COLUMN IF NOT EXISTS city           text,
  ADD COLUMN IF NOT EXISTS region         text,
  ADD COLUMN IF NOT EXISTS ip_anon        text,
  ADD COLUMN IF NOT EXISTS utm_source     text,
  ADD COLUMN IF NOT EXISTS utm_medium     text,
  ADD COLUMN IF NOT EXISTS utm_campaign   text;

-- Index for common dashboard queries
CREATE INDEX IF NOT EXISTS pageviews_event_idx       ON pageviews (event);
CREATE INDEX IF NOT EXISTS pageviews_device_idx      ON pageviews (device_type);
CREATE INDEX IF NOT EXISTS pageviews_country_idx     ON pageviews (country);
CREATE INDEX IF NOT EXISTS pageviews_utm_source_idx  ON pageviews (utm_source);
```

---

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in values
npm run dev
```

App runs at `http://localhost:3000`.

---

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment. All environment variables are set in the Vercel project dashboard.

---

## License

Private. All rights reserved.
