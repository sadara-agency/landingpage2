-- web-caa CMS — Phase 5: version history & rollback
-- Run in Supabase SQL Editor after 006_seo_fields.sql.
-- Idempotent: safe to re-run.
--
-- Every save snapshots the PRE-update row (or content_docs.data) here before
-- writing the new state, so admins can see what changed and restore an older
-- version. Restoring itself goes through the normal save path, so it creates
-- its own snapshot and is itself undoable.

-- Stamp who last saved each row (content_docs already has this; the 4
-- row-based tables never did).
alter table public.articles add column if not exists updated_by uuid references auth.users(id);
alter table public.athletes add column if not exists updated_by uuid references auth.users(id);
alter table public.pages    add column if not exists updated_by uuid references auth.users(id);
alter table public.roles    add column if not exists updated_by uuid references auth.users(id);

create table if not exists public.content_versions (
  id          uuid primary key default gen_random_uuid(),
  entity_type text not null,              -- 'article' | 'athlete' | 'page' | 'role' | 'doc'
  entity_id   text not null,              -- row id (as text) for row-based types, or content_docs.key for 'doc'
  snapshot    jsonb not null,
  saved_by    uuid references auth.users(id),
  created_at  timestamptz not null default now()
);

create index if not exists content_versions_entity_idx on public.content_versions (entity_type, entity_id, created_at desc);

alter table public.content_versions enable row level security;

-- Admin-only: versions are never exposed to the public site.
drop policy if exists content_versions_admin_all on public.content_versions;
create policy content_versions_admin_all on public.content_versions
  for all using (public.is_admin()) with check (public.is_admin());
