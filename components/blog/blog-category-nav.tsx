'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import type { BlogPostType } from '@/types/blog';

const HEADER_OFFSET_PX = 64; /* matches header h-16 */

interface FilterType {
  value: BlogPostType | '';
  label: string;
}

interface BlogCategoryNavProps {
  types: FilterType[];
  counts: Record<string, number>;
  activeType?: BlogPostType;
}

export function BlogCategoryNav({ types, counts, activeType }: BlogCategoryNavProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { root: null, rootMargin: `-${HEADER_OFFSET_PX}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
      <nav
        aria-label="Blog categories"
        className={cn(
          'sticky z-40 border-b border-border/40 transition-shadow duration-200',
          'top-16 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75',
          stuck && 'shadow-lg shadow-black/20 ring-1 ring-border/30',
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {types.map((type) => {
            const isActive = (!type.value && !activeType) || type.value === activeType;
            const href = type.value === '' ? '/blog' : `/blog?postType=${type.value}`;
            const count = counts[type.value] || 0;

            return (
              <Link
                key={type.value || 'all'}
                href={href}
                className={cn(
                  'shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                    : 'bg-surface text-muted hover:text-foreground hover:bg-surface-lighter border border-border/40',
                )}
              >
                <span>{type.label}</span>
                <span
                  className={cn(
                    'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                    isActive
                      ? 'bg-accent-foreground/15 text-accent-foreground'
                      : 'bg-background/60 text-muted/80',
                  )}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
