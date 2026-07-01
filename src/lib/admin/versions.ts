import { serviceClient } from '@/lib/supabase/service';

export type EntityType = 'article' | 'athlete' | 'page' | 'role' | 'doc';

export type ContentVersion = {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  snapshot: Record<string, unknown>;
  saved_by: string | null;
  created_at: string;
};

// Snapshots the pre-update state so it can be restored later. Call this with
// the row's CURRENT (about-to-be-overwritten) data, right before the write.
export async function snapshotVersion(
  entityType: EntityType,
  entityId: string,
  snapshot: Record<string, unknown>,
  savedBy: string,
) {
  const db = serviceClient();
  await db.from('content_versions').insert({
    entity_type: entityType,
    entity_id: entityId,
    snapshot,
    saved_by: savedBy,
  });
}

export async function listVersions(entityType: EntityType, entityId: string) {
  const db = serviceClient();
  const { data, error } = await db
    .from('content_versions')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false });
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const, versions: (data ?? []) as ContentVersion[] };
}
