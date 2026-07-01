'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { requireFields } from '@/lib/admin/validate';
import { snapshotVersion, listVersions } from '@/lib/admin/versions';
import { logAction } from '@/lib/admin/audit';

export type RoleRow = {
  id?: string;
  title_ar: string; title_en: string;
  team_ar: string; team_en: string;
  type_ar: string; type_en: string;
  location_ar: string; location_en: string;
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

export async function listAllRoles() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('roles').select('*').is('archived_at', null).order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as RoleRow[] };
}

export async function saveRole(row: RoleRow) {
  const user = await guard();
  const db = serviceClient();

  const bad = requireFields(row, [
    { key: 'title_ar', label: { ar: 'المسمى (عربي)', en: 'Title (Arabic)' } },
    { key: 'title_en', label: { ar: 'المسمى (إنجليزي)', en: 'Title (English)' } },
  ]);
  if (bad) return { ok: false as const, error: bad.error };

  if (row.id) {
    const { data: current } = await db.from('roles').select('*').eq('id', row.id).single();
    if (current) await snapshotVersion('role', row.id, current, user.id);
  }

  const payload = { ...row, updated_by: user.id, updated_at: new Date().toISOString() };
  if (row.id) {
    const res = await db.from('roles').update(payload).eq('id', row.id);
    if (res.error) return { ok: false as const, error: { ar: res.error.message, en: res.error.message } };
    await logAction(user.id, 'update', 'role', row.id, row.title_en);
  } else {
    const { data: created, error } = await db.from('roles').insert(payload).select('id').single();
    if (error) return { ok: false as const, error: { ar: error.message, en: error.message } };
    await logAction(user.id, 'create', 'role', created.id, row.title_en);
  }
  refresh();
  return { ok: true as const };
}

export async function getRoleVersions(id: string) {
  await guard();
  return listVersions('role', id);
}

export async function deleteRole(id: string) {
  const user = await guard();
  const db = serviceClient();
  const { data: current } = await db.from('roles').select('title_en').eq('id', id).single();
  const { error } = await db.from('roles').update({ archived_at: new Date().toISOString() }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  await logAction(user.id, 'delete', 'role', id, current?.title_en);
  refresh();
  return { ok: true as const };
}

export async function reorderRoles(ids: string[]) {
  await guard();
  const db = serviceClient();
  for (let i = 0; i < ids.length; i++) {
    await db.from('roles').update({ sort: i }).eq('id', ids[i]);
  }
  refresh();
  return { ok: true as const };
}
