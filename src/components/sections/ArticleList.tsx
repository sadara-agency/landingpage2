import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { pick, localeHref } from '@/lib/i18n';
import type { ArticleWithImage } from '@/lib/content/insights';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

export function ArticleList({ locale, items }: { locale: Locale; items: ArticleWithImage[] }) {
  const tr = pick(locale);
  return (
    <section className="border-t border-hairline bg-paper py-16 md:py-24">
      <div className="wrap">
        <RevealGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <RevealItem key={i}>
              <Link
                href={localeHref(locale, `/insights/${a.type === 'news' ? 'news' : 'articles'}/${a.slug}`)}
                className="group flex h-full flex-col"
              >
                <article className="flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-hairline">
                    <img src={a.image} alt={tr(a.title)} referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-electric">{tr(a.category)}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                      {a.type === 'news' ? tr({ en: 'News', ar: 'خبر' }) : tr({ en: 'Article', ar: 'مقال' })}
                    </span>
                  </div>
                  <h3 className="mt-2 text-h3 font-bold leading-snug text-ink group-hover:text-electric transition-colors">{tr(a.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tr(a.excerpt)}</p>
                  <div className="mt-3 text-xs text-faint">{a.date}</div>
                </article>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
