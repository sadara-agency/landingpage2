import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid, CTASection } from '@/components/sections/Blocks';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { institutionHub } = await getDoc('institution');
  return { title: tr(institutionHub.title), description: tr(institutionHub.lead) };
}

export default async function InstitutionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  const { institutionHub } = await getDoc('institution');
  const images = (await getDoc('images')).images;

  const features = institutionHub.sections.map((s) => ({ title: s.title, desc: s.desc, href: s.href }));

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(institutionHub.kicker)}
        title={tr(institutionHub.title)}
        lead={tr(institutionHub.lead)}
        image={images.pageHero.institution}
        crumbs={[{ label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' }, { label: tr(institutionHub.kicker) }]}
      />
      <FeatureGrid locale={loc} features={features} columns={3} />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'مؤسسةٌ بُنيت لتدوم.' : 'An institution built to last.'}
        primary={{ label: loc === 'ar' ? 'ما نقدمه' : 'What we do', href: '/what-we-do' }}
        secondary={{ label: loc === 'ar' ? 'تواصل معنا' : 'Contact us', href: '/contact' }}
      />
    </>
  );
}
