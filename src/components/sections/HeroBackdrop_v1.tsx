'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Version 1 — "Aurora Drift" (subtle / premium).
 *
 * Replaces the hero's single static radial with a few slow-drifting electric-blue
 * aurora blobs over the black field, plus a faint film-grain overlay. Calm, ambient,
 * "expensive not flashy". Pure framer-motion + CSS, no new deps.
 *
 * Direction-agnostic (centered/percentage positioning — same in LTR and RTL).
 * Decorative only: pointer-events-none, aria-hidden, sits behind hero content.
 * Reduced-motion → all blobs render static at their resting position.
 */
const ELECTRIC = '22, 41, 226'; // #1629e2
const ELECTRIC_HI = '62, 80, 255'; // #3e50ff

type Blob = {
  className: string;
  color: string;
  drift: { x: number[]; y: number[]; scale: number[]; opacity: number[] };
  duration: number;
};

const BLOBS: Blob[] = [
  {
    className: 'left-[8%] top-[18%] h-[60vh] w-[60vh]',
    color: ELECTRIC_HI,
    drift: { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 0.96, 1], opacity: [0.18, 0.3, 0.2, 0.18] },
    duration: 22,
  },
  {
    className: 'right-[6%] top-[34%] h-[72vh] w-[72vh]',
    color: ELECTRIC,
    drift: { x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.94, 1.1, 1], opacity: [0.22, 0.32, 0.24, 0.22] },
    duration: 26,
  },
  {
    className: 'left-[42%] bottom-[6%] h-[50vh] w-[50vh]',
    color: ELECTRIC_HI,
    drift: { x: [0, 30, -40, 0], y: [0, -25, 15, 0], scale: [1, 1.08, 0.92, 1], opacity: [0.14, 0.24, 0.16, 0.14] },
    duration: 19,
  },
];

export function HeroBackdrop_v1() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.className}`}
          style={{
            background: `radial-gradient(closest-side, rgba(${b.color}, 0.5) 0%, rgba(${b.color}, 0.18) 45%, transparent 78%)`,
            opacity: b.drift.opacity[0],
          }}
          animate={
            reduce
              ? undefined
              : { x: b.drift.x, y: b.drift.y, scale: b.drift.scale, opacity: b.drift.opacity }
          }
          transition={reduce ? undefined : { duration: b.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Film grain — faint, static, multiply-ish texture over the field. */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}
