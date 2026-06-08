import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick, type Bi } from '@/lib/i18n';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/* FROZEN interface — copied content files conform to this. */
export type Feature = {
  no?: string;
  title: Bi;
  desc: Bi;
  href?: string;
  cta?: Bi;
};

export function FeatureGrid({
  locale,
  features,
  columns = 3,
  kicker,
  title,
  lead,
}: {
  locale: Locale;
  features: Feature[];
  columns?: 2 | 3 | 4;
  kicker?: string;
  title?: string;
  lead?: string;
}) {
  const tr = pick(locale);
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' }[columns];

  return (
    <section className="border-t border-hairline bg-paper py-20 md:py-28">
      <div className="wrap">
        {(title || kicker) && <SectionHeader kicker={kicker} title={title ?? ''} lead={lead} className="mb-14" />}
        <RevealGroup className={cn('grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline', cols)}>
          {features.map((f, i) => {
            const inner = (
              <div className="group relative flex h-full flex-col bg-paper p-7 transition-colors duration-300 hover:bg-canvas">
                {f.no && <span className="font-mono text-sm text-faint">{f.no}</span>}
                <h3 className="mt-4 text-h3 font-bold text-ink">{tr(f.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{tr(f.desc)}</p>
                {f.href && (
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-electric">
                    {f.cta ? tr(f.cta) : locale === 'ar' ? 'اعرف المزيد' : 'Learn more'}
                    <span className="inline-block transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
                  </span>
                )}
              </div>
            );
            return (
              <RevealItem key={i}>
                {f.href ? (
                  <Link href={localeHref(locale, f.href)} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

export function SplitBand({
  locale,
  kicker,
  title,
  body,
  bullets,
  reverse = false,
  tone = 'dark',
  cta,
  image,
}: {
  locale: Locale;
  kicker?: string;
  title: string;
  body: string | string[];
  bullets?: Bi[];
  reverse?: boolean;
  tone?: 'dark' | 'electric';
  cta?: { label: string; href: string };
  image?: string;
}) {
  const tr = pick(locale);
  const paras = Array.isArray(body) ? body : [body];

  return (
    <section className="border-t border-hairline bg-paper py-20 md:py-28">
      <div className="wrap">
        <div className={cn('grid items-center gap-12 lg:grid-cols-2', reverse && 'lg:[&>*:first-child]:order-2')}>
          <Reveal direction={reverse ? 'end' : 'start'}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-hairline bg-canvas">
              {image ? (
                <img src={image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className={cn('absolute inset-0', tone === 'electric' ? 'bg-electric/10' : 'bg-canvas-2')} />
              )}
            </div>
          </Reveal>
          <Reveal direction={reverse ? 'start' : 'end'} delay={0.08}>
            <div>
              {kicker && <span className="kicker">{kicker}</span>}
              <h2 className="mt-4 text-h2 font-extrabold text-ink">{title}</h2>
              {paras.map((p, i) => (
                <p key={i} className="mt-5 text-lead text-muted">
                  {p}
                </p>
              ))}
              {bullets && (
                <ul className="mt-7 space-y-3">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] text-ink/85">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                      {tr(b)}
                    </li>
                  ))}
                </ul>
              )}
              {cta && (
                <div className="mt-9">
                  <Button href={localeHref(locale, cta.href)}>{cta.label}</Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function CTASection({
  locale,
  title,
  lead,
  primary,
  secondary,
}: {
  locale: Locale;
  title: string;
  lead?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-t border-hairline bg-ink py-24 text-paper md:py-32">
      <div className="wrap text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-h2 font-extrabold text-white">{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.08}>
            <p className="mx-auto mt-6 max-w-2xl text-lead text-white/70">{lead}</p>
          </Reveal>
        )}
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={localeHref(locale, primary.href)} size="lg">
              {primary.label}
            </Button>
            {secondary && (
              <Button href={localeHref(locale, secondary.href)} variant="secondary" size="lg" className="border-white/30 bg-transparent text-white hover:border-white">
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className="border-t border-hairline bg-paper py-16 md:py-24">
      <div className="wrap">
        <Reveal className={cn('max-w-prose space-y-6 text-[15px] leading-relaxed text-muted', className)}>{children}</Reveal>
      </div>
    </section>
  );
}
