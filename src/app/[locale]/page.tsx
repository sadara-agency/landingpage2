import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';
import { HomeHero } from '@/components/sections/HomeHero';
import { HomeAthletes } from '@/components/sections/HomeAthletes';
import { HomeUnits } from '@/components/sections/HomeUnits';
import { HomeInsights } from '@/components/sections/HomeInsights';
import { HomeNetwork } from '@/components/sections/HomeNetwork';
import { HomeStats } from '@/components/sections/HomeStats';
import { HomeCTA } from '@/components/sections/HomeCTA';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  return (
    <>
      <HomeHero locale={loc} />
      <HomeAthletes locale={loc} />
      <HomeUnits locale={loc} />
      <HomeInsights locale={loc} />
      <HomeNetwork locale={loc} />
      <HomeStats locale={loc} />
      <HomeCTA locale={loc} />
    </>
  );
}
