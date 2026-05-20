'use client';

import { useEffect, useState } from 'react';

/**
 * Slim accent-colored bar pinned to the top of the viewport that tracks
 * how far the reader has scrolled through the article container.
 *
 * Pass a ref-selector for the article body if you want it anchored to a
 * specific element. Defaults to the full document.
 */
export function ReadingProgress({ targetId }: { targetId?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const el = targetId ? document.getElementById(targetId) : null;
      let pct = 0;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = window.scrollY - (el.offsetTop || 0);
        pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
        if (rect.top > 0) pct = 0;
      } else {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        pct = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
      }
      setProgress(pct);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetId]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
