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
| **Products** | `/products` | SaaS products — SabiWork, Receptra, AdPilot |
| **Agency** | `/agency` | Done-for-you AI consultancy services |

### Intelligence sub-sections

| Section | Route | Content |
|---|---|---|
| Field Guides | `/intelligence/field-guides` | Premium advertising & AI books |
| Playbooks | `/intelligence/playbooks` | Industry-specific automation workflow packs |
| Research | `/intelligence/research` | Research papers and case studies |
| Tools | `/intelligence/tools` | Browser extensions and lightweight utilities |

### SaaS Products

| Product | Route | What it does |
|---|---|---|
| SabiWork | `/products/sabiwork` | AI cost-estimator for artisans & contractors |
| Receptra | `/products/receptra` | AI-powered receptionist for hospitality & law |
| AdPilot | `/products/adpilot` | AI marketing assistant inside WhatsApp |

---

## AI Assistant — Lead Qualification Widget

A floating chat widget (`components/ui/AssistantChat.tsx`) lives on every page, powered by the **DigiFusion Assistant agent** running on PathGuru's backend.

How it works:
- Visitor opens the chat → Assistant greets and listens
- Progressive qualification: challenge → tried before → company → timeline → authority
- Lead scored 0–5 as conversation progresses
- Score ≥ 4 → booking button appears linking to the Calendly strategy session
- Qualified leads saved to Supabase `leads` table; team notified via push or WhatsApp (Pulse)

The widget reads `NEXT_PUBLIC_PATHGURU_API` to construct the API URL. No other frontend changes needed — it's embedded in `app/layout.tsx` and auto-renders on all pages.

---

## Project status

### Done

| Area | Status |
|---|---|
| Site — full layout, navigation, Header + Footer | ✓ Live |
| Site — Blog with PathGuru CMS integration | ✓ Live |
| Site — Agency, About, Privacy Policy, booking page | ✓ Live |
| Site — Topic cluster pillar pages | ✓ Live |
| Site — Intelligence hub + 4 sub-pages | ✓ Live |
| Site — Products hub + SabiWork, Receptra, AdPilot landing pages | ✓ Live |
| Site — XML sitemap + robots.txt + JSON-LD schema | ✓ Live |
| CMS API — 15+ endpoints under `/api/cms/*` | ✓ Built |
| Database — `posts`, `products`, `orders`, `subscriptions`, `service_bookings`, `settings` tables | ✓ Migrated |
| PathGuru integration — bearer token auth on all CMS routes | ✓ Live |
| Blog post page — white card layout, prose styles, ToC sidebar | ✓ Live |
| AI Assistant chat widget — all pages, lead qualification, Calendly booking | ✓ Built |

### Pending

| Area | Status |
|---|---|
| Checkout | Orders in DB; buyer-facing payment flow (Stripe) not yet built |
| Intelligence product purchases | Payment flow for Field Guides / Tools when ready |
| `/terms` page | Reads from `settings` where key = `'terms'`; placeholder only |
| SabiWork / Receptra / AdPilot | SaaS products in development; Early Access CTA only |

---

## File structure

```
app/
├── layout.tsx                  Root layout — Header, Footer, AssistantChat widget
├── page.tsx                    Homepage
├── blog/                       Blog listing + post pages
├── intelligence/               Intelligence hub + field-guides, playbooks, research, tools
├── products/                   Products hub + sabiwork, receptra, adpilot
├── agency/                     Agency + booking page
├── about/                      About page
├── admin/                      CMS admin panel
├── api/                        Next.js API routes (CMS proxy, tracking, etc.)
└── ...

components/
├── layout/
│   ├── header.tsx              Site header with navigation
│   └── footer.tsx              Site footer
├── home/                       Homepage section components
├── agency/                     Agency page components
├── blog/                       Blog components
├── ui/
│   ├── AssistantChat.tsx       AI Assistant chat widget (lead qualification)
│   ├── button.tsx              Button component
│   ├── badge.tsx               Badge component
│   ├── booking-dropdown.tsx    Booking dropdown
│   └── animated-logo.tsx       Animated logo

lib/
└── utils/
    └── cn.ts                   Tailwind class merge utility
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

# Cloudflare R2 (blog media)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=...
R2_PUBLIC_URL=...

# CMS integration (shared secret with PathGuru)
# Must match DIGIFUSION_CMS_TOKEN in PathGuru's Render env
PATHGURU_CMS_TOKEN=...
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

## Connecting PathGuru ↔ DigiFusion

PathGuru calls DigiFusion's CMS API using a shared bearer token. DigiFusion never gives PathGuru direct database access.

1. Generate a shared secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Add it as `PATHGURU_CMS_TOKEN` in Vercel environment variables
3. Add the same value as `DIGIFUSION_CMS_TOKEN` in PathGuru's Render environment
4. Add `DIGIFUSION_API_URL=https://www.digitafusion.com` to PathGuru's Render environment

---

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment. All environment variables are set in the Vercel project dashboard.

---

## License

Private. All rights reserved.
