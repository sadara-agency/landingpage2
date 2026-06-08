import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { athletes } from '@/content/athletes';

const SITE = 'https://sadarasport.sa';

// All static routes (without locale prefix).
const routes = [
  '/',
  '/institution',
  '/institution/about',
  '/institution/model',
  '/institution/leadership',
  '/institution/experts',
  '/institution/governance',
  '/institution/impact',
  '/what-we-do',
  '/talent',
  '/talent/elite-360',
  '/talent/tiers',
  '/talent/services',
  '/talent/join',
  '/advisory',
  '/advisory/intelligence',
  '/advisory/coaching',
  '/advisory/recruitment',
  '/advisory/analysis',
  '/advisory/engage',
  '/markets',
  '/markets/deal-desk',
  '/markets/partnerships',
  '/markets/network',
  '/markets/connect',
  '/athletes',
  '/insights',
  '/insights/news',
  '/insights/articles',
  '/insights/press-kit',
  '/network',
  '/network/government',
  '/network/partners',
  '/network/corridors',
  '/careers',
  '/careers/culture',
  '/careers/roles',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE}/${locale}${route === '/' ? '' : route}`,
        changeFrequency: route === '/' ? 'weekly' : 'monthly',
        priority: route === '/' ? 1 : 0.7,
      });
    }
    // Athlete profiles
    for (const a of athletes) {
      entries.push({
        url: `${SITE}/${locale}/athletes/${a.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
