import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { ModuleDetail } from '@/components/sections/ModuleDetail';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { engage } = await getDoc('advisory');
  return { title: tr(engage.title), description: tr(engage.lead) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { engage } = await getDoc('advisory');
  const images = (await getDoc('images')).images;
  return <ModuleDetail locale={locale as Locale} data={engage} image={images.pageHero.advisory} />;
}
