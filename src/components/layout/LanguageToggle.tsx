'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { otherLocale, stripLocale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export function LanguageToggle({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname() || `/${locale}`;
  const target = otherLocale(locale);
  const href = `/${target}${stripLocale(pathname) === '/' ? '' : stripLocale(pathname)}`;

  // Single-locale mode — toggle hidden until Arabic is re-enabled.
  return null;
}
