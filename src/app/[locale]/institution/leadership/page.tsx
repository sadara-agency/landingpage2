import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { PeopleGrid } from '@/components/sections/PeopleGrid';
import { CTASection } from '@/components/sections/Blocks';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { leadership } = await getDoc('institution');
  return { title: tr(leadership.title), description: tr(leadership.lead) };
}

export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  const { leadership, experts } = await getDoc('institution');
  const images = (await getDoc('images')).images;

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(leadership.kicker)}
        title={tr(leadership.title)}
        lead={tr(leadership.lead)}
        image={images.pageHero.institution}
        crumbs={[
          { label: tr({ en: 'Home', ar: 'الرئيسية' }), href: '/' },
          { label: tr({ en: 'Sadara', ar: 'صدارة' }), href: '/institution' },
          { label: tr({ en: 'Leadership', ar: 'القيادة' }) },
        ]}
      />
      <PeopleGrid locale={loc} people={leadership.people} />
      <PeopleGrid
        locale={loc}
        people={experts.people}
        heading={tr({ en: 'Experts & Technical Team', ar: 'الخبراء والفريق الفني' })}
        subheading={tr({ en: 'The specialist bench behind delivery.', ar: 'منصّة التخصّص خلف التنفيذ.' })}
      />
      <CTASection
        locale={loc}
        title={tr({ en: 'Join Sadara.', ar: 'انضمّ إلى صدارة.' })}
        primary={{ label: tr({ en: 'Careers', ar: 'الوظائف' }), href: '/careers' }}
      />
    </>
  );
}
