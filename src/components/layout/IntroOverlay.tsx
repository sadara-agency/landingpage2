'use client';

import { useEffect, useRef } from 'react';
import { SadaraLogo } from './SadaraLogo';
import './intro.css';

/**
 * One-time cinematic logo intro. Matches the prototype in
 * .superpowers/ui improvements/sadara-intro.html:
 *
 * - The overlay div is always in the DOM from first paint (no React state gate).
 * - CSS hides it instantly for returning visitors via the head-script data-intro flag.
 * - For fresh visitors: overlay is visible immediately, JS adds .sl-done after
 *   2750ms to trigger the lift — same pattern as prototype's play()+setTimeout.
 * - React only unmounts after the lift animation completes (~3.65s total).
 */
export function IntroOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Returning visitor: CSS already hides this via html[data-intro="seen"] .sl-intro.
    // Still unmount quickly to free DOM.
    if (document.documentElement.dataset.intro !== 'show') {
      ref.current?.remove();
      return;
    }

    // Fresh visitor — mark seen immediately so SPA nav never replays.
    document.documentElement.dataset.intro = 'seen';
    try { sessionStorage.setItem('sadara_intro_seen', '1'); } catch { /* private mode */ }

    // Add .sl-done after the hold period to trigger the lift animation —
    // same as prototype: setTimeout(()=>intro.classList.add('done'), hold)
    const t = setTimeout(() => {
      ref.current?.classList.add('sl-done');
    }, 2750);

    return () => clearTimeout(t);
  }, []);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.animationName === 'sl-lift' || e.animationName === 'sl-fade') {
      ref.current?.remove();
    }
  };

  return (
    <div
      ref={ref}
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
