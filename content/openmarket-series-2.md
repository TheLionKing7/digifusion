# Wiring the Coordination Layer: An Operator's Playbook for Open-Market Trade

*OpenMarket Series · Part 2 of 2 · By Boroji Adebayo-Hopewell, Chief Architect, Digital Fusion Labs*

---

In [Part 1](/blog/the-death-of-the-e-commerce-clone-why-africas-trillion-dollar-market-demands-coordination-), we established the macro diagnosis: asset-heavy marketplace clones are structurally incompatible with Africa's informal trade architecture. This installment assumes that framing and moves one level down — **how a tier-1 wholesaler, distributor, or FMCG manufacturer actually wires coordination into an existing market lane without fighting the network that already moves the goods.**

No repetition of the coordination-versus-disruption thesis. This is the deployment manual.

---

## 1. The Activation Sequence: 90 Days From Lane Selection to Verified GMV

Most B2B rollouts fail because they optimise for sign-ups. OpenMarket optimises for **first settled wholesale order** — the only event that proves a merchant is real, a wholesaler is willing, and settlement rails work.

**Days 1–14 — Lane selection and broker mapping**

Pick one wholesale corridor (e.g. Idumota FMCG lane A, Mushin provisions cluster B). Identify three line bosses who already control order flow. Do not hire field reps. Equip brokers with the Partner App in **verification mode only** — they earn zero until a merchant completes a paid order.

Deliverable: a lane map listing tier-1 nodes, runner relationships, and average restock cadence by SKU family.

**Days 15–45 — Virtual warehouse digitisation**

The wholesaler's physical stock stays put. OpenMarket's Virtual Warehouse Ledger mirrors on-hand quantity by SKU, updated only when the wholesaler confirms dispatch or receives manufacturer replenishment. Ghost inventory is the primary deployment failure mode — the ledger must never show stock the wholesaler cannot honour within 24 hours.

Deliverable: ledger accuracy ≥ 92% on spot audits across 20 SKUs.

**Days 46–75 — Settlement loop hardening**

Run the full loop on live orders: WhatsApp order capture → structured payload → payment verification → wholesaler release → runner confirmation → merchant receipt. Measure **settlement integrity ratio** (orders where payment, dispatch, and receipt timestamps align within SLA) — target ≥ 94% before scaling broker incentives.

**Days 76–90 — Broker bounty unlock**

Commission unlocks only after the merchant's first settled order. Track **broker yield** (bounties paid ÷ verified first orders) — healthy lanes run 1.0–1.2×, not 3× (which signals vanity onboarding).

If Day 90 GMV is verified and settlement integrity holds, the lane is ready for AACI scoring and manufacturer dashboards.

---

## 2. Settlement State Machine: What Happens Between "I Want 2 Cartons" and Payout

Series 1 described coordination abstractly. Operators need the state machine.

| State | Who acts | System guarantee |
| ----- | -------- | ---------------- |
| **Intent captured** | Merchant (WhatsApp / voice) | SmartBridge normalises SKU, qty, price band |
| **Quote locked** | Wholesaler | Dynamic Liquidity Metrics price valid 4 hours |
| **Payment pending** | Merchant | MoMo / bank / agent — no dispatch until verified |
| **Escrow verified** | Atlas Core | Payment hash matched to order ID |
| **Released** | Wholesaler | 95% payout triggered; 5% coordination fee retained |
| **In transit** | 3PL runner | GPS or handoff code optional by lane |
| **Closed** | Merchant | Receipt confirms; AACI inputs updated |

The reconciliation tax that killed incumbents was manual confirmation at the **Payment pending → Escrow verified** transition. OpenMarket automates that transition with bank/MoMo webhooks and dispute windows measured in minutes, not days.

Operators should publish a **lane SLA card** to wholesalers: median time from payment to release, dispute rate, and chargeback exposure. Transparency replaces the trust deficit that made wholesalers boycott direct-to-retailer platforms.

---

## 3. AACI in Production: From Transaction Log to Bankable Signal

Part 1 introduced AACI conceptually. Here is how scoring works in deployment.

Four continuous inputs feed the Atlas Alternative Credit Index (0–1000):

- **Gross transaction volume (30-day rolling)** — normalised by SKU category and lane density
- **Fulfillment ratio** — orders delivered ÷ orders paid
- **Replenishment variance** — standard deviation of restock interval vs lane median
- **Settlement lag** — days between due date and confirmed payment

Weights shift by merchant maturity: new merchants (under 90 days) weight fulfillment ratio highest; established merchants weight replenishment variance highest because it predicts forward demand.

**Syndication rule:** OpenMarket never originates credit. Banks subscribe to AACI bands via API — e.g. score 720+ unlocks 14-day inventory float at partner rate X. OpenMarket's revenue is data licensing and facilitation, not NPL exposure.

