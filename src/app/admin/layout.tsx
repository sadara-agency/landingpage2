import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sadara CMS',
  robots: { index: false, follow: false },
};

// Bare wrapper so both /admin/login and the gated dashboard share the title +
// noindex. The dashboard shell + admin guard live in (dashboard)/layout.tsx.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
