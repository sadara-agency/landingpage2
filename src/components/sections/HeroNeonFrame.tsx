'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Decorative ambient glow for the homepage hero's right + bottom corner.
 *
 * A soft electric-blue aura that bleeds in from the right edge and the bottom
 * edge, breathing slowly — the calm "lighting" the client asked for (the red
 * marker on the mockup only marked WHERE the glow sits; no line on the site).
 *
 * Pure CSS gradients + framer-motion, no new deps. Decorative only:
 * pointer-events-none, aria-hidden, sits behind the hero content. The breathe
 * loop is JS-driven so it is gated with useReducedMotion() — when reduced, the
 * glow renders static.
 */
const ELECTRIC = '22, 41, 226'; // #1629e2 rgb
const ELECTRIC_HI = '62, 80, 255'; // #3e50ff rgb

export function HeroNeonFrame() {
  const reduce = useReducedMotion();

  const breathe = reduce
    ? {}
    : { opacity: [0.55, 0.9, 0.55], scale: [1, 1.06, 1] };
  const breatheTransition = reduce
    ? undefined
    : { duration: 9, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Corner aura — strongest at the bottom-right, fading inward. */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[90vh] w-[70vh]"
        style={{
          background: `radial-gradient(closest-side, rgba(${ELECTRIC_HI}, 0.30) 0%, rgba(${ELECTRIC}, 0.14) 45%, transparent 80%)`,
        }}
        animate={breathe}
        transition={breatheTransition}
      />

      {/* Right-edge wash — a vertical band of soft light hugging the right side. */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[42vh]"
        style={{
          background: `linear-gradient(to left, rgba(${ELECTRIC}, 0.20) 0%, rgba(${ELECTRIC}, 0.06) 40%, transparent 100%)`,
        }}
        animate={reduce ? {} : { opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom-edge wash — a horizontal band of soft light along the base. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[34vh]"
        style={{
          background: `linear-gradient(to top, rgba(${ELECTRIC}, 0.18) 0%, rgba(${ELECTRIC}, 0.05) 45%, transparent 100%)`,
        }}
        animate={reduce ? {} : { opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
