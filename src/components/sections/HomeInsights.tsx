'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { insightsTeaser } from '@/content/home';
import { articles } from '@/content/insights';
import { articlePhoto } from '@/content/images';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

export function HomeInsights({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  const top = articles.slice(0, 3);
  return (
    <section className="border-t border-hairline bg-paper py-20 md:py-28">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader kicker={tr(insightsTeaser.kicker)} title={tr(insightsTeaser.title)} />
          <Link href={localeHref(locale, '/insights')} className="editorial-link whitespace-nowrap text-sm font-medium">
            {tr(insightsTeaser.cta)} <span className="inline-block rtl:-scale-x-100">→</span>
          </Link>
        </div>
        <RevealGroup className="grid gap-8 lg:grid-cols-3">
          {top.map((a, i) => (
            <RevealItem key={i} className={i === 0 ? 'lg:col-span-1' : ''}>
              <Link href={localeHref(locale, '/insights')} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-hairline">
                  <img src={articlePhoto(i)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-electric">{tr(a.category)}</div>
                <h3 className="mt-2 text-h3 font-bold leading-snug text-ink">{tr(a.title)}</h3>
                <div className="mt-2 text-xs text-faint">{a.date}</div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
