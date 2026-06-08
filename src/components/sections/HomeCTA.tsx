import type { Locale } from '@/lib/i18n';
import { localeHref, pick } from '@/lib/i18n';
import { ctaBand } from '@/content/home';
import { audiences } from '@/content/nav';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

export function HomeCTA({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="border-t border-hairline bg-paper py-20 md:py-28">
      <div className="wrap">
        <SectionHeader kicker={tr(ctaBand.kicker)} title={tr(ctaBand.title)} lead={tr(ctaBand.lead)} className="mb-14" />
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <RevealItem key={a.key}>
              <div className="flex h-full flex-col rounded-card border border-hairline bg-paper p-8">
                <h3 className="text-h3 font-extrabold text-ink">{tr(a.label)}</h3>
                <div className="mt-8">
                  <Button href={localeHref(locale, a.href)} size="md">
                    {tr(a.cta)}
                    <span className="inline-block rtl:-scale-x-100">→</span>
                  </Button>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
