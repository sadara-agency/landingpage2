import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localeHref } from '@/lib/i18n';
import { images } from '@/content/images';

type Crumb = { label: string; href?: string };

export function PageHero({
  locale,
  kicker,
  title,
  lead,
  crumbs,
  align = 'start',
  image,
}: {
  locale: Locale;
  kicker?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  align?: 'start' | 'center';
  image?: string;
}) {
  const src = image ?? images.pageHero.default;
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-[var(--header-h)] text-paper">
      <img src={src} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90" />
      <div className="photo-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <div className="wrap relative flex min-h-[42vh] flex-col justify-end py-16 md:min-h-[48vh] md:py-24">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-white/60" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={localeHref(locale, c.href)} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/85">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-white/30">/</span>}
              </span>
            ))}
          </nav>
        )}
        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          {kicker && <span className={align === 'center' ? 'kicker justify-center text-electric-hi' : 'kicker text-electric-hi'}>{kicker}</span>}
          <h1 className="mt-4 text-h1 font-extrabold text-white">{title}</h1>
          {lead && <p className="mt-6 text-lead text-white/80">{lead}</p>}
        </div>
      </div>
    </section>
  );
}
