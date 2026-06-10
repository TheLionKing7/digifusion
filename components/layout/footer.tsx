'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import digiLogo from '@/assets/digilogo.png';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants/navigation';

const API_BASE = (process.env.NEXT_PUBLIC_PATHGURU_API || '').replace(/\/$/, '');

function NewsletterSignup() {
  const [email, setEmail]   = useState('');
  const [name,  setName]    = useState('');
  const [state, setState]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg,   setMsg]     = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim(), name: name.trim(), source: 'website' }),
      });
      if (!res.ok) throw new Error('Subscribe failed');
      setState('success');
      setMsg('You\'re in. Expect sharp, practical insights every week.');
    } catch {
      setState('error');
      setMsg('Something went wrong — try again or email us directly.');
    }
  }

  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">Weekly Intelligence</p>
            <h3 className="text-xl font-semibold text-foreground">Stay ahead of the curve.</h3>
            <p className="text-sm text-muted mt-1 max-w-sm">
              AI, automation, and growth strategy for operators who want practical insight — not generic filler.
            </p>
          </div>

          {state === 'success' ? (
            <p className="text-sm text-accent font-medium">{msg}</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[420px]">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent w-full sm:w-36"
              />
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent flex-1"
              />
              <button
                type="submit"
                disabled={state === 'loading'}
                className="px-5 py-2.5 rounded-lg bg-accent text-background text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
              >
                {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
          {state === 'error' && <p className="text-xs text-red-400 mt-1">{msg}</p>}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">

      {/* Newsletter signup */}
      <NewsletterSignup />

      {/* Main columns */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {/* Brand + contact */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={digiLogo}
                alt="DigiFusion"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-foreground">Digi</span>
                <span className="text-accent">Fusion</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs mb-4">
              Enterprise AI agency delivering automation, digital media, products and cutting-edge intelligence solutions.
            </p>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-sm text-accent hover:underline break-all"
            >
              {SOCIAL_LINKS.email}
            </a>
          </div>

          {/* Link columns */}
          {(['agency', 'intelligence', 'products', 'blog', 'company'] as const).map((key) => {
            const section = FOOTER_LINKS[key];
            return (
              <div key={section.label}>
                <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
                  {section.label}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar: socials → privacy/sitemap → copyright, all centered */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col items-center gap-5">

          {/* Social icons — circled, larger */}
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.quora}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Quora"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.006 0C5.372 0 0 5.38 0 12.007 0 18.635 5.372 24 12.006 24c1.675 0 3.267-.341 4.71-.953-.232-.496-.481-1.077-.691-1.614-.621-1.576-1.244-3.164-1.837-4.773.714.31 1.498.484 2.318.484 2.974 0 5.223-2.017 5.223-5.737 0-3.486-2.538-5.77-5.54-5.77-3.318 0-5.87 2.383-5.87 5.77 0 2.596 1.438 4.432 3.538 5.257l1.136 2.984C9.453 19.11 7.8 17.02 7.8 13.414c0-4.326 3.006-7.613 7.127-7.613 3.863 0 6.884 2.74 6.884 7.024 0 4.114-2.666 7.09-6.374 7.455.258.674.487 1.294.693 1.82C19.278 21.06 24 17.024 24 12.007 24 5.38 18.634 0 12.006 0z" />
              </svg>
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Email"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>

          {/* Privacy Policy | Site Map */}
          <div className="flex items-center gap-3 text-xs text-muted">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:text-accent transition-colors">
              Site Map
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} DigiFusion. All rights reserved.
          </p>

        </div>
      </div>

    </footer>
  );
}
