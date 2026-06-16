'use client';

/**
 * Version 4 — "Final" backdrop.
 *
 * Static electric-blue glow from the bottom-right corner fading to black.
 * Consistent, brand-accurate, no randomness. Two layered radials:
 *   1. Large soft ellipse at bottom-right — the main corner colour.
 *   2. Tighter bright core at the very corner for depth.
 * Pure CSS, no animation. Decorative: pointer-events-none, aria-hidden.
 */
export function HeroBackdrop_v4() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 65% at 100% 100%, rgba(22, 41, 226, 0.55) 0%, rgba(22, 41, 226, 0.18) 45%, transparent 72%),
            radial-gradient(ellipse 40% 38% at 100% 100%, rgba(62, 80, 255, 0.45) 0%, transparent 60%)
          `,
        }}
      />
    </div>
  );
}
