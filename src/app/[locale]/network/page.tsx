import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid, CTASection } from '@/components/sections/Blocks';
import { HomeNetwork } from '@/components/sections/HomeNetwork';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { networkHub } = await getDoc('network');
  return { title: tr(networkHub.title), description: tr(networkHub.lead) };
}

export default async function NetworkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const { networkHub } = await getDoc('network');
  const images = (await getDoc('images')).images;
  const features = networkHub.sections.map((s) => ({ title: s.title, desc: s.desc, href: s.href }));

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(networkHub.kicker)}
        title={tr(networkHub.title)}
        lead={tr(networkHub.lead)}
        image={images.pageHero.network}
        crumbs={[{ label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' }, { label: tr(networkHub.kicker) }]}
      />
      <FeatureGrid locale={loc} features={features} columns={3} />
      <HomeNetwork locale={loc} />
      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'انضمّ إلى الشبكة.' : 'Join the network.'}
        primary={{ label: loc === 'ar' ? 'اشترك معنا' : 'Partner with us', href: '/markets/connect' }}
      />
    </>
  );
}
