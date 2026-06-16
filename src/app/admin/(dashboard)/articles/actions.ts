'use server';

import { revalidatePath } from 'next/cache';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';

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
  const { data, error } = await db.from('articles').select('*').order('sort', { ascending: true });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as ArticleRow[] };
}

export async function saveArticle(row: ArticleRow) {
  await guard();
  const db = serviceClient();
  const payload = { ...row, updated_at: new Date().toISOString() };
  const res = row.id
    ? await db.from('articles').update(payload).eq('id', row.id)
    : await db.from('articles').insert(payload);
  if (res.error) return { ok: false as const, error: res.error.message };
  refresh();
  return { ok: true as const };
}

export async function deleteArticle(id: string) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('articles').delete().eq('id', id);
  if (error) return { ok: false as const, error: error.message };
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
