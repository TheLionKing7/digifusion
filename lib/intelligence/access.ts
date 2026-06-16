import 'server-only';
import { getShopDb } from '@/lib/shop/supabase';
import { getProductBySlug } from '@/lib/shop/products';
import { processNormalizedEvent } from '@/lib/shop/webhook-shared';
import { verifyPaystackTransaction } from '@/lib/shop/gateways/paystack';
import type { Order } from '@/types/shop';

/** True when a paid order includes the given research product slug. */
export async function verifyCaseStudyAccess(
  orderPublicId: string,
  productSlug: string,
): Promise<boolean> {
  const product = await getProductBySlug(productSlug);
  if (!product) return false;

  const db = getShopDb();
  const { data: orderRow } = await db
    .from('orders')
    .select('*')
    .eq('public_id', orderPublicId)
    .maybeSingle();

  if (!orderRow) return false;
  const order = orderRow as Order;

  const { data: items } = await db
    .from('order_items')
    .select('product_id')
    .eq('order_id', order.id);

  const ownsProduct = (items || []).some((row) => row.product_id === product.id);
  if (!ownsProduct) return false;

  if (order.status === 'paid') return true;

  if (
    order.status === 'pending' &&
    order.gateway === 'paystack' &&
    order.gateway_session_id
  ) {
    const verified = await verifyPaystackTransaction(order.gateway_session_id);
    if (verified) {
      await processNormalizedEvent({
        gateway: 'paystack',
        event_type: 'payment.succeeded',
        gateway_event_id: order.gateway_session_id,
        order_session_id: order.gateway_session_id,
        customer_email: order.customer_email,
        raw: { source: 'case-study-access-verify' },
      });
      return true;
    }
  }

  return false;
}
