'use server';

import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';

export type SubmissionRow = {
  id: string;
  name: string;
  email: string;
  org: string;
  route: string;
  message: string;
  read: boolean;
  created_at: string;
};

async function guard() {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) throw new Error('unauthorized');
  return user;
}

export async function listSubmissions() {
  await guard();
  const db = serviceClient();
  const { data, error } = await db
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, rows: (data ?? []) as SubmissionRow[] };
}

export async function markRead(id: string, read: boolean) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('contact_submissions').update({ read }).eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

export async function deleteSubmission(id: string) {
  await guard();
  const db = serviceClient();
  const { error } = await db.from('contact_submissions').delete().eq('id', id);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}
