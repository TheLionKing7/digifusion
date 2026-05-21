-- ════════════════════════════════════════════════════════════════════════════
-- DigiFusion Shop — initial schema
-- Run in Supabase SQL editor (or via supabase CLI).
--
-- Conventions:
--   * uuid primary keys via gen_random_uuid()
--   * public_id columns for guest-accessible URLs (opaque short strings)
--   * money stored in minor units (integer cents) per currency to avoid float
--   * status enums kept as text + check constraints so they're easy to extend
-- ════════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── products ──────────────────────────────────────────────────────────────
create table if not exists products (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  description    text default '',
  type           text not null check (type in ('download', 'subscription', 'service')),

  -- Multi-currency pricing in minor units (cents/kobo).
  -- Example: {"USD": 4900, "NGN": 6500000, "GBP": 3900}
  prices         jsonb not null default '{}'::jsonb,

  -- For subscriptions only: 'monthly' or 'yearly'. Null for one-time products.
  recurring      text check (recurring in ('monthly', 'yearly')),

  -- Fulfillment metadata. Shape depends on `type`:
  --   download:    { "r2_key": "ebooks/xyz.epub", "filename": "Book.epub" }
  --   service:     { "calendar_url": "https://cal.com/boroji/audit", "intake_url": "..." }
  --   subscription:{ "stripe_price_id": "price_..." }
  fulfillment    jsonb not null default '{}'::jsonb,

  cover_image_url text,
  featured       boolean default false,
  active         boolean default true,

  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

create index if not exists idx_products_active     on products(active);
create index if not exists idx_products_featured   on products(featured) where featured = true;

-- ── orders ────────────────────────────────────────────────────────────────
create table if not exists orders (
  id                  uuid primary key default gen_random_uuid(),
  -- Short opaque token in URLs (e.g. /orders/abc123def456). Customer gets it via email.
  public_id           text unique not null default substring(encode(gen_random_bytes(9), 'base64'), 1, 12),

  customer_email      text not null,
  customer_name       text,
  customer_country    text,

  currency            text not null check (currency in ('USD', 'NGN', 'GBP')),
  subtotal            integer not null,  -- minor units
  total               integer not null,

  gateway             text not null check (gateway in ('stripe', 'flutterwave', 'opay', 'manual')),
  gateway_session_id  text,    -- e.g. cs_live_... for Stripe, tx_ref for Flutterwave
  gateway_payment_id  text,    -- payment intent / charge id after capture

  status              text not null default 'pending'
                      check (status in ('pending', 'paid', 'failed', 'refunded', 'canceled')),

  metadata            jsonb default '{}'::jsonb,  -- IP, UA, referrer, utm params, etc.

  created_at          timestamptz default now(),
  paid_at             timestamptz,
  updated_at          timestamptz default now()
);

create index if not exists idx_orders_customer    on orders(customer_email);
create index if not exists idx_orders_status      on orders(status);
create index if not exists idx_orders_gateway_sid on orders(gateway_session_id);

-- ── order_items ───────────────────────────────────────────────────────────
create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  product_id  uuid not null references products(id),
  qty         integer not null default 1 check (qty > 0),
  unit_price  integer not null,    -- minor units, in order.currency
  currency    text not null,

  -- Snapshot at time of purchase so later product edits don't change history.
  snapshot    jsonb not null default '{}'::jsonb,

  created_at  timestamptz default now()
);

create index if not exists idx_order_items_order   on order_items(order_id);
create index if not exists idx_order_items_product on order_items(product_id);

-- ── downloads ─────────────────────────────────────────────────────────────
-- One row per download-type order_item. Token is what goes in the email link.
create table if not exists downloads (
  id              uuid primary key default gen_random_uuid(),
  order_item_id   uuid not null references order_items(id) on delete cascade,
  token           text unique not null default encode(gen_random_bytes(24), 'hex'),
  r2_key          text not null,
  filename        text not null,
  expires_at      timestamptz not null,
  max_uses        integer not null default 5,
  used_count      integer not null default 0,
  last_used_at    timestamptz,
  last_used_ip    text,

  created_at      timestamptz default now()
);

create index if not exists idx_downloads_token on downloads(token);

-- ── subscriptions (Stripe-only for v1) ────────────────────────────────────
create table if not exists subscriptions (
  id                       uuid primary key default gen_random_uuid(),
  order_id                 uuid references orders(id) on delete set null,
  product_id               uuid not null references products(id),
  customer_email           text not null,

  gateway                  text not null default 'stripe',
  gateway_customer_id      text,
  gateway_subscription_id  text unique,

  status                   text not null
                           check (status in ('trialing', 'active', 'past_due', 'canceled', 'unpaid', 'incomplete')),
  current_period_end       timestamptz,
  cancel_at_period_end     boolean default false,

  created_at               timestamptz default now(),
  updated_at               timestamptz default now()
);

create index if not exists idx_subscriptions_customer on subscriptions(customer_email);
create index if not exists idx_subscriptions_status   on subscriptions(status);

-- ── service_bookings ──────────────────────────────────────────────────────
create table if not exists service_bookings (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders(id) on delete cascade,
  product_id    uuid not null references products(id),

  status        text not null default 'awaiting_intake'
                check (status in ('awaiting_intake', 'scheduled', 'in_progress', 'completed', 'canceled')),

  intake        jsonb default '{}'::jsonb,   -- whatever the intake form captured
  scheduled_at  timestamptz,
  notes         text default '',

  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index if not exists idx_bookings_status on service_bookings(status);

-- ── webhook_events (idempotency) ──────────────────────────────────────────
-- Insert with ON CONFLICT DO NOTHING in handlers — if the gateway re-delivers
-- an event, we no-op without double-processing the order.
create table if not exists webhook_events (
  id                 uuid primary key default gen_random_uuid(),
  gateway            text not null check (gateway in ('stripe', 'flutterwave', 'opay')),
  event_type         text not null,
  gateway_event_id   text not null,
  payload            jsonb not null,
  processed          boolean default false,
  processed_at       timestamptz,
  error              text,

  created_at         timestamptz default now(),

  unique (gateway, gateway_event_id)
);

create index if not exists idx_webhook_events_gw_eventid on webhook_events(gateway, gateway_event_id);

-- ── updated_at trigger helper ─────────────────────────────────────────────
create or replace function touch_updated_at()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

drop trigger if exists trg_products_touch       on products;
drop trigger if exists trg_orders_touch         on orders;
drop trigger if exists trg_subscriptions_touch  on subscriptions;
drop trigger if exists trg_bookings_touch       on service_bookings;

create trigger trg_products_touch      before update on products       for each row execute function touch_updated_at();
create trigger trg_orders_touch        before update on orders         for each row execute function touch_updated_at();
create trigger trg_subscriptions_touch before update on subscriptions  for each row execute function touch_updated_at();
create trigger trg_bookings_touch      before update on service_bookings for each row execute function touch_updated_at();

-- ── Row Level Security ────────────────────────────────────────────────────
-- Everything stays locked from the anon key. The Next.js server uses the
-- service_role key for all reads/writes. Public access happens only through
-- our own API endpoints which apply the rules they need (e.g. guest order
-- lookup by public_id).

alter table products         enable row level security;
alter table orders           enable row level security;
alter table order_items      enable row level security;
alter table downloads        enable row level security;
alter table subscriptions    enable row level security;
alter table service_bookings enable row level security;
alter table webhook_events   enable row level security;

-- Public read of active products via the anon key, so the shop page can
-- fetch without going through an API route if you ever want client-side
-- product loading.
drop policy if exists products_public_read on products;
create policy products_public_read on products for select to anon using (active = true);
