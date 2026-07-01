import { getSessionUser } from '@/lib/supabase/server';

// True only when ?preview=1 AND the request is from a signed-in admin — a
// guessed flag alone can never surface unpublished drafts.
export async function previewAllowed(sp: Record<string, string | string[] | undefined>): Promise<boolean> {
  if (sp.preview !== '1') return false;
  const { isAdmin } = await getSessionUser();
  return isAdmin;
}
