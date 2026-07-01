'use server';

import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { logAction } from '@/lib/admin/audit';

export type MediaRow = {
  id: string;
  bucket_path: string;
  public_url: string;
  label: string | null;
  created_at: string;
};

async function guard() {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) throw new Error('unauthorized');
  return user;
}

export async function listMedia() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('media').select('*').order('created_at', { ascending: false });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as MediaRow[] };
}

export async function deleteMedia(id: string, bucketPath: string) {
  const user = await guard();
  const db = serviceClient();
  const { data: current } = await db.from('media').select('label').eq('id', id).single();
  // Best-effort: the DB row is the source of truth for the UI list, so a missing/already-gone
  // storage object shouldn't block removing the row.
  await db.storage.from('site-media').remove([bucketPath]);
  const { error } = await db.from('media').delete().eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  await logAction(user.id, 'delete', 'media', id, current?.label);
  return { ok: true as const };
}
