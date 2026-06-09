'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
    };

    const onEnter = () => el.classList.add('cursor--hover');
    const onLeave = () => el.classList.remove('cursor--hover');

    document.addEventListener('mousemove', onMove);

    const bindHovers = () => {
      document.querySelectorAll<HTMLElement>('a, button, [role="button"], label').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    bindHovers();

    // Re-bind after any DOM mutations (dynamic content, route changes).
    const observer = new MutationObserver(bindHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} id="custom-cursor" aria-hidden="true" />;
}
