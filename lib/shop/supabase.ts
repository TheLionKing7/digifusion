/**
 * Server-only Supabase client for the shop.
 *
 * Uses the service_role key — never import this file from a Client Component.
 * The anon key can read products (RLS policy products_public_read) but
 * everything else requires service_role.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function getShopDb(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      '[shop] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set. ' +
        'Add them to .env.local for dev, and to your hosting env for production.'
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { 'x-application': 'digifusion-shop' } },
  });

  return cached;
}
