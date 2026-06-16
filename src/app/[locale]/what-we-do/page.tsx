import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid, CTASection } from '@/components/sections/Blocks';
import { getDoc } from '@/lib/content';

const meta = {
  kicker: { ar: 'ما نقدمه', en: 'What We Do' },
  title: { ar: 'ثلاث وحداتٍ استراتيجية، مؤسسةٌ واحدة.', en: 'Three strategic units, one institution.' },
  lead: {
    ar: 'لا قائمة خدمات، بل بنية مؤسسية. كل وحدةٍ وجهةٌ قائمة بذاتها — تمثيل المواهب، استشارة المؤسسات، وربط الأسواق — تستند جميعها إلى الذكاء والحوكمة والشبكة نفسها.',
    en: 'Not a service list but an institutional structure. Each unit is its own destination — representing talent, advising institutions, connecting markets — all drawing on the same intelligence, governance, and network.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(meta.title), description: tr(meta.lead) };
}

export default async function WhatWeDoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  const { units } = await getDoc('home');
  const images = (await getDoc('images')).images;

  const features = units.map((u) => ({
    no: u.no,
    title: u.name,
    desc: u.desc,
    href: u.href,
    cta: { ar: 'استكشف الوحدة', en: 'Explore the unit' },
  }));

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(meta.kicker)}
        title={tr(meta.title)}
        lead={tr(meta.lead)}
        image={images.pageHero.default}
        crumbs={[{ label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' }, { label: tr(meta.kicker) }]}
      />
      <FeatureGrid locale={loc} features={features} columns={3} />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'مؤسسةٌ واحدة لكل احتياج.' : 'One institution for every need.'}
        lead={
          loc === 'ar'
            ? 'سواء كنت لاعباً أو نادياً أو شركة — ابدأ من المسار الذي يناسبك.'
            : 'Whether you’re an athlete, a club, or a company — start from the path that fits you.'
        }
        primary={{ label: loc === 'ar' ? 'تواصل معنا' : 'Contact us', href: '/contact' }}
        secondary={{ label: loc === 'ar' ? 'تعرّف على المؤسسة' : 'About the institution', href: '/institution' }}
      />
    </>
  );
}
