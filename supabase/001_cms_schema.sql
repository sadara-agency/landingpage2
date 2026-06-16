-- web-caa CMS — Phase 1 schema
-- Run in Supabase SQL Editor (project: web-caa CMS).
-- Idempotent: safe to re-run.

-- ============================================================
-- 1. Admin identity
-- ============================================================
-- A profile row per auth user; is_admin gates every write.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Auto-create a profile when a new auth user is invited.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: is the current request an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = auth.uid()),
    false
  );
$$;

-- ============================================================
-- 2. Content documents (JSONB per content file)
-- ============================================================
create table if not exists public.content_docs (
  key         text primary key,            -- home, nav, talent, advisory, markets, institution, network, careers, contact, images
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users (id)
);

-- ============================================================
-- 3. List tables
-- ============================================================
create table if not exists public.athletes (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name_ar         text not null default '',
  name_en         text not null default '',
  sport_ar        text not null default '',
  sport_en        text not null default '',
  position_ar     text not null default '',
  position_en     text not null default '',
  tier            text not null default 'B',      -- A+ | A | B+ | B
  club_ar         text not null default '',
  club_en         text not null default '',
  featured        boolean not null default false,
  bio_ar          text not null default '',
  bio_en          text not null default '',
  trajectory_ar   text not null default '',
  trajectory_en   text not null default '',
  media_value_ar  text not null default '',
  media_value_en  text not null default '',
  stats           jsonb not null default '[]'::jsonb,  -- [{value,decimals?,suffix?,label:{ar,en}}]
  accent          text not null default 'from-electric/40',
  photo_url       text,
  sort            int not null default 0,
  published       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique,
  category_ar  text not null default '',
  category_en  text not null default '',
  title_ar     text not null default '',
  title_en     text not null default '',
  excerpt_ar   text not null default '',
  excerpt_en   text not null default '',
  body_ar      text not null default '',
  body_en      text not null default '',
  date         text not null default '',
  type         text not null default 'article',   -- article | news
  image_url    text,
  sort         int not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.roles (
  id           uuid primary key default gen_random_uuid(),
  title_ar     text not null default '',
  title_en     text not null default '',
  team_ar      text not null default '',
  team_en      text not null default '',
  type_ar      text not null default '',
  type_en      text not null default '',
  location_ar  text not null default '',
  location_en  text not null default '',
  sort         int not null default 0,
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null default '',
  email       text not null default '',
  org         text not null default '',
  route       text not null default '',
  message     text not null default '',
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.media (
  id           uuid primary key default gen_random_uuid(),
  bucket_path  text not null,
  public_url   text not null,
  label        text,
  uploaded_by  uuid references auth.users (id),
  created_at   timestamptz not null default now()
);

create index if not exists athletes_sort_idx on public.athletes (sort);
create index if not exists articles_sort_idx on public.articles (sort);
create index if not exists roles_sort_idx    on public.roles (sort);

-- ============================================================
-- 4. Row Level Security
-- ============================================================
alter table public.profiles            enable row level security;
alter table public.content_docs        enable row level security;
alter table public.athletes            enable row level security;
alter table public.articles            enable row level security;
alter table public.roles               enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.media               enable row level security;

-- profiles: a user reads own row; admins read all; only admins flip is_admin.
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists profiles_admin_write on public.profiles;
create policy profiles_admin_write on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- content_docs: anyone can read; only admins write.
-- (Public site uses the SERVICE-ROLE key on the server and bypasses RLS,
--  but anon read is allowed so the anon key works for previews too.)
drop policy if exists content_docs_public_read on public.content_docs;
create policy content_docs_public_read on public.content_docs
  for select using (true);

drop policy if exists content_docs_admin_write on public.content_docs;
create policy content_docs_admin_write on public.content_docs
  for all using (public.is_admin()) with check (public.is_admin());

-- Lists: anon reads only published rows; admins read all; admins write.
drop policy if exists athletes_public_read on public.athletes;
create policy athletes_public_read on public.athletes
  for select using (published or public.is_admin());
drop policy if exists athletes_admin_write on public.athletes;
create policy athletes_admin_write on public.athletes
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists articles_public_read on public.articles;
create policy articles_public_read on public.articles
  for select using (published or public.is_admin());
drop policy if exists articles_admin_write on public.articles;
create policy articles_admin_write on public.articles
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists roles_public_read on public.roles;
create policy roles_public_read on public.roles
  for select using (published or public.is_admin());
drop policy if exists roles_admin_write on public.roles;
create policy roles_admin_write on public.roles
  for all using (public.is_admin()) with check (public.is_admin());

-- Contact: anyone may INSERT a submission; only admins read/update.
drop policy if exists contact_anon_insert on public.contact_submissions;
create policy contact_anon_insert on public.contact_submissions
  for insert with check (true);
drop policy if exists contact_admin_read on public.contact_submissions;
create policy contact_admin_read on public.contact_submissions
  for select using (public.is_admin());
drop policy if exists contact_admin_update on public.contact_submissions;
create policy contact_admin_update on public.contact_submissions
  for update using (public.is_admin()) with check (public.is_admin());

-- media: public read, admin write.
drop policy if exists media_public_read on public.media;
create policy media_public_read on public.media for select using (true);
drop policy if exists media_admin_write on public.media;
create policy media_admin_write on public.media
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- 5. Storage bucket for uploaded media
-- ============================================================
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists site_media_public_read on storage.objects;
create policy site_media_public_read on storage.objects
  for select using (bucket_id = 'site-media');

drop policy if exists site_media_admin_write on storage.objects;
create policy site_media_admin_write on storage.objects
  for all using (bucket_id = 'site-media' and public.is_admin())
  with check (bucket_id = 'site-media' and public.is_admin());

-- ============================================================
-- 6. Promote the first admin (EDIT the email, then run once)
-- ============================================================
-- After you invite the client in Authentication > Users, run:
--   update public.profiles set is_admin = true where email = 'CLIENT_EMAIL_HERE';
