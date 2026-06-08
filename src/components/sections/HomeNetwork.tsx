import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { networkStrip } from '@/content/home';
import { Marquee } from '@/components/motion/Marquee';

export function HomeNetwork({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  return (
    <section className="border-t border-hairline bg-canvas py-16">
      <div className="wrap">
        <span className="kicker">{tr(networkStrip.kicker)}</span>
        <h2 className="mt-3 max-w-2xl text-h3 font-bold text-ink">{tr(networkStrip.title)}</h2>
      </div>
      <div className="mt-10">
        <Marquee>
          {networkStrip.partners.map((p) => (
            <span key={p} className="whitespace-nowrap text-lg font-bold text-faint">{p}</span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
