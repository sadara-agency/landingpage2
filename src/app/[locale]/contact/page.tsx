import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale, pick } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/sections/ContactForm';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { contactMeta } = await getDoc('contact');
  return { title: tr(contactMeta.title), description: tr(contactMeta.lead) };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const contact = await getDoc('contact');
  const { contactMeta } = contact;
  const images = (await getDoc('images')).images;

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(contactMeta.kicker)}
        title={tr(contactMeta.title)}
        lead={tr(contactMeta.lead)}
        image={images.pageHero.contact}
        crumbs={[{ label: tr({ en: 'Home', ar: 'الرئيسية' }), href: '/' }, { label: tr(contactMeta.kicker) }]}
      />
      <section className="border-t border-hairline py-16 md:py-24">
        <div className="wrap max-w-3xl">
          <ContactForm locale={loc} routes={contact.routes} form={contact.form} office={contact.office} />
        </div>
      </section>
    </>
  );
}
