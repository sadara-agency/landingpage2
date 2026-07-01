'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { requireFields, validateSlug, checkDuplicateSlug } from '@/lib/admin/validate';
import { sanitizeHtml } from '@/lib/sanitize';
import { snapshotVersion, listVersions } from '@/lib/admin/versions';
import { logAction } from '@/lib/admin/audit';

export type ArticleRow = {
  id?: string;
  slug: string;
  category_ar: string; category_en: string;
  title_ar: string; title_en: string;
  excerpt_ar: string; excerpt_en: string;
  body_ar: string; body_en: string;
  date: string;
  type: 'article' | 'news';
  image_url: string | null;
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

export async function listAllArticles() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db.from('articles').select('*').is('archived_at', null).order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as ArticleRow[] };
}

export async function saveArticle(row: ArticleRow) {
  const user = await guard();
  const db = serviceClient();

  const bad =
    validateSlug(row.slug) ??
    requireFields(row, [
      { key: 'title_ar', label: { ar: 'العنوان (عربي)', en: 'Title (Arabic)' } },
      { key: 'title_en', label: { ar: 'العنوان (إنجليزي)', en: 'Title (English)' } },
    ]);
  if (bad) return { ok: false as const, error: bad.error };

  const { data: existing } = await db.from('articles').select('id, slug').is('archived_at', null);
  const dup = checkDuplicateSlug(row.slug, existing ?? [], row.id);
  if (dup) return { ok: false as const, error: dup.error };

  if (row.id) {
    const { data: current } = await db.from('articles').select('*').eq('id', row.id).single();
    if (current) await snapshotVersion('article', row.id, current, user.id);
  }

  const payload = {
    ...row,
    slug: row.slug.trim(),
    body_ar: sanitizeHtml(row.body_ar),
    body_en: sanitizeHtml(row.body_en),
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  };
  if (row.id) {
    const res = await db.from('articles').update(payload).eq('id', row.id);
    if (res.error) return { ok: false as const, error: { ar: res.error.message, en: res.error.message } };
    await logAction(user.id, 'update', 'article', row.id, row.title_en || row.slug);
  } else {
    const { data: created, error } = await db.from('articles').insert(payload).select('id').single();
    if (error) return { ok: false as const, error: { ar: error.message, en: error.message } };
    await logAction(user.id, 'create', 'article', created.id, row.title_en || row.slug);
  }
  refresh();
  return { ok: true as const };
}

export async function getArticleVersions(id: string) {
  await guard();
  return listVersions('article', id);
}

export async function deleteArticle(id: string) {
  const user = await guard();
  const db = serviceClient();
  const { data: current } = await db.from('articles').select('title_en, slug').eq('id', id).single();
  const { error } = await db.from('articles').update({ archived_at: new Date().toISOString() }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  await logAction(user.id, 'delete', 'article', id, current?.title_en || current?.slug);
  refresh();
  return { ok: true as const };
}

export async function reorderArticles(ids: string[]) {
  await guard();
  const db = serviceClient();
  for (let i = 0; i < ids.length; i++) {
    await db.from('articles').update({ sort: i }).eq('id', ids[i]);
  }
  refresh();
  return { ok: true as const };
}
