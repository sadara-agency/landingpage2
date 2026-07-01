'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { sanitizeLongTextTree } from '@/lib/sanitize';
import { snapshotVersion, listVersions } from '@/lib/admin/versions';
import { logAction } from '@/lib/admin/audit';

const isRichTextKey = (key: string | number) => String(key).toLowerCase().includes('body');

// Persist a content_docs row and refresh the public site.
export async function saveDoc(key: string, data: Record<string, unknown>) {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) return { ok: false, error: 'unauthorized' };

  const db = serviceClient();

  const { data: current } = await db.from('content_docs').select('data').eq('key', key).single();
  if (current) await snapshotVersion('doc', key, current.data as Record<string, unknown>, user.id);

  const clean = sanitizeLongTextTree(data, isRichTextKey) as Record<string, unknown>;
  const { error } = await db
    .from('content_docs')
    .upsert({ key, data: clean, updated_by: user.id, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) return { ok: false, error: error.message };

  await logAction(user.id, current ? 'update' : 'create', 'doc', key, key);

  // Refresh the whole localized tree (every page may read this doc, e.g. nav/images).
  revalidatePath('/[locale]', 'layout');
  return { ok: true };
}

export async function getDocVersions(key: string) {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) return { ok: false as const, error: 'unauthorized' };
  return listVersions('doc', key);
}
