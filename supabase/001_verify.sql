-- Verify Phase 1 schema applied. Run in Supabase SQL Editor; expect 7 tables, RLS on, bucket present.

-- Tables exist + RLS enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'profiles','content_docs','athletes','articles','roles','contact_submissions','media'
  )
order by tablename;
-- Expect 7 rows, rowsecurity = true for all.

-- Policy count per table (should be > 0 each)
select tablename, count(*) as policies
from pg_policies
where schemaname = 'public'
group by tablename
order by tablename;

-- Storage bucket
select id, public from storage.buckets where id = 'site-media';
-- Expect 1 row, public = true.

-- Helper function present
select proname from pg_proc where proname in ('is_admin','handle_new_user');
-- Expect 2 rows.
