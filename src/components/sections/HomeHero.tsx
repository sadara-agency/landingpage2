'use client';

import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { hero } from '@/content/home';
import { audiences } from '@/content/nav';
import { images } from '@/content/images';
import { KenBurns } from '@/components/motion/KenBurns';
import { Button } from '@/components/ui/Button';

export function HomeHero({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-paper">
      <KenBurns src={images.homeHero} className="-z-20 opacity-95" />
      <div className="photo-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <div className="wrap relative z-10 pb-20 pt-[calc(var(--header-h)+2rem)] md:pb-28">
        <div className="max-w-4xl">
          <span className="kicker text-electric-hi">{tr(hero.kicker)}</span>
          <h1 className="mt-6 text-display font-extrabold text-white">{tr(hero.title)}</h1>
          <p className="mt-7 max-w-2xl text-lead text-white/85">{tr(hero.lead)}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {audiences.map((a) => (
              <Button key={a.key} href={localeHref(locale, a.href)} variant="secondary" size="md" className="border-white/30 bg-transparent text-white hover:border-white">
                {tr(a.label)}
                <span className="inline-block transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5">→</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
