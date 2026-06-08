'use client';

import { useEffect, useState } from 'react';

/** True when the user prefers reduced motion or is on a coarse pointer (touch). */
export function useReducedEffects() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqTouch = window.matchMedia('(pointer: coarse)');
    const update = () => setReduce(mqMotion.matches || mqTouch.matches);
    update();
    mqMotion.addEventListener('change', update);
    mqTouch.addEventListener('change', update);
    return () => {
      mqMotion.removeEventListener('change', update);
      mqTouch.removeEventListener('change', update);
    };
  }, []);

  return reduce;
}

/** True only when the user explicitly prefers reduced motion. */
export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduce;
}
