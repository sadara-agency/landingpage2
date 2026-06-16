'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';

export type AthleteRow = {
  id?: string;
  slug: string;
  name_ar: string; name_en: string;
  sport_ar: string; sport_en: string;
  position_ar: string; position_en: string;
  tier: string;
  club_ar: string; club_en: string;
  featured: boolean;
  bio_ar: string; bio_en: string;
  trajectory_ar: string; trajectory_en: string;
  media_value_ar: string; media_value_en: string;
  stats: { value: number; decimals?: number; suffix?: string; label: { ar: string; en: string } }[];
  accent: string;
  photo_url: string | null;
  sort: number;
  published: boolean;
};

async function guard() {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) throw new Error('unauthorized');
  return user;
}

function refresh() {
  revalidatePath('/[locale]', 'layout');
}

export async function listAllAthletes() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('athletes').select('*').order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as AthleteRow[] };
}

export async function saveAthlete(row: AthleteRow) {
  await guard();
  const db = serviceClient();
  const payload = { ...row, updated_at: new Date().toISOString() };
  const res = row.id
    ? await db.from('athletes').update(payload).eq('id', row.id)
    : await db.from('athletes').insert(payload);
  if (res.error) return { ok: false as const, error: res.error.message };
  refresh();
  return { ok: true as const };
}

export async function deleteAthlete(id: string) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('athletes').delete().eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  refresh();
  return { ok: true as const };
}

export async function reorderAthletes(ids: string[]) {
  await guard();
  const db = serviceClient();
  for (let i = 0; i < ids.length; i++) {
    await db.from('athletes').update({ sort: i }).eq('id', ids[i]);
  }
  refresh();
  return { ok: true as const };
}
