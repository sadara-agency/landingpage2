import 'server-only';
import { cache } from 'react';
import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';

import * as homeFallback from '@/content/home';
import * as navFallback from '@/content/nav';
import * as talentFallback from '@/content/talent';
import * as advisoryFallback from '@/content/advisory';
import * as marketsFallback from '@/content/markets';
import * as institutionFallback from '@/content/institution';
import * as networkFallback from '@/content/network';
import * as careersFallback from '@/content/careers';
import * as contactFallback from '@/content/contact';
import * as imagesFallback from '@/content/images';
import * as insightsFallback from '@/content/insights';

// All doc keys + their in-repo fallback namespace. The fallback guarantees the
// site renders even when Supabase is unset or a row is missing/partial.
const FALLBACKS = {
  home: homeFallback,
  nav: navFallback,
  talent: talentFallback,
  advisory: advisoryFallback,
  markets: marketsFallback,
  institution: institutionFallback,
  network: networkFallback,
  careers: careersFallback,
  contact: contactFallback,
  images: imagesFallback,
  insights: insightsFallback,
} as const;

export type DocKey = keyof typeof FALLBACKS;

// Strip functions/undefined from a namespace import → plain object fallback.
function plain(ns: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(ns)) {
    if (typeof v === 'function') continue;
    out[k] = v;
  }
  return out;
}

// Shallow-merge DB data over the fallback: any export key the DB doesn't supply
// falls back to the in-repo value. Per-request memoized via React cache().
export const getDoc = cache(async <K extends DocKey>(key: K): Promise<(typeof FALLBACKS)[K]> => {
  const fallback = plain(FALLBACKS[key]);
  if (!supabaseConfigured()) return fallback as (typeof FALLBACKS)[K];
  try {
    const db = serviceClient();
    const { data, error } = await db.from('content_docs').select('data').eq('key', key).single();
    if (error || !data?.data) return fallback as (typeof FALLBACKS)[K];
    return { ...fallback, ...(data.data as Record<string, unknown>) } as (typeof FALLBACKS)[K];
  } catch {
    return fallback as (typeof FALLBACKS)[K];
  }
});
