import Link from 'next/link';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants/navigation';

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold text-sm font-mono">D</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                <span className="text-foreground">Digi</span>
                <span className="text-accent">Fusion</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Enterprise AI agency delivering automation, digital media, products and cutting-edge intelligence solutions.
            </p>
          </div>

          {/* Link Columns */}
          {Object.values(FOOTER_LINKS).map((section) => (
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
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} DigiFusion. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Twitter / X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Quora */}
            <a
              href={SOCIAL_LINKS.quora}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Quora"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.006 0C5.372 0 0 5.38 0 12.007 0 18.635 5.372 24 12.006 24c1.675 0 3.267-.341 4.71-.953-.232-.496-.481-1.077-.691-1.614-.621-1.576-1.244-3.164-1.837-4.773.714.31 1.498.484 2.318.484 2.974 0 5.223-2.017 5.223-5.737 0-3.486-2.538-5.77-5.54-5.77-3.318 0-5.87 2.383-5.87 5.77 0 2.596 1.438 4.432 3.538 5.257l1.136 2.984C9.453 19.11 7.8 17.02 7.8 13.414c0-4.326 3.006-7.613 7.127-7.613 3.863 0 6.884 2.74 6.884 7.024 0 4.114-2.666 7.09-6.374 7.455.258.674.487 1.294.693 1.82C19.278 21.06 24 17.024 24 12.007 24 5.38 18.634 0 12.006 0z" />
              </svg>
            </a>
            {/* Email */}
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-muted hover:text-accent transition-colors"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
