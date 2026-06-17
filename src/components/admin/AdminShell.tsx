'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { browserClient } from '@/lib/supabase/browser';
import { cn } from '@/lib/cn';
import { useAdminPrefs } from './AdminPrefsContext';

const AR: Record<string, string> = {
  Content: 'المحتوى',
  Lists: 'القوائم',
  Home: 'الرئيسية',
  'Navigation & Footer': 'التنقل والتذييل',
  Talent: 'المواهب',
  Advisory: 'الاستشارات',
  Markets: 'الأسواق',
  Institution: 'المؤسسة',
  Network: 'الشبكة',
  Careers: 'الوظائف',
  'Insights & Press': 'الرؤى والصحافة',
  Contact: 'التواصل',
  Images: 'الصور',
  Pages: 'الصفحات',
  Athletes: 'الرياضيون',
  'Articles & News': 'المقالات والأخبار',
  'Open Roles': 'الوظائف المتاحة',
  'Contact Inbox': 'صندوق التواصل',
  'Content management': 'إدارة المحتوى',
  'View live site': 'عرض الموقع',
  'Sign out': 'تسجيل الخروج',
};

const DOC_LINKS: { href: string; label: string }[] = [
  { href: '/admin/docs/home', label: 'Home' },
  { href: '/admin/docs/nav', label: 'Navigation & Footer' },
  { href: '/admin/docs/talent', label: 'Talent' },
  { href: '/admin/docs/advisory', label: 'Advisory' },
  { href: '/admin/docs/markets', label: 'Markets' },
  { href: '/admin/docs/institution', label: 'Institution' },
  { href: '/admin/docs/network', label: 'Network' },
  { href: '/admin/docs/careers', label: 'Careers' },
  { href: '/admin/docs/insights', label: 'Insights & Press' },
  { href: '/admin/docs/contact', label: 'Contact' },
  { href: '/admin/docs/images', label: 'Images' },
];

const LIST_LINKS = [
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/athletes', label: 'Athletes' },
  { href: '/admin/articles', label: 'Articles & News' },
  { href: '/admin/roles', label: 'Open Roles' },
  { href: '/admin/inbox', label: 'Contact Inbox' },
];

export function AdminShell({
  email,
  children,
}: {
  email: string | null;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale, theme, setTheme } = useAdminPrefs();

  const dark = theme === 'dark';
  const ar = locale === 'ar';
  const tr = (s: string) => (ar ? (AR[s] ?? s) : s);

  async function signOut() {
    await browserClient().auth.signOut();
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div
      dir={ar ? 'rtl' : 'ltr'}
      className={cn(
        'min-h-screen',
        ar ? 'font-ar' : 'font-en',
        dark ? 'bg-[#0c0e22] text-white' : 'bg-[#f7f7f4] text-[#0a0a0f]',
      )}
    >
      <div className="flex">
        <aside
          className={cn(
            'sticky top-0 flex h-screen w-64 shrink-0 flex-col border-e',
            dark
              ? 'border-white/10 bg-[#11132B]'
              : 'border-black/10 bg-white',
          )}
        >
          <div className="px-5 py-5">
            <Link href="/admin">
              <Image
                src={dark ? '/brand/logo-lockup-on-navy.svg' : '/brand/logo-lockup-on-white.svg'}
                alt="Sadara"
                width={120}
                height={36}
                priority
                onError={(e) => {
                  // fallback to navy logo if light variant missing
                  (e.currentTarget as HTMLImageElement).src = '/brand/logo-lockup-on-navy.svg';
                }}
              />
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 pb-6">
            <SectionLabel dark={dark}>{tr('Content')}</SectionLabel>
            {DOC_LINKS.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                active={pathname === l.href}
                label={tr(l.label)}
                dark={dark}
              />
            ))}
            <SectionLabel dark={dark}>{tr('Lists')}</SectionLabel>
            {LIST_LINKS.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                active={pathname.startsWith(l.href)}
                label={tr(l.label)}
                dark={dark}
              />
            ))}
          </nav>
          <div className={cn('border-t p-4 text-xs', dark ? 'border-white/10' : 'border-black/10')}>
            <div className={cn('truncate', dark ? 'text-white/50' : 'text-black/50')}>{email}</div>
            <div className="mt-3 flex items-center gap-2">
              {/* Lang toggle */}
              <button
                onClick={() => setLocale(ar ? 'en' : 'ar')}
                className={cn(
                  'rounded px-2 py-1 text-[11px] font-mono font-semibold tracking-wider transition-colors',
                  dark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/8 text-[#0a0a0f] hover:bg-black/15',
                )}
              >
                {ar ? 'EN' : 'AR'}
              </button>
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(dark ? 'light' : 'dark')}
                className={cn(
                  'rounded px-2 py-1 text-[13px] transition-colors',
                  dark
                    ? 'bg-white/10 hover:bg-white/20'
                    : 'bg-black/8 hover:bg-black/15',
                )}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? '☀️' : '🌙'}
              </button>
            </div>
            <button
              onClick={signOut}
              className="mt-2 text-[#FF453A] hover:underline"
            >
              {tr('Sign out')}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className={cn('flex items-center justify-between border-b px-8 py-4', dark ? 'border-white/10' : 'border-black/10')}>
            <span className={dark ? 'text-sm text-white/50' : 'text-sm text-black/50'}>
              {tr('Content management')}
            </span>
            <a
              href="/en"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'rounded-lg border px-3 py-1.5 text-sm transition-colors',
                dark
                  ? 'border-white/15 text-white/80 hover:bg-white/5'
                  : 'border-black/15 text-black/70 hover:bg-black/5',
              )}
            >
              {tr('View live site')} ↗
            </a>
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SectionLabel({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <div className={cn(
      'px-3 pb-2 pt-5 font-mono text-[10px] uppercase tracking-[0.18em]',
      dark ? 'text-white/35' : 'text-black/35',
    )}>
      {children}
    </div>
  );
}

function NavLink({ href, active, label, dark }: { href: string; active: boolean; label: string; dark: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'block rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? dark
            ? 'bg-[#3C3CFA]/20 text-white'
            : 'bg-[#3C3CFA]/10 text-[#3C3CFA]'
          : dark
            ? 'text-white/65 hover:bg-white/5 hover:text-white'
            : 'text-black/60 hover:bg-black/5 hover:text-[#0a0a0f]',
      )}
    >
      {label}
    </Link>
  );
}
