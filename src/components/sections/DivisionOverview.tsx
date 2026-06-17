import type { Locale } from '@/lib/i18n';
import { pick, type Bi } from '@/lib/i18n';
import { PageHero } from './PageHero';
import { FeatureGrid, SplitBand, StatBand, CTASection, type Feature, type Stat } from './Blocks';
import { images } from '@/content/images';

/* FROZEN — talent.ts / advisory.ts / markets.ts conform to this. */
export type DivisionData = {
  no: string;
  slug: string;
  kicker: Bi;
  title: Bi;
  lead: Bi;
  proposition: { title: Bi; body: Bi };
  modules: Feature[];
  modulesHeader: { kicker: Bi; title: Bi; lead: Bi };
  /** Optional proof band — falls back to nothing if absent. */
  stats?: Stat[];
  cta: { title: Bi; lead: Bi; primary: { label: Bi; href: string }; secondary?: { label: Bi; href: string } };
};

const heroFor = (slug: string): string => {
  const key = slug.replace('/', '') as keyof typeof images.pageHero;
  return images.pageHero[key] ?? images.pageHero.default;
};

export function DivisionOverview({ locale, data, parentLabel }: { locale: Locale; data: DivisionData; parentLabel: Bi }) {
  const tr = pick(locale);
  return (
    <>
      <PageHero
        locale={locale}
        kicker={tr(data.kicker)}
        title={tr(data.title)}
        lead={tr(data.lead)}
        image={heroFor(data.slug)}
        crumbs={[
          { label: tr({ en: 'Home', ar: 'الرئيسية' }), href: '/' },
          { label: tr(parentLabel), href: '/what-we-do' },
          { label: tr(data.title) },
        ]}
      />

      {/* "Be legendary." proposition. Label uses the unit name from the kicker
          (e.g. "Unit 01 · Talent Management"), not the long page title. */}
      <SplitBand
        locale={locale}
        kicker={tr(data.kicker)}
        title={tr(data.proposition.title)}
        body={tr(data.proposition.body)}
      />

      {data.stats && data.stats.length > 0 && (
        <StatBand
          locale={locale}
          kicker={tr({ en: 'Our results speak for themselves', ar: 'نتائجنا تتحدّث عنّا' })}
          stats={data.stats}
        />
      )}

      <FeatureGrid
        locale={locale}
        features={data.modules}
        columns={data.modules.length === 4 ? 4 : 3}
        kicker={tr(data.modulesHeader.kicker)}
        title={tr(data.modulesHeader.title)}
        lead={tr(data.modulesHeader.lead)}
      />

      <CTASection
        locale={locale}
        title={tr(data.cta.title)}
        lead={tr(data.cta.lead)}
        primary={{ label: tr(data.cta.primary.label), href: data.cta.primary.href }}
        secondary={data.cta.secondary ? { label: tr(data.cta.secondary.label), href: data.cta.secondary.href } : undefined}
      />
    </>
  );
}
