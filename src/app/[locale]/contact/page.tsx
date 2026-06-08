import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { contactMeta } from '@/content/contact';
import { images } from '@/content/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  return { title: tr(contactMeta.title), description: tr(contactMeta.lead) };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(contactMeta.kicker)}
        title={tr(contactMeta.title)}
        lead={tr(contactMeta.lead)}
        image={images.pageHero.contact}
        crumbs={[{ label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' }, { label: tr(contactMeta.kicker) }]}
      />
      <section className="border-t border-hairline py-16 md:py-24">
        <div className="wrap max-w-3xl">
          <ContactForm locale={loc} />
        </div>
      </section>
    </>
  );
}
