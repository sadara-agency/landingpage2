'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { proofSection } from '@/content/home';
import { athletes } from '@/content/athletes';
import { athletePhoto } from '@/content/images';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Tag } from '@/components/ui/Tag';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

export function HomeAthletes({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  const featured = [...athletes].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 4);
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader kicker={tr(proofSection.kicker)} title={tr(proofSection.title)} lead={tr(proofSection.lead)} />
          <Link href={localeHref(locale, '/athletes')} className="editorial-link whitespace-nowrap text-sm font-medium">
            {tr(proofSection.cta)} <span className="inline-block rtl:-scale-x-100">→</span>
          </Link>
        </div>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((a) => (
            <RevealItem key={a.slug}>
              <Link href={localeHref(locale, `/athletes/${a.slug}`)} className="group block overflow-hidden rounded-card border border-hairline bg-paper transition-colors hover:border-ink/30">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={athletePhoto(a.slug)} alt={tr(a.name)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute start-3 top-3"><Tag tone={a.tier === 'A+' ? 'gold' : 'blue'}>{a.tier}</Tag></div>
                </div>
                <div className="p-5">
                  <h3 className="text-h3 font-bold text-ink">{tr(a.name)}</h3>
                  <p className="mt-1 text-sm text-muted">{tr(a.position)}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
