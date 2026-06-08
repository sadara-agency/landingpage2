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
    const el = document.documentElement;
    el.lang = locale;
    el.dir = dir(locale);
  }, [locale]);

  return null;
}
