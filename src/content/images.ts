// Curated Unsplash photography for the photography-led CAA register.
// Centralized + typed so real Sadara assets can replace these in one place.

export const images = {
  homeHero: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=1920&q=75',
  pageHero: {
    institution: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1600&q=72',
    talent: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=72',
    advisory: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1600&q=72',
    markets: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&q=72',
    athletes: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=72',
    insights: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1600&q=72',
    network: 'https://images.unsplash.com/photo-1505842465776-3d90f616310d?w=1600&q=72',
    careers: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=72',
    contact: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=72',
    default: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1600&q=72',
  },
  // Per-athlete-slug portrait. Falls back to `athleteDefault` when a slug is absent.
  athletes: {
    'hammam-al-hammami': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&q=75',
  } as Record<string, string>,
  athleteDefault: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1000&q=72',
  // Insights/news cards — indexed by position in the articles array.
  articles: [
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=900&q=72',
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=900&q=72',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=900&q=72',
    'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=900&q=72',
    'https://images.unsplash.com/photo-1505842465776-3d90f616310d?w=900&q=72',
    'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=900&q=72',
  ] as string[],
};

/** Athlete portrait by slug, with fallback. */
export function athletePhoto(slug: string): string {
  return images.athletes[slug] ?? images.athleteDefault;
}

/** Article photo by index, cycling if out of range. */
export function articlePhoto(i: number): string {
  return images.articles[i % images.articles.length];
}
