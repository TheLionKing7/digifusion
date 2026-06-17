# OpenMarket Africa case study

- **Interactive HTML:** `/intelligence/research/openmarket-africa-coordination-case-study`
- **Shop SKU:** `openmarket-africa-coordination-case-study` — $99.99 USD (Paystack)
- **PDF on R2:** `Digifusion/Playbooks/Business/openmarket-case-study-v2.pdf` (bucket: `anydesign`)

Seed product:

```bash
node --env-file=.env.local scripts/seed-intelligence-products.mjs
```

Blog series:

```bash
node --env-file=.env.local scripts/seed-openmarket-blog.mjs
```

Scheduled posts cron (Friday 7:00 AM WAT publish for Series 2):

`GET /api/cron/publish-scheduled-posts` with `Authorization: Bearer $CRON_SECRET`
