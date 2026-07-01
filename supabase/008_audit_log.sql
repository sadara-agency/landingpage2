-- web-caa CMS — Phase 6: admin action audit log
-- Run in Supabase SQL Editor after 007_content_versions.sql.
-- Idempotent: safe to re-run.
--
-- Thin action-level trail (who, what, when, which entity) across the whole
-- CMS. content_versions already snapshots edit content; this covers deletes
-- too and gives one place to see recent activity without checking 5 tables.

create table if not exists public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users(id),
  action      text not null,           -- 'create' | 'update' | 'delete'
  entity_type text not null,           -- 'article' | 'athlete' | 'page' | 'role' | 'doc' | 'media'
  entity_id   text not null,
  label       text,                    -- human-readable identifier at time of action, for display after the row may be gone
  created_at  timestamptz not null default now()
);

create index if not exists audit_log_created_idx on public.audit_log (created_at desc);

alter table public.audit_log enable row level security;

drop policy if exists audit_log_admin_all on public.audit_log;
create policy audit_log_admin_all on public.audit_log
  for all using (public.is_admin()) with check (public.is_admin());
