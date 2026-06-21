'use client';
import { useEffect } from 'react';
import { SadaraLogo } from './SadaraLogo';
import './intro.css';

export function IntroOverlay() {
  useEffect(() => {
    try { sessionStorage.setItem('sadara_intro_seen', '1'); } catch {}
  }, []);
  return (
    <div className="sl-intro" role="presentation" aria-hidden="true">
      <div className="sl-slab" />
      <div className="sl-wipe">
        <SadaraLogo className="sl-logo" />
      </div>
    </div>
  );
}
