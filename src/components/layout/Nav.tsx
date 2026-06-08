'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { localeHref, pick, stripLocale } from '@/lib/i18n';
import { navItems, cta } from '@/content/nav';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from './LanguageToggle';
import { cn } from '@/lib/cn';

export function Nav({ locale }: { locale: Locale }) {
  const tr = pick(locale);
  const pathname = usePathname() || `/${locale}`;
  const path = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Solid header when scrolled OR when not on a page that has a dark hero behind it.
  // Simplest robust rule: solid unless at top of page. Heroes are dark, so at top use transparent/light-on-dark.
  const solid = scrolled || open;
  const onDark = !solid;

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-colors duration-300', solid ? 'border-b border-hairline bg-paper/95 backdrop-blur' : 'bg-transparent')}>
      <div className="wrap flex h-[var(--header-h)] items-center gap-6">
        <Link href={localeHref(locale, '/')} aria-label="Sadara home">
          <Logo tone={onDark ? 'paper' : 'ink'} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const active = path === item.href || path.startsWith(item.href + '/');
            return (
              <div key={item.href} className="relative" onMouseEnter={() => setOpenMenu(item.href)} onMouseLeave={() => setOpenMenu(null)}>
                <Link
                  href={localeHref(locale, item.href)}
                  className={cn(
                    'text-[13px] font-medium transition-colors',
                    onDark ? 'text-white/90 hover:text-white' : 'text-ink/80 hover:text-ink',
                    active && (onDark ? 'text-white' : 'text-electric'),
                  )}
                >
                  {tr(item.label)}
                </Link>
                {item.children && openMenu === item.href && (
                  <div className="absolute start-0 top-full w-72 rounded-card border border-hairline bg-paper p-2 shadow-lg">
                    {item.children.map((c) => (
                      <Link key={c.href} href={localeHref(locale, c.href)} className="block rounded-md px-3 py-2.5 transition-colors hover:bg-canvas">
                        <span className="block text-sm font-semibold text-ink">{tr(c.label)}</span>
                        {c.desc && <span className="mt-0.5 block text-xs text-faint">{tr(c.desc)}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-3">
          <LanguageToggle locale={locale} className={onDark ? 'border-white/40 text-white' : 'border-hairline text-ink'} />
          <Button href={localeHref(locale, '/contact')} size="sm" className="hidden sm:inline-flex">
            {tr(cta.contact)}
          </Button>
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
            <span className={cn('block text-2xl', onDark ? 'text-white' : 'text-ink')}>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-paper lg:hidden">
          <nav className="wrap flex flex-col py-4">
            {navItems.map((item) => (
              <Link key={item.href} href={localeHref(locale, item.href)} className="border-b border-hairline py-3 text-lg font-semibold text-ink" onClick={() => setOpen(false)}>
                {tr(item.label)}
              </Link>
            ))}
            <Button href={localeHref(locale, '/contact')} className="mt-4">{tr(cta.contact)}</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
