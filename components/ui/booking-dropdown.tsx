'use client';

import { useState, useRef, useEffect } from 'react';

interface BookingDropdownProps {
  /** Visual size — 'lg' matches the hero primary CTA, 'md' matches CTA section */
  size?: 'md' | 'lg';
  label?: string;
}

export function BookingDropdown({
  size = 'md',
  label = 'Book a Strategy Session',
}: BookingDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const px = size === 'lg' ? 'px-6 py-3' : 'px-8 py-4';

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`group inline-flex items-center gap-2 ${px} text-sm font-medium rounded-lg bg-accent text-background hover:bg-accent-dim transition-all active:scale-[0.98] select-none`}
      >
        {label}
        {/* Chevron — rotates when open */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-72 rounded-xl bg-surface border border-border shadow-2xl overflow-hidden animate-fade-in">
          {/* AI Automation option */}
          <a
            href="https://tally.so/r/2ED80A"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="group flex items-start gap-4 px-5 py-4 hover:bg-surface-light transition-colors border-b border-border"
          >
            <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                  AI Automation
                </span>
                <svg className="w-3.5 h-3.5 text-muted group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Workflows, agents &amp; intelligent systems
              </p>
            </div>
          </a>

          {/* Business Development option */}
          <a
            href="https://tally.so/r/VLDMkg"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="group flex items-start gap-4 px-5 py-4 hover:bg-surface-light transition-colors border-b border-border"
          >
            <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-foreground group-hover:text-[#7c3aed] transition-colors">
                  Business Development
                </span>
                <svg className="w-3.5 h-3.5 text-muted group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Pipeline, strategy &amp; revenue systems
              </p>
            </div>
          </a>

          {/* Digital Media option */}
          <a
            href="https://tally.so/r/EkN0xr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="group flex items-start gap-4 px-5 py-4 hover:bg-surface-light transition-colors"
          >
            <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#f59e0b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14"/>
                <rect x="1" y="6" width="14" height="12" rx="2"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-foreground group-hover:text-[#f59e0b] transition-colors">
                  Digital Media
                </span>
                <svg className="w-3.5 h-3.5 text-muted group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                SEO, content, social &amp; visibility
              </p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
