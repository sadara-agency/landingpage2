import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale, pick, localeHref } from '@/lib/i18n';
import { PageHero } from '@/components/sections/PageHero';
import { CTASection } from '@/components/sections/Blocks';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { Tag } from '@/components/ui/Tag';
import { listRoles } from '@/lib/content/roles';
import { getDoc } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tr = pick(isLocale(locale) ? locale : 'en');
  const { roles } = await getDoc('careers');
  return { title: tr(roles.title), description: tr(roles.lead) };
}

export default async function RolesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const tr = pick(loc);
  const { roles } = await getDoc('careers');
  const list = await listRoles();
  const images = (await getDoc('images')).images;

  return (
    <>
      <PageHero
        locale={loc}
        kicker={tr(roles.kicker)}
        title={tr(roles.title)}
        lead={tr(roles.lead)}
        image={images.pageHero.careers}
        crumbs={[
          { label: loc === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
          { label: loc === 'ar' ? 'الوظائف' : 'Careers', href: '/careers' },
          { label: loc === 'ar' ? 'الأدوار' : 'Roles' },
        ]}
      />

      <section className="border-t border-hairline py-16 md:py-24">
        <div className="wrap">
          <RevealGroup className="overflow-hidden rounded-card border border-hairline">
            {list.map((r, i) => (
              <RevealItem key={i}>
                <Link
                  href={localeHref(loc, '/contact')}
                  className="group flex flex-col gap-4 border-b border-hairline bg-paper p-6 transition-colors last:border-0 hover:bg-canvas md:flex-row md:items-center md:justify-between md:p-7"
                >
                  <div>
                    <h3 className="text-h3 font-semibold text-ink transition-colors group-hover:text-electric">
                      {tr(r.title)}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {tr(r.team)} · {tr(r.location)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Tag tone={tr(r.type) === 'Internship' || tr(r.type) === 'تدريب' ? 'cyan' : 'blue'}>
                      {tr(r.type)}
                    </Tag>
                    <span className="text-faint transition-all group-hover:translate-x-1 group-hover:text-electric rtl:group-hover:-translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection
        locale={loc}
        title={loc === 'ar' ? 'قدّم اليوم.' : 'Apply today.'}
        primary={{ label: loc === 'ar' ? 'تواصل معنا' : 'Contact us', href: '/contact' }}
      />
    </>
  );
}
