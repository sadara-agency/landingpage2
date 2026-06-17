import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { RosterGrid } from '@/components/sections/RosterGrid';
import { CTASection } from '@/components/sections/Blocks';
import { rosterMeta } from '@/content/athletes';
import { listAthletes } from '@/lib/content/athletes';
import { getDoc } from '@/lib/content';

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
  const athletes = await listAthletes();
  const images = (await getDoc('images')).images;

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(rosterMeta.kicker)}
        title={tr(rosterMeta.title)}
        lead={tr(rosterMeta.lead)}
        image={images.pageHero.athletes}
        crumbs={[{ label: tr({ en: 'Home', ar: 'الرئيسية' }), href: '/' }, { label: tr(rosterMeta.kicker) }]}
      />
      <RosterGrid locale={loc} athletes={athletes} />
      <CTASection
        locale={loc}
        title={tr({ en: 'Be part of the roster.', ar: 'كُن جزءاً من القائمة.' })}
        lead={tr({ en: 'Representation and development that treats you as a long-term asset.', ar: 'تمثيلٌ وتطويرٌ يعاملك كأصلٍ طويل الأمد.' })}
        primary={{ label: tr({ en: 'Enquire about representation', ar: 'قدّم طلب تمثيل' }), href: '/talent/join' }}
      />
    </>
  );
}
