'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { SadaraLogo } from './SadaraLogo';
import './intro.css';

// useLayoutEffect fires synchronously before browser paint on the client.
// On SSR it would warn, so alias to useEffect there (SSR renders null anyway).
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * One-time cinematic logo intro. Plays once per browser session.
 *
 * Uses useLayoutEffect so the overlay is inserted into the DOM synchronously
 * before the browser paints — CSS animations start at t=0 with no visible
 * delay. SSR renders null (no hydration mismatch, no flash for returning
 * visitors).
 *
 * The head script in layout.tsx sets data-intro="seen"|"show" before first
 * paint; we read it in the layout effect to decide whether to play.
 */
export function IntroOverlay() {
  const [show, setShow] = useState<boolean | null>(null);

  useIsomorphicLayoutEffect(() => {
    const isNew = document.documentElement.dataset.intro === 'show';
    if (isNew) {
      document.documentElement.dataset.intro = 'seen';
      try { sessionStorage.setItem('sadara_intro_seen', '1'); } catch { /* private mode */ }
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  if (!show) return null;

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setShow(false);
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
