import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { RosterGrid } from '@/components/sections/RosterGrid';
import { CTASection } from '@/components/sections/Blocks';
import { rosterMeta } from '@/content/athletes';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(rosterMeta.title), description: tr(rosterMeta.lead) };
}

export default async function AthletesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(rosterMeta.kicker)}
        title={tr(rosterMeta.title)}
        lead={tr(rosterMeta.lead)}
        image={images.pageHero.athletes}
        crumbs={[{ label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' }, { label: tr(rosterMeta.kicker) }]}
      />
      <RosterGrid locale={loc} />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'كُن جزءاً من القائمة.' : 'Be part of the roster.'}
        lead={
          loc === 'ar'
            ? 'تمثيلٌ وتطويرٌ يعاملك كأصلٍ طويل الأمد.'
            : 'Representation and development that treats you as a long-term asset.'
        }
        primary={{ label: loc === 'ar' ? 'قدّم طلب تمثيل' : 'Enquire about representation', href: '/talent/join' }}
      />
    </>
  );
}
