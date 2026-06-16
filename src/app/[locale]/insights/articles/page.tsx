import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { ArticleList } from '@/components/sections/ArticleList';
import { listArticles } from '@/lib/content/insights';
import { getDoc } from '@/lib/content';

const meta = {
  title: { ar: 'رؤى', en: 'Insights' },
  lead: { ar: 'وجهة نظرٍ في السوق والصوت المؤسسي.', en: 'Market POV and the institutional voice.' },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(meta.title), description: tr(meta.lead) };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const all = await listArticles();
  const items = all.filter((a) => a.type === 'article');
  const images = (await getDoc('images')).images;
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
      <ArticleList locale={loc} items={items} />
    </>
  );
}
