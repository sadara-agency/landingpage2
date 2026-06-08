'use client';

import { cn } from '@/lib/cn';

/** Slow scale-in on a background image, for full-bleed hero photos. CSS-only;
 *  honors prefers-reduced-motion via the global rule. */
export function KenBurns({ src, className, alt = '' }: { src: string; className?: string; alt?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden={alt === '' || undefined}>
      <img src={src} alt={alt} className="h-full w-full animate-ken-burns object-cover" />
    </div>
  );
}
