import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';
import { HomeHero } from '@/components/sections/HomeHero';

// CAA-faithful homepage: a single full-screen pillar-nav. The other Home*
// section components remain in the repo (unused here) for future use.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  return <HomeHero locale={loc} />;
}
