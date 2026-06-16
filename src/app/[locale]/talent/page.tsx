import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { DivisionOverview } from '@/components/sections/DivisionOverview';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { talentDivision } = await getDoc('talent');
  return { title: tr(talentDivision.title), description: tr(talentDivision.lead) };
}

export default async function TalentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { talentDivision } = await getDoc('talent');
  return (
    <DivisionOverview
      locale={locale as Locale}
      data={talentDivision}
      parentLabel={{ ar: 'ما نقدمه', en: 'What We Do' }}
    />
  );
}
