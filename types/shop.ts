/**
 * Shop type definitions — mirrors supabase/migrations/0001_shop_init.sql.
 *
 * Money is stored as minor units (integer cents/kobo) per currency. Use
 * `formatMoney(amount, currency)` from lib/utils/money.ts for display.
 */

export type Currency = 'USD' | 'NGN' | 'GBP';

export type ProductType = 'download' | 'subscription' | 'service' | 'saas';
export type ProductCategory =
  | 'field-guide'
  | 'playbook'
  | 'research'
  | 'tool'
  | 'saas'
  | 'service'
  | 'bundle';
export type Recurring = 'monthly' | 'yearly';
export type Gateway = 'stripe' | 'flutterwave' | 'opay' | 'manual';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'canceled';
export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'incomplete';
export type BookingStatus =
  | 'awaiting_intake'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'canceled';

/** Map of currency → minor-units price. Not every currency must be present. */
export type PriceMap = Partial<Record<Currency, number>>;

export interface DownloadFulfillment {
  r2_key: string;
  filename: string;
}

export interface ServiceFulfillment {
  calendar_url?: string;
  intake_url?: string;
  intake_questions?: { id: string; label: string; type: 'text' | 'textarea' | 'select'; options?: string[] }[];
}

export interface SubscriptionFulfillment {
  stripe_price_id: string;
}

export type ProductFulfillment =
  | DownloadFulfillment
  | ServiceFulfillment
  | SubscriptionFulfillment
  | Record<string, unknown>;

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: ProductType;
  category?: ProductCategory | null;
  prices: PriceMap;
  recurring: Recurring | null;
  fulfillment: ProductFulfillment;
  cover_image_url: string | null;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  public_id: string;
  customer_email: string;
  customer_name: string | null;
  customer_country: string | null;
  currency: Currency;
  subtotal: number;
  total: number;
  gateway: Gateway;
  gateway_session_id: string | null;
  gateway_payment_id: string | null;
  status: OrderStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  paid_at: string | null;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  qty: number;
  unit_price: number;
  currency: Currency;
  snapshot: {
    slug: string;
    name: string;
    type: ProductType;
    [k: string]: unknown;
  };
  created_at: string;
}

export interface Download {
  id: string;
  order_item_id: string;
  token: string;
  r2_key: string;
  filename: string;
  expires_at: string;
  max_uses: number;
  used_count: number;
  last_used_at: string | null;
  last_used_ip: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  order_id: string | null;
  product_id: string;
  customer_email: string;
  gateway: 'stripe';
  gateway_customer_id: string | null;
  gateway_subscription_id: string | null;
  status: SubscriptionStatus;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceBooking {
  id: string;
  order_id: string;
  product_id: string;
  status: BookingStatus;
  intake: Record<string, unknown>;
  scheduled_at: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

/** Items the buyer is paying for, before an order row exists. */
export interface CartItem {
  product_id: string;
  slug: string;
  name: string;
  type: ProductType;
  qty: number;
  unit_price: number;
  currency: Currency;
  cover_image_url?: string | null;
}

/** Normalized event passed to fulfillment, regardless of source gateway. */
export interface NormalizedPaymentEvent {
  gateway: Gateway;
  event_type: 'payment.succeeded' | 'payment.failed' | 'subscription.updated' | 'subscription.deleted';
  gateway_event_id: string;
  order_session_id?: string;
  subscription_id?: string;
  amount?: number;
  currency?: Currency;
  customer_email?: string;
  raw: unknown;
}
