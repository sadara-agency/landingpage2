'use client';

import { cn } from '@/lib/cn';

/** Infinite horizontal marquee of children, duplicated for seamless loop. */
export function Marquee({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div className="flex shrink-0 animate-marquee items-center gap-12 pe-12 motion-reduce:animate-none">
        {children}
      </div>
      <div className="flex shrink-0 animate-marquee items-center gap-12 pe-12 motion-reduce:animate-none" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
