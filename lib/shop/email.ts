/**
 * Resend wrapper for transactional shop emails.
 *
 * Templates live inline as small builder functions returning HTML strings —
 * fine for v1 with only 3 emails. Move to React Email if the list grows.
 */

import type { Order, OrderItem, Download } from '@/types/shop';
import { formatMoney } from '@/lib/utils/money';

const FROM = process.env.SHOP_FROM_EMAIL || 'shop@digifusion.ai';
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://digifusion.ai';

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

async function send({ to, subject, html, replyTo }: SendArgs): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[shop email] RESEND_API_KEY not set — skipping send to', to);
    return { ok: false, error: 'RESEND_API_KEY missing' };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `DigiFusion <${FROM}>`,
        to,
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      return { ok: false, error: `resend ${res.status}: ${errBody.slice(0, 200)}` };
    }

    const data = (await res.json()) as { id?: string };
    return { ok: true, id: data.id };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/* ── Templates ─────────────────────────────────────── */

function shell(title: string, body: string): string {
  return `<!doctype html><html><body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#fafaf7;margin:0;padding:32px;color:#1a1408;">
  <table align="center" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:24px 28px;border-bottom:1px solid #f0f0ed;">
      <div style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#1a1408;">DigiFusion</div>
    </td></tr>
    <tr><td style="padding:28px;">
      <h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 16px;line-height:1.2;">${title}</h1>
      ${body}
    </td></tr>
    <tr><td style="padding:18px 28px;background:#fafaf7;font-size:11px;color:#888;">
      DigiFusion · <a href="${SITE}" style="color:#888;">${SITE.replace(/^https?:\/\//, '')}</a>
    </td></tr>
  </table>
</body></html>`;
}

function itemsTable(order: Order, items: OrderItem[]): string {
  const rows = items.map((it) => {
    const line = it.unit_price * it.qty;
    return `<tr>
      <td style="padding:8px 0;">${escapeHtml(it.snapshot.name)} ${it.qty > 1 ? `× ${it.qty}` : ''}</td>
      <td style="padding:8px 0;text-align:right;">${formatMoney(line, order.currency)}</td>
    </tr>`;
  }).join('');

  return `<table style="width:100%;font-size:14px;border-collapse:collapse;margin:16px 0;">
    ${rows}
    <tr style="border-top:1px solid #eee;">
      <td style="padding:12px 0;font-weight:600;">Total</td>
      <td style="padding:12px 0;text-align:right;font-weight:600;">${formatMoney(order.total, order.currency)}</td>
    </tr>
  </table>`;
}

/* ── Public send functions ─────────────────────────── */

/** Order receipt sent immediately after payment confirms. */
export async function sendOrderReceipt(
  order: Order,
  items: OrderItem[],
  downloads: Download[] = []
): Promise<{ ok: boolean; error?: string }> {
  const orderUrl = `${SITE}/orders/${order.public_id}`;
  const downloadList = downloads.length
    ? `<div style="margin:20px 0;padding:16px;background:#fafaf7;border-radius:8px;">
         <p style="margin:0 0 10px;font-weight:600;font-size:13px;">Your downloads</p>
         ${downloads.map((d) => `
           <p style="margin:6px 0;font-size:14px;">
             <a href="${SITE}/api/download/${d.token}" style="color:#c9a35a;text-decoration:none;">↓ ${escapeHtml(d.filename)}</a>
             <br><span style="font-size:11px;color:#888;">Link valid until ${new Date(d.expires_at).toLocaleString()} · ${d.max_uses} downloads max</span>
           </p>
         `).join('')}
       </div>`
    : '';

  const body = `
    <p style="font-size:15px;line-height:1.6;">Thanks for your order — payment confirmed.</p>
    ${itemsTable(order, items)}
    ${downloadList}
    <p style="font-size:13px;color:#666;margin:20px 0 0;">
      View your order any time:<br>
      <a href="${orderUrl}" style="color:#c9a35a;">${orderUrl}</a>
    </p>`;

  return send({
    to: order.customer_email,
    subject: `Receipt for your DigiFusion order`,
    html: shell('Payment received', body),
  });
}

/** Standalone download-link delivery (e.g. resending links from admin). */
export async function sendDownloadLink(toEmail: string, downloads: Download[]): Promise<{ ok: boolean; error?: string }> {
  const body = `
    <p style="font-size:15px;line-height:1.6;">Here are your download links.</p>
    ${downloads.map((d) => `
      <p style="margin:10px 0;">
        <a href="${SITE}/api/download/${d.token}" style="color:#c9a35a;text-decoration:none;font-weight:500;">↓ ${escapeHtml(d.filename)}</a>
        <br><span style="font-size:11px;color:#888;">Valid until ${new Date(d.expires_at).toLocaleString()}</span>
      </p>
    `).join('')}`;
  return send({ to: toEmail, subject: 'Your DigiFusion downloads', html: shell('Your downloads', body) });
}

/** Service-booking confirmation with intake link. */
export async function sendBookingConfirmation(
  order: Order,
  productName: string,
  intakeUrl?: string
): Promise<{ ok: boolean; error?: string }> {
  const body = `
    <p style="font-size:15px;line-height:1.6;">
      Thanks for booking <strong>${escapeHtml(productName)}</strong>. I&rsquo;ll be in touch within 24 hours to schedule.
    </p>
    ${intakeUrl ? `
      <p style="margin:20px 0;">
        To help me prepare, please fill out the short intake form:<br>
        <a href="${escapeHtml(intakeUrl)}" style="display:inline-block;margin-top:8px;padding:10px 18px;background:#c9a35a;color:#1a1408;text-decoration:none;border-radius:8px;font-weight:500;">Open intake form →</a>
      </p>` : ''}
    <p style="font-size:13px;color:#666;margin-top:20px;">
      Reference: <code style="background:#f5f3ee;padding:2px 6px;border-radius:4px;">${order.public_id}</code>
    </p>`;

  return send({
    to: order.customer_email,
    subject: `Booking confirmed: ${productName}`,
    html: shell('Booking confirmed', body),
    replyTo: FROM,
  });
}

function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
