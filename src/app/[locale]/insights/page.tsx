import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { ArticleList } from '@/components/sections/ArticleList';
import { CTASection } from '@/components/sections/Blocks';
import { insightsMeta, articles } from '@/content/insights';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(insightsMeta.title), description: tr(insightsMeta.lead) };
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(insightsMeta.kicker)}
        title={tr(insightsMeta.title)}
        lead={tr(insightsMeta.lead)}
        image={images.pageHero.insights}
        crumbs={[{ label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' }, { label: tr(insightsMeta.kicker) }]}
      />
      <ArticleList locale={loc} items={articles} />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'للاستفسارات الإعلامية.' : 'For media enquiries.'}
        primary={{ label: loc === 'ar' ? 'الحقيبة الإعلامية' : 'Press kit', href: '/insights/press-kit' }}
        secondary={{ label: loc === 'ar' ? 'تواصل' : 'Contact', href: '/contact' }}
      />
    </>
  );
}
