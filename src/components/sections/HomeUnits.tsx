'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { units, unitsHeader } from '@/content/home';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

export function HomeUnits({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="border-t border-hairline bg-canvas py-20 md:py-28">
      <div className="wrap">
        <SectionHeader kicker={tr(unitsHeader.kicker)} title={tr(unitsHeader.title)} lead={tr(unitsHeader.lead)} className="mb-14" />
        <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-3">
          {units.map((u) => (
            <RevealItem key={u.key}>
              <Link href={localeHref(locale, u.href)} className="group flex h-full flex-col bg-paper p-8 transition-colors hover:bg-canvas">
                <span className="font-mono text-sm text-faint">{u.no}</span>
                <h3 className="mt-4 text-h3 font-extrabold text-ink">{tr(u.name)}</h3>
                <p className="mt-2 text-sm font-medium text-muted">{tr(u.tagline)}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{tr(u.desc)}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-electric">
                  {tr({ en: 'Explore', ar: 'استكشف' })}
                  <span className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
