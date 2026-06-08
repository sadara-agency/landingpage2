'use client';

import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { proof } from '@/content/home';
import { CountUp } from '@/components/motion/CountUp';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

export function HomeStats({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="bg-ink py-20 text-paper md:py-24">
      <div className="wrap">
        <RevealGroup className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {proof.map((s, i) => (
            <RevealItem key={i}>
              <div className="text-display font-extrabold leading-none text-white">
                <CountUp value={s.value} suffix={s.suffix ?? ''} grouping={'grouping' in s ? s.grouping : true} />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">{tr(s.label)}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
