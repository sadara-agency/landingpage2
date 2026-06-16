import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale, pick, localeHref, locales } from '@/lib/i18n';
import { listArticles, getArticleBySlug } from '@/lib/content/insights';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { CTASection } from '@/components/sections/Blocks';

export async function generateStaticParams() {
  const articles = await listArticles();
  return locales.flatMap((locale) =>
    articles.filter((a) => a.type === 'article').map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const a = await getArticleBySlug(slug);
  if (!a) return { title: 'Article' };
  return { title: tr(a.title), description: tr(a.excerpt) };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const a = await getArticleBySlug(slug);
  if (!a || a.type !== 'article') notFound();

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(a.category)}
        title={tr(a.title)}
        lead={tr(a.excerpt)}
        image={a.image}
        crumbs={[
          { label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: loc === 'ar' ? 'رؤى وأخبار' : 'Insights', href: '/insights' },
          { label: loc === 'ar' ? 'مقالات' : 'Articles', href: '/insights/articles' },
          { label: tr(a.title) },
        ]}
      />

      <section className="border-t border-hairline bg-paper py-16 md:py-24">
        <div className="wrap max-w-3xl">
          <Reveal>
            <div className="mb-8 flex items-center gap-4 text-xs text-faint">
              <span className="font-mono uppercase tracking-wider">{a.date}</span>
              <span>·</span>
              <span className="font-mono uppercase tracking-wider text-electric">{tr(a.category)}</span>
            </div>
          </Reveal>
          {a.body ? (
            <Reveal>
              <div
                className="prose prose-neutral max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: loc === 'ar' ? a.body.ar : a.body.en }}
              />
            </Reveal>
          ) : (
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">{tr(a.excerpt)}</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-t border-hairline py-12">
        <div className="wrap">
          <Reveal>
            <Link
              href={localeHref(loc, '/insights/articles')}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <span className="rtl:rotate-180">←</span>
              {loc === 'ar' ? 'العودة إلى المقالات' : 'Back to articles'}
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'هل أنت مستعد لبدء المحادثة؟' : 'Ready to start the conversation?'}
        primary={{ label: loc === 'ar' ? 'تواصل معنا' : 'Contact us', href: '/contact' }}
      />
    </>
  );
}
