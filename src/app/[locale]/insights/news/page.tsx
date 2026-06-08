import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { ArticleList } from '@/components/sections/ArticleList';
import { articles } from '@/content/insights';
import { images } from '@/content/images';

const meta = {
  title: { ar: 'أخبار وصحافة', en: 'News & Press' },
  lead: { ar: 'إعلانات، توقيعات، ومحطّات.', en: 'Announcements, signings, milestones.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(meta.title), description: tr(meta.lead) };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  return (
    <>
      <PageHero
        locale={loc}
        kicker={loc === 'ar' ? 'رؤى وأخبار' : 'Insights & News'}
        title={tr(meta.title)}
        lead={tr(meta.lead)}
        image={images.pageHero.insights}
        crumbs={[
          { label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: loc === 'ar' ? 'رؤى وأخبار' : 'Insights', href: '/insights' },
          { label: tr(meta.title) },
        ]}
      />
      <ArticleList locale={loc} items={articles.filter((a) => a.type === 'news')} />
    </>
  );
}
