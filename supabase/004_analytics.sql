-- web-caa CMS — Phase 1.4 analytics
-- Run in Supabase SQL Editor. Idempotent: safe to re-run.
--
-- Captures one row per public page view (written via the service-role key from
-- /api/track). No raw IP is ever stored — only a salted daily hash so the same
-- visitor on the same day counts once without being personally identifiable.

create table if not exists public.page_views (
  id          uuid primary key default gen_random_uuid(),
  path        text not null,              -- normalized, locale stripped, e.g. /talent/services
  locale      text not null default '',   -- 'ar' | 'en' | ''
  country     text not null default '',   -- from x-vercel-ip-country (ISO-2), '' = Unknown
  region      text not null default '',   -- from x-vercel-ip-country-region
  visitor_day text not null default '',   -- sha256(ip + UA + UTC-date + salt)
  created_at  timestamptz not null default now()
);

create index if not exists page_views_created_idx     on public.page_views (created_at);
create index if not exists page_views_path_idx        on public.page_views (path);
create index if not exists page_views_country_idx     on public.page_views (country);
create index if not exists page_views_visitorday_idx  on public.page_views (visitor_day);

alter table public.page_views enable row level security;

-- No anon access at all; writes happen via the service-role key (bypasses RLS).
drop policy if exists page_views_admin_read on public.page_views;
create policy page_views_admin_read on public.page_views
  for select using (public.is_admin());

-- ============================================================
-- Aggregation: one round-trip for the whole dashboard.
-- Returns JSON: { totalViews, uniqueVisitors, topPages[], byCountry[], dailyTrend[] }
-- ============================================================
create or replace function public.analytics_summary(days int)
returns jsonb
language sql
stable
security definer set search_path = public
as $$
  with scoped as (
    select * from public.page_views
    where created_at >= now() - make_interval(days => days)
  )
  select jsonb_build_object(
    'totalViews', (select count(*) from scoped),
    'uniqueVisitors', (select count(distinct visitor_day) from scoped where visitor_day <> ''),
    'topPages', coalesce((
      select jsonb_agg(t) from (
        select path, count(*)::int as views
        from scoped group by path order by views desc limit 10
      ) t
    ), '[]'::jsonb),
    'byCountry', coalesce((
      select jsonb_agg(t) from (
        select case when country = '' then 'Unknown' else country end as country,
               count(*)::int as views
        from scoped group by 1 order by views desc limit 20
      ) t
    ), '[]'::jsonb),
    'dailyTrend', coalesce((
      select jsonb_agg(t order by t.day) from (
        select to_char(date_trunc('day', created_at), 'YYYY-MM-DD') as day,
               count(*)::int as views
        from scoped group by 1
      ) t
    ), '[]'::jsonb)
  );
$$;
