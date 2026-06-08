import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { DivisionOverview } from '@/components/sections/DivisionOverview';
import { advisoryDivision } from '@/content/advisory';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(advisoryDivision.title), description: tr(advisoryDivision.lead) };
}

export default async function AdvisoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <DivisionOverview
      locale={locale as Locale}
      data={advisoryDivision}
      parentLabel={{ ar: 'ما نقدمه', en: 'What We Do' }}
    />
  );
}
