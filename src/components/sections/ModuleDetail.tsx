import type { Locale } from '@/lib/i18n';
import { pick, type Bi } from '@/lib/i18n';
import { PageHero } from './PageHero';
import { SplitBand, FeatureGrid, CTASection, type Feature } from './Blocks';
import { images } from '@/content/images';

/* FROZEN — institution.ts / network.ts / careers.ts / talent.ts / advisory.ts / markets.ts conform. */
export type ModuleData = {
  kicker: Bi;
  title: Bi;
  lead: Bi;
  crumbs: { label: Bi; href?: string }[];
  overview: { kicker: Bi; title: Bi; body: Bi | Bi[]; bullets?: Bi[]; tone?: 'dark' | 'electric' };
  detail?: { kicker: Bi; title: Bi; body: Bi | Bi[]; bullets?: Bi[] };
  features?: { header: { kicker: Bi; title: Bi; lead?: Bi }; items: Feature[] };
  cta: { title: Bi; lead?: Bi; primary: { label: Bi; href: string }; secondary?: { label: Bi; href: string } };
};

export function ModuleDetail({ locale, data, image }: { locale: Locale; data: ModuleData; image?: string }) {
  const tr = pick(locale);
  const trArr = (b: Bi | Bi[]) => (Array.isArray(b) ? b.map(tr) : tr(b));
  return (
    <>
      <PageHero
        locale={locale}
        kicker={tr(data.kicker)}
        title={tr(data.title)}
        lead={tr(data.lead)}
        image={image ?? images.pageHero.default}
        crumbs={data.crumbs.map((c) => ({ label: tr(c.label), href: c.href }))}
      />

      <SplitBand
        locale={locale}
        kicker={tr(data.overview.kicker)}
        title={tr(data.overview.title)}
        body={trArr(data.overview.body)}
        bullets={data.overview.bullets}
        tone={data.overview.tone}
      />

      {data.detail && (
        <SplitBand
          locale={locale}
          kicker={tr(data.detail.kicker)}
          title={tr(data.detail.title)}
          body={trArr(data.detail.body)}
          bullets={data.detail.bullets}
          reverse
        />
      )}

      {data.features && (
        <FeatureGrid
          locale={locale}
          features={data.features.items}
          columns={data.features.items.length === 4 ? 4 : data.features.items.length === 2 ? 2 : 3}
          kicker={tr(data.features.header.kicker)}
          title={tr(data.features.header.title)}
          lead={data.features.header.lead ? tr(data.features.header.lead) : undefined}
        />
      )}

      <CTASection
        locale={locale}
        title={tr(data.cta.title)}
        lead={data.cta.lead ? tr(data.cta.lead) : undefined}
        primary={{ label: tr(data.cta.primary.label), href: data.cta.primary.href }}
        secondary={data.cta.secondary ? { label: tr(data.cta.secondary.label), href: data.cta.secondary.href } : undefined}
      />
    </>
  );
}
