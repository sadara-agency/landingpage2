import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { ModuleDetail } from '@/components/sections/ModuleDetail';
import { LogoGrid } from '@/components/sections/LogoGrid';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { partners } = await getDoc('network');
  return { title: tr(partners.title), description: tr(partners.lead) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { partners } = await getDoc('network');
  const images = (await getDoc('images')).images;
  return (
    <>
      <ModuleDetail locale={locale as Locale} data={partners} image={images.pageHero.network} />
      <LogoGrid
        locale={locale as Locale}
        logos={[
          { title: { ar: 'درية', en: 'Derayah' }, src: '/network/INSTITUTIONS/Derayah.png' },
          { title: { ar: 'سجايا', en: 'Sajaya' }, src: '/network/INSTITUTIONS/Sajaya.png' },
          { title: { ar: 'صكوك', en: 'Sukuk' }, src: '/network/INSTITUTIONS/Sukuk.png' },
        ]}
        kicker={pick(locale as Locale)({ en: 'Financial Institutions', ar: 'المؤسسات المالية' })}
        title={pick(locale as Locale)({ en: 'Financial partners.', ar: 'الشركاء الماليون.' })}
      />
      <LogoGrid
        locale={locale as Locale}
        logos={[
          { title: { ar: 'سكاوتنج ستاتس', en: 'ScoutingStats' }, src: '/network/SOLUTIONS/ScoutingStats.png' },
          { title: { ar: 'كاتابولت', en: 'Catapult' }, src: '/network/SOLUTIONS/Catapult.png' },
          { title: { ar: 'هودل', en: 'Hudl' }, src: '/network/SOLUTIONS/Hudl.png' },
          { title: { ar: 'فيتبت', en: 'FITBIT' }, src: '/network/SOLUTIONS/FITBIT.png' },
        ]}
        kicker={pick(locale as Locale)({ en: 'Technical Platforms', ar: 'المنصات التقنية' })}
        title={pick(locale as Locale)({ en: 'Performance & analytics tools.', ar: 'أدوات الأداء والتحليل.' })}
      />
    </>
  );
}
