'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/types/blog';

interface TocProps {
  items: TocItem[];
}

/**
 * Sticky on-this-page navigation that highlights the closest heading
 * via IntersectionObserver. Renders nothing if there are no h2/h3 in
 * the post body.
 */
export function TableOfContents({ items }: TocProps) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pl-8 border-l border-border/40">
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted/70 mb-4">
        On this page
      </p>
      <ul className="space-y-2.5 text-sm">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
              <a
                href={`#${item.id}`}
                className={`block leading-snug transition-colors ${
                  isActive
                    ? 'text-accent font-medium border-l-2 border-accent -ml-[1.5rem] pl-6'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
