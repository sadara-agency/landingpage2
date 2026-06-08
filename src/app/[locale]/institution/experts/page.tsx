import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { PeopleGrid } from '@/components/sections/PeopleGrid';
import { CTASection } from '@/components/sections/Blocks';
import { experts } from '@/content/institution';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(experts.title), description: tr(experts.lead) };
}

export default async function ExpertsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(experts.kicker)}
        title={tr(experts.title)}
        lead={tr(experts.lead)}
        image={images.pageHero.institution}
        crumbs={[
          { label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: loc === 'ar' ? 'المؤسسة' : 'Institution', href: '/institution' },
          { label: loc === 'ar' ? 'الخبراء' : 'Experts' },
        ]}
      />
      <PeopleGrid locale={loc} people={experts.people} />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'خبرةٌ خلف كل قرار.' : 'Expertise behind every decision.'}
        primary={{ label: loc === 'ar' ? 'ما نقدمه' : 'What we do', href: '/what-we-do' }}
      />
    </>
  );
}
