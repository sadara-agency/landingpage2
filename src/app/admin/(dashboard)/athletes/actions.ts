'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { requireFields, validateSlug, checkDuplicateSlug } from '@/lib/admin/validate';
import { snapshotVersion, listVersions } from '@/lib/admin/versions';
import { logAction } from '@/lib/admin/audit';

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
  meta_description_ar: string; meta_description_en: string;
  og_image_url: string | null;
  canonical_url: string | null;
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
  const { data, error } = await db.from('athletes').select('*').is('archived_at', null).order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as AthleteRow[] };
}

export async function saveAthlete(row: AthleteRow) {
  const user = await guard();
  const db = serviceClient();

  const bad =
    validateSlug(row.slug) ??
    requireFields(row, [
      { key: 'name_ar', label: { ar: 'الاسم (عربي)', en: 'Name (Arabic)' } },
      { key: 'name_en', label: { ar: 'الاسم (إنجليزي)', en: 'Name (English)' } },
    ]);
  if (bad) return { ok: false as const, error: bad.error };

  const { data: existing } = await db.from('athletes').select('id, slug').is('archived_at', null);
  const dup = checkDuplicateSlug(row.slug, existing ?? [], row.id);
  if (dup) return { ok: false as const, error: dup.error };

  if (row.id) {
    const { data: current } = await db.from('athletes').select('*').eq('id', row.id).single();
    if (current) await snapshotVersion('athlete', row.id, current, user.id);
  }

  const payload = { ...row, slug: row.slug.trim(), updated_by: user.id, updated_at: new Date().toISOString() };
  if (row.id) {
    const res = await db.from('athletes').update(payload).eq('id', row.id);
    if (res.error) return { ok: false as const, error: { ar: res.error.message, en: res.error.message } };
    await logAction(user.id, 'update', 'athlete', row.id, row.name_en || row.slug);
  } else {
    const { data: created, error } = await db.from('athletes').insert(payload).select('id').single();
    if (error) return { ok: false as const, error: { ar: error.message, en: error.message } };
    await logAction(user.id, 'create', 'athlete', created.id, row.name_en || row.slug);
  }
  refresh();
  return { ok: true as const };
}

export async function getAthleteVersions(id: string) {
  await guard();
  return listVersions('athlete', id);
}

export async function deleteAthlete(id: string) {
  const user = await guard();
  const db = serviceClient();
  const { data: current } = await db.from('athletes').select('name_en, slug').eq('id', id).single();
  // Soft delete: hidden everywhere but recoverable by clearing archived_at.
  const { error } = await db.from('athletes').update({ archived_at: new Date().toISOString() }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  await logAction(user.id, 'delete', 'athlete', id, current?.name_en || current?.slug);
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
