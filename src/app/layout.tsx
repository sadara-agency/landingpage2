import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { OrganizationJsonLd } from '@/components/layout/JsonLd';
import '@/styles/globals.css';

const ibmPlexArabic = localFont({
  src: [
    { path: '../../public/fonts/IBMPlexSansArabic-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/IBMPlexSansArabic-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-ar',
  display: 'swap',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-en',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sadarasport.sa'),
  title: { default: 'Sadara Sports — صدارة الرياضية', template: '%s · Sadara Sports' },
  description:
    'An institution, not an agency. Sadara represents and develops athletes, advises clubs and federations, and connects markets — one institution, three strategic units.',
  icons: { icon: '/brand/logo-icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${ibmPlexArabic.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
