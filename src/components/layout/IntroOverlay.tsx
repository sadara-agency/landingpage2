'use client';

import { useEffect, useRef, useState } from 'react';
import { SadaraLogo } from './SadaraLogo';
import './intro.css';

/**
 * One-time cinematic logo intro. Plays once per browser session.
 *
 * Render path:
 * - SSR: always outputs the overlay markup (position:fixed, z-index 9999).
 * - Returning visitor: head script sets data-intro="seen" before first paint;
 *   CSS rule `html[data-intro="seen"] .sl-intro { display:none }` hides it
 *   instantly — no flash, no animation, React unmounts it after hydration.
 * - Fresh visitor: data-intro="show", overlay is visible from t=0 so CSS
 *   animations fire immediately on the real DOM node. React writes sessionStorage
 *   and unmounts after the lift animation ends (~3.7s).
 */
export function IntroOverlay() {
  const [mounted, setMounted] = useState(true);
  const isIntro = useRef(false);

  useEffect(() => {
    isIntro.current = document.documentElement.dataset.intro === 'show';

    if (isIntro.current) {
      // Mark seen so SPA nav / back-button never replays.
      document.documentElement.dataset.intro = 'seen';
      try {
        sessionStorage.setItem('sadara_intro_seen', '1');
      } catch {
        /* private mode */
      }
    } else {
      // Returning visitor: hidden by CSS, just unmount immediately.
      setMounted(false);
    }
  }, []);

  if (!mounted) return null;

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setMounted(false);
  };

  return (
    <div
      className="sl-intro"
      role="presentation"
      aria-hidden="true"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="sl-slab" />
      <div className="sl-wipe">
        <SadaraLogo className="sl-logo" />
      </div>
    </div>
  );
}
