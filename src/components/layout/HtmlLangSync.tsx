'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';
import { dir } from '@/lib/i18n';

/**
 * Sets <html lang> and <html dir> for the active locale. The root layout renders
 * <html> without locale context (locale lives in the [locale] segment), so we sync
 * it from the client. This is the ONLY place dir is set — never per-component.
 */
export function HtmlLangSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    const d = dir(locale);
    const html = document.documentElement;
    html.lang = locale;
    html.dir = d;
    // Also set dir on <body> so the font-family rules — which read the
    // --font-* variables defined on <body> by next/font — resolve correctly.
    document.body.dir = d;
  }, [locale]);

  return null;
}
