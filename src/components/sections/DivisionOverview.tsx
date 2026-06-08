import type { Locale } from '@/lib/i18n';
import { pick, type Bi } from '@/lib/i18n';
import { PageHero } from './PageHero';
import { FeatureGrid, CTASection, type Feature } from './Blocks';
import { Reveal } from '@/components/motion/Reveal';
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
          { label: locale === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: tr(parentLabel), href: '/what-we-do' },
          { label: tr(data.title) },
        ]}
      />

      <section className="border-t border-hairline bg-paper py-20 md:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="text-h2 font-extrabold text-ink">{tr(data.proposition.title)}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lead text-muted">{tr(data.proposition.body)}</p>
          </Reveal>
        </div>
      </section>

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
