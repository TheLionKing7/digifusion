# Paystack webhook hub (DigiFusion + AffiliateOS + products)

Paystack allows **one live webhook URL** per merchant account. DigiFusion acts as the **hub** and forwards events by transaction reference prefix.

## Paystack dashboard

Set the live webhook URL to:

```
https://www.digitafusion.com/api/webhooks/paystack
```

Do **not** point Paystack directly at `api.affos.link/webhook/payment` when sharing the same merchant key — AffiliateOS events are forwarded from DigiFusion.

## Routing table

| Reference prefix | Product | Handler |
|------------------|---------|---------|
| `df_*` | DigiFusion Intelligence Store / shop | Handled on DigiFusion (`processNormalizedEvent`) |
| `affos_*`, `affos_store_*` | AffiliateOS marketplace | Forwarded to AffiliateOS worker |
| `vek_*`, `vk_*` | Vektor | Forwarded to Vektor billing webhook |
| `sw_*`, `rec_*`, `ap_*` | Future SaaS products | Forwarded when configured |
| Other | — | Logged as `unknown`, **not** sent to Vektor |

AffiliateOS checkout references are created in `WorkSpace/AffiliateOS/workers/src/routes/checkout-initialize.ts`.

DigiFusion shop references use `df_*` in `digifusion/lib/shop/gateways/paystack.ts`.

## Environment variables (DigiFusion / Vercel)

```bash
PAYSTACK_SECRET_KEY=sk_live_...          # shared merchant key

# Optional — override AffiliateOS forward target (default: api.affos.link)
PAYSTACK_AFFILIATEOS_WEBHOOK_URL=https://api.affos.link/webhook/payment

# Product backends (optional)
PAYSTACK_PRODUCT_WEBHOOK_VEKTOR=https://vektor-xr-1.onrender.com/billing/webhook
```

## Verify routing locally

```bash
node scripts/test-paystack-router.mjs
```

## AffiliateOS repo

Code lives at `C:\Users\DELL\Documents\WorkSpace\AffiliateOS` (sibling to `Frastructure`).

After payment, AffiliateOS runs `execute_split_ledger` on `POST /webhook/payment` — per-user wallets are in Supabase (`wallet_balances`), not separate Paystack accounts.

See also: `AffiliateOS/docs/AFFOS_LINK_SETUP.md` section 5.
