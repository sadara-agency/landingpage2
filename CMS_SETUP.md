# Sadara web-caa — CMS Setup & Handoff

A structured-field CMS lives inside this site. Admins log in at `/admin`, edit every
content field (bilingual ar/en), upload images, and changes go live within seconds
via ISR. The public site reads from Supabase but **falls back to the in-repo
`src/content/*.ts` files** if a row is missing — so it never breaks, even before setup.

## One-time setup

### 1. Create the Supabase project
- New project on Supabase (Pro). Note the **Project URL** and keys (Settings → API):
  - `anon` public key
  - `service_role` secret key

### 2. Run the schema
- Supabase → **SQL Editor** → paste & run `supabase/001_cms_schema.sql`.
- Verify with `supabase/001_verify.sql` (expect 7 tables, RLS on, `site-media` bucket).

### 3. Set environment variables
Local: create `.env.local` (see `.env.example`). On Vercel: add the same as project env vars.

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...            # server-only, never expose
REVALIDATE_SECRET=<long random string>
```

### 4. Create the admin user
- Supabase → **Authentication → Users → Add user** (email + password). No public signup.
- Promote to admin in SQL Editor:
  ```sql
  update public.profiles set is_admin = true where email = 'CLIENT_EMAIL_HERE';
  ```

### 5. Seed content from the current site
With env set and the app running (`npm run dev` locally, or after deploy):
```
curl -X POST "https://YOUR_SITE/api/admin/seed?secret=YOUR_REVALIDATE_SECRET"
```
This copies all current `src/content/*.ts` into the DB (docs + athletes + articles + roles).
Idempotent — safe to re-run. Expect a JSON report of row counts.

## Using the CMS
- Go to `/admin`, sign in.
- **Content** (left nav): one editor per section — Home, Navigation & Footer, Talent,
  Advisory, Markets, Institution, Network, Careers, Insights & Press, Contact, Images.
  Every text field shows paired Arabic + English inputs. Arrays (stats, nav items,
  footer links) add/remove/reorder. Image fields upload to Supabase Storage.
- **Lists**: Athletes, Articles & News, Open Roles — table + add/edit/delete/reorder,
  publish toggle. Contact Inbox — read & manage form submissions.
- **Save** → "live within seconds" (on-demand ISR revalidation).
- **View live site** button opens the public site in a new tab.

## Replacing the Unsplash placeholders
Current hero/athlete/article images are Unsplash placeholders. In admin:
- **Images** editor → upload real photography per section hero.
- **Athletes** → each athlete's Photo field → upload portrait.
- **Articles** → each article's Image field.
Uploaded files land in the `site-media` Storage bucket; the public URL is saved automatically.

## How it works (for developers)
- Public pages call loaders in `src/lib/content/*` → read Supabase (service role, ISR)
  → merge over the in-repo `.ts` fallback. `getDoc(key)` for docs; `listAthletes()` /
  `listArticles()` / `listRoles()` for lists.
- Nav/footer/pillar data is fetched in `app/[locale]/layout.tsx` and shared with client
  nav components via `NavDataContext` (no prop-drilling).
- Admin writes via server actions → `content_docs` / list tables → `revalidatePath`.
- Auth: Supabase email+password, `profiles.is_admin` gate, RLS on every table.
- Storage: `site-media` bucket, admin-write / public-read.

## Pre-push checks (run in `landing/web-caa`)
```
npx tsc --noEmit
npm run lint
npm run build
```
