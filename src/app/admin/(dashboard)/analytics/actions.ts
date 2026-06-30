'use server';

import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';

export type AnalyticsRange = 7 | 30 | 90;

export type AnalyticsSummary = {
  totalViews: number;
  uniqueVisitors: number;
  topPages: { path: string; views: number }[];
  byCountry: { country: string; views: number }[];
  dailyTrend: { day: string; views: number }[];
};

const EMPTY: AnalyticsSummary = {
  totalViews: 0,
  uniqueVisitors: 0,
  topPages: [],
  byCountry: [],
  dailyTrend: [],
};

async function guard() {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) throw new Error('unauthorized');
  return user;
}

export async function getAnalytics(days: AnalyticsRange = 30) {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.rpc('analytics_summary', { days });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, summary: { ...EMPTY, ...(data as Partial<AnalyticsSummary>) } };
}
