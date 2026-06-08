import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/Blocks';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { pressKit } from '@/content/insights';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(pressKit.title), description: tr(pressKit.lead) };
}

export default async function PressKitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(pressKit.kicker)}
        title={tr(pressKit.title)}
        lead={tr(pressKit.lead)}
        image={images.pageHero.insights}
        crumbs={[
          { label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: loc === 'ar' ? 'رؤى وأخبار' : 'Insights', href: '/insights' },
          { label: loc === 'ar' ? 'الحقيبة الإعلامية' : 'Press Kit' },
        ]}
      />
      <section className="border-t border-hairline py-16 md:py-24">
        <div className="wrap">
          <RevealGroup className="grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {pressKit.facts.map((f, i) => (
              <RevealItem key={i}>
                <div className="h-full bg-paper p-7">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-electric">
                    {tr(f.label)}
                  </div>
                  <div className="mt-3 text-lead font-semibold text-ink">{tr(f.value)}</div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'تحتاج أصول العلامة؟' : 'Need brand assets?'}
        lead={loc === 'ar' ? 'تواصل مع جهة الاتصال الإعلامي وسنزوّدك بما تحتاج.' : 'Contact our media desk and we’ll provide what you need.'}
        primary={{ label: loc === 'ar' ? 'تواصل إعلامي' : 'Media contact', href: '/contact' }}
      />
    </>
  );
}
