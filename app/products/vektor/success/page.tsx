'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const VEKTOR_API = 'https://vektor-xr-1.onrender.com';

function VektorSuccessContent() {
  const params    = useSearchParams();
  const plan      = params.get('plan') || '';
  const apiKey    = params.get('key')  || '';
  const planLabel = plan === 'pro' ? 'Pro' : plan === 'solo' ? 'Solo' : plan === 'free' ? 'Free' : '';
  const isFree    = !plan || plan === 'free';
  const downloadHref = apiKey
    ? `${VEKTOR_API}/auth/download?key=${encodeURIComponent(apiKey)}`
    : null;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 540, width: '100%', margin: '0 auto' }}>

        {/* Icon */}
        <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(244,166,29,0.12)', border: '1px solid rgba(244,166,29,0.3)' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f4a61d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Heading */}
        <p style={{ fontFamily: 'DM Mono,monospace', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f4a61d', marginBottom: 12 }}>
          ⚡ Vektor · {isFree ? 'API Key Ready' : 'Payment Confirmed'}
        </p>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 700, lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
          {isFree ? "You're in." : <>You&apos;re on <span style={{ color: '#f4a61d' }}>Vektor {planLabel}</span></>}
        </h1>
        <p style={{ fontSize: 16, color: '#8b94a8', lineHeight: 1.7, marginBottom: 32 }}>
          {isFree
            ? 'Your API key is ready. Download the extension, load it in Chrome, and start your first sweep.'
            : `Your ${planLabel} subscription is active. Download the extension below — your API key and receipt are also on the way to your inbox.`}
        </p>

        {/* Download CTA — primary action */}
        {downloadHref ? (
          <div style={{ marginBottom: 40 }}>
            <a
              href={downloadHref}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 36px', background: '#f4a61d', color: '#000',
                fontFamily: 'Playfair Display,serif', fontWeight: 700, fontSize: 15,
                borderRadius: 10, textDecoration: 'none', transition: 'all 0.2s',
                letterSpacing: '0.5px',
              }}
            >
              ⬇ Download Vektor Extension
            </a>
            <p style={{ fontSize: 12, color: '#5a6072', marginTop: 10 }}>
              Chrome extension (.zip) · Load unpacked via chrome://extensions
            </p>
          </div>
        ) : (
          <div style={{ marginBottom: 40, padding: '20px 24px', background: 'rgba(244,166,29,0.05)', border: '1px solid rgba(244,166,29,0.2)', borderRadius: 12 }}>
            <p style={{ fontSize: 13, color: '#f4a61d', fontWeight: 600, marginBottom: 6 }}>Check your email for the download link</p>
            <p style={{ fontSize: 13, color: '#8b94a8', lineHeight: 1.6 }}>
              We sent you a download link along with your API key. Or{' '}
              <Link href="/products/vektor#vk-register" style={{ color: '#f4a61d', textDecoration: 'underline' }}>
                retrieve your key here
              </Link>{' '}
              to get a fresh one.
            </p>
          </div>
        )}

        {/* Steps card */}
        <div style={{ background: '#0e1018', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '32px 28px', marginBottom: 28, textAlign: 'left' }}>
          <p style={{ fontFamily: 'DM Mono,monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5a6072', marginBottom: 20 }}>
            How to install
          </p>
          {[
            { num: '01', title: 'Download the extension', body: 'Click the button above. Save the .zip file somewhere easy to find.' },
            { num: '02', title: 'Unzip and open Chrome extensions', body: 'Unzip the folder. In Chrome go to chrome://extensions, enable Developer mode (top right), then click "Load unpacked" and select the unzipped folder.' },
            { num: '03', title: 'Paste your API key', body: 'Click the Vektor icon in your toolbar. Paste your API key (starts with vk_) into the field shown. Your key is in the confirmation email.' },
            { num: '04', title: 'Run your first sweep', body: 'Select a niche category and hit Sweep. Your first publishable brief lands in under 60 seconds.' },
          ].map(({ num, title, body }) => (
            <div key={num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono,monospace', fontSize: 11, fontWeight: 700, background: 'rgba(244,166,29,0.12)', color: '#f4a61d' }}>
                {num}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#dde3f0', fontSize: 14, marginBottom: 4 }}>{title}</p>
                <p style={{ fontSize: 13, color: '#8b94a8', lineHeight: 1.6 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/products/vektor"
            style={{ padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#8b94a8', textDecoration: 'none' }}
          >
            ← Back to Vektor
          </Link>
          {!isFree && (
            <Link
              href="/products/vektor#vk-pricing"
              style={{ padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: 'transparent', border: '1px solid rgba(244,166,29,0.3)', color: '#f4a61d', textDecoration: 'none' }}
            >
              View your plan
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}

export default function VektorSuccessPage() {
  return (
    <Suspense>
      <VektorSuccessContent />
    </Suspense>
  );
}