Deployment checkpoint: before promoting AACI to a bank partner, run a **shadow scoring period** (60 days) and compare AACI bands to actual default behaviour on a held-out merchant set. Publish the confusion matrix internally — if high scores still default above policy threshold, recalibrate weights before go-live.

---

## 4. Cross-Border Lane Design: One SKU, Two Countries, Zero USD Correspondent

Part 1 covered why PAPSS matters economically. This section covers **one operational lane**.

**Scenario:** Accra distributor stocks Nigerian-origin SKU; Lagos retailer orders via WhatsApp; settlement must clear without USD routing.

1. **Origin verification** — manufacturer certificate + wholesaler KYC on file (AfCFTA digital trade doc equivalence)
2. **FX leg** — PAPSS Cedi-in / Naira-out instruction at quote lock
3. **Customs handoff** — border event logged as state transition, not a separate app
4. **Last mile** — existing 3PL on Nigerian side; OpenMarket does not own the truck

Success metric: **cross-border settlement latency** (quote lock → wholesaler release) under 45 minutes at P95 once KYC is warm.

Failure mode to monitor: **FX drift between quote lock and payment** — if lag exceeds 20 minutes, auto-requote or cancel. Static cross-border pricing is how margin dies in volatile FX markets.

---

## 5. Manufacturer Control Tower: Demand Velocity Without Touching the Chain

FMCG brands do not need to disintermediate wholesalers. They need **visibility and precision subsidies**.

OpenMarket's manufacturer dashboard exposes:

- **LGA-level velocity** — units per week by SKU, 7-day and 28-day trend
- **Stockout risk index** — wholesaler ledger depth ÷ trailing velocity
- **SmartSubsidy ROI** — promotional lift vs baseline, per market hub

A SmartSubsidy campaign targets one SKU in one hub for 14 days: subsidise coordination fee on that SKU only, measure incremental velocity vs control hub. Brands fund movement, not apps.

Deployment rule: manufacturers get read-only ledger access to their SKUs — never merchant PII beyond aggregate counts. Data minimisation keeps wholesalers in the network.

---

## 6. Unit Economics of a Protocol (Not a Platform)

Investors underwriting coordination should model **variable revenue per verified order**, not GMV vanity.

| Revenue line | Typical range | Notes |
| ------------ | ------------- | ----- |
| Coordination fee | 3–7% of order value | On logistics-coordinated lanes only |
| Verification / escrow | Flat per transaction | Covers MoMo/bank matching |
| AACI data licence | Per merchant per month | Bank partner pays, not merchant |
| Manufacturer insights | Tiered SaaS | Velocity dashboards + SmartSubsidy |

Cost structure stays lean: no warehouse rent, no fleet depreciation, no field salary base. **Burn scales with failed lanes, not with geography.**

The metric that matters for Series 2 readers: **verified GMV per coordination dollar spent** — if onboarding a lane costs ₦2M and produces less than ₦40M verified GMV in 90 days, kill the lane and reallocate brokers.

---

## 7. Deployment Failure Modes (and How to Kill Them Early)

| Failure mode | Early signal | Protocol response |
| ------------ | ------------ | ----------------- |
| Ghost inventory | Fulfillment ratio drops below 85% | Freeze ledger SKUs; wholesaler re-audit |
| Broker farming | High sign-ups, zero first orders | Bounty remains locked; broker tier demotion |
| Payment spoofing | Escrow mismatches spike | Tighten webhook signatures; shorten quote TTL |
| Price arbitrage | Merchants route around locked quotes | Narrow SKU price bands; alert wholesaler |
| Data hoarding | Wholesaler refuses ledger sync | Lane not promoted to manufacturer view |

Run a **weekly lane health review** with these five indicators. Coordination protocols win by pruning bad lanes faster than platforms prune bad cities.

---

## 8. What You Should Do This Quarter

**If you are a tier-1 wholesaler:** digitise one corridor's top 30 SKUs on the Virtual Warehouse Ledger and commit to 4-hour quote SLAs.

**If you are an FMCG manufacturer:** sponsor one SmartSubsidy experiment in a single hub; measure velocity lift, not app downloads.

**If you are an investor:** underwrite teams that report settlement integrity and broker yield — not cumulative "merchants onboarded."

**If you need the full architecture, financial model, and competitive matrix:** the [OpenMarket Africa Case Study — The Coordination Imperative](/intelligence/research/openmarket-africa-coordination-case-study) is the McKinsey-grade deep dive. Part 1 and Part 2 are the executive briefs; the case study is the operating system documentation.

---

*Part 1: [The Death of the E-Commerce Clone](/blog/the-death-of-the-e-commerce-clone-why-africas-trillion-dollar-market-demands-coordination-) · Case study: [The Coordination Imperative](/intelligence/research/openmarket-africa-coordination-case-study) · enquiries@digitafusion.com · openmarket.africa*
