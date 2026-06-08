import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid, CTASection } from '@/components/sections/Blocks';
import { careersHub } from '@/content/careers';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(careersHub.title), description: tr(careersHub.lead) };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  const features = [
    {
      title: { ar: 'لماذا صدارة / الثقافة', en: 'Why Sadara / Culture' },
      desc: { ar: 'الثقافة التعاونيّة التي تضع المؤسسة كاملةً خلف كل قرار.', en: 'The collaborative, whole-institution culture.' },
      href: '/careers/culture',
    },
    {
      title: { ar: 'الأدوار المتاحة', en: 'Open Roles' },
      desc: { ar: 'فرصٌ عبر الوحدات الثلاث، والمهنيّون المبتدئون والتدريب.', en: 'Listings across the units; early-careers & internships.' },
      href: '/careers/roles',
    },
  ];

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(careersHub.kicker)}
        title={tr(careersHub.title)}
        lead={tr(careersHub.lead)}
        image={images.pageHero.careers}
        crumbs={[{ label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' }, { label: tr(careersHub.kicker) }]}
      />
      <FeatureGrid locale={loc} features={features} columns={2} />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'لا ترى دورك؟' : 'Don’t see your role?'}
        lead={loc === 'ar' ? 'تواصل معنا على أيّ حال — نحن دائماً نبحث عن الموهبة الصحيحة.' : 'Reach out anyway — we’re always looking for the right talent.'}
        primary={{ label: loc === 'ar' ? 'تواصل معنا' : 'Contact us', href: '/contact' }}
      />
    </>
  );
}
