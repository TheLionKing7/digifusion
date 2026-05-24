-- ════════════════════════════════════════════════════════════════════════════
-- DigiFusion — Migration 0005: Intelligence Library classification
--
-- Adds a `category` column to products so PathGuru can assign each product
-- to its correct section in the DigiFusion Intelligence Library or Products hub.
--
-- Also widens the orders.currency check to include NGN (Nigerian Naira)
-- and EUR, which are needed for the African and European markets.
--
-- Run in Supabase SQL editor (Dashboard → SQL Editor → New query → paste → Run).
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. Add category to products ───────────────────────────────────────────
--
-- Categories map directly to DigiFusion Intelligence Library sections
-- and the Products hub:
--
--   field-guide  → /intelligence/field-guides  (books, reference manuals)
--   playbook     → /intelligence/playbooks     (workflow packs, SOPs)
--   research     → /intelligence/research      (papers, case studies)
--   tool         → /intelligence/tools         (extensions, utilities)
--   saas         → /products/*                 (SabiWork, Receptra, AdPilot)
--   service      → /agency                     (done-for-you consultancy)
--   bundle       → any section                 (multi-item product bundles)

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS category text
  CHECK (category IN (
    'field-guide',
    'playbook',
    'research',
    'tool',
    'saas',
    'service',
    'bundle'
  ));

-- Index for category-filtered queries (Intelligence Library listing pages)
CREATE INDEX IF NOT EXISTS idx_products_category
  ON products(category)
  WHERE category IS NOT NULL;

-- ── 2. Extend orders currency constraint ──────────────────────────────────
--
-- Original constraint only allowed USD, NGN, GBP.
-- Adding EUR for European customers.

ALTER TABLE orders
  DROP CONSTRAINT IF EXISTS orders_currency_check;

ALTER TABLE orders
  ADD CONSTRAINT orders_currency_check
  CHECK (currency IN ('USD', 'NGN', 'GBP', 'EUR'));

-- ── 3. Extend products type constraint ────────────────────────────────────
--
-- The `type` column controls fulfillment behaviour.
-- We keep the 3 original values and add `saas` so SaaS products
-- can be created without overloading `service`.

ALTER TABLE products
  DROP CONSTRAINT IF EXISTS products_type_check;

ALTER TABLE products
  ADD CONSTRAINT products_type_check
  CHECK (type IN ('download', 'subscription', 'service', 'saas'));

-- ════════════════════════════════════════════════════════════════════════════
-- How it all maps together
-- ════════════════════════════════════════════════════════════════════════════
--
--  DigiFusion page              | products.category | products.type
--  ─────────────────────────────|───────────────────|──────────────
--  /intelligence/field-guides   | field-guide       | download
--  /intelligence/playbooks      | playbook          | download
--  /intelligence/research       | research          | download (or free)
--  /intelligence/tools          | tool              | download
--  /products/sabiwork           | saas              | saas
--  /products/receptra           | saas              | saas
--  /products/adpilot            | saas              | saas
--  /agency (bookings)           | service           | service
--  any multi-item pack          | bundle            | download
--
