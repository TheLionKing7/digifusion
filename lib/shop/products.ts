/**
 * Product-fetch helpers used by the public shop pages.
 *
 * All fetches go through the service_role Supabase client. The RLS policy
 * also allows anon → SELECT active products, so we could expose this
 * directly to the browser later if we want client-side filtering, but for
 * now everything goes through Server Components.
 */

import 'server-only';
import { getShopDb } from './supabase';
import type { Product } from '@/types/shop';

export async function listActiveProducts(): Promise<Product[]> {
  const db = getShopDb();
  const { data, error } = await db
    .from('products')
    .select('*')
    .eq('active', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[shop] listActiveProducts failed:', error.message);
    return [];
  }
  return (data || []) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getShopDb();
  const { data, error } = await db
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .maybeSingle();

  if (error) {
    console.warn('[shop] getProductBySlug failed:', error.message);
    return null;
  }
  return (data as Product) || null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = getShopDb();
  const { data, error } = await db.from('products').select('*').eq('id', id).maybeSingle();
  if (error) return null;
  return (data as Product) || null;
}
