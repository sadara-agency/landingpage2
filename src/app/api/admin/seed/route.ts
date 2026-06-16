import 'server-only';
import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase/service';

// One-time migration: copy the in-repo src/content/*.ts into Supabase.
// Guarded by REVALIDATE_SECRET. Idempotent (upserts). Safe to re-run.
//
// Usage (after env is set + 001_cms_schema.sql applied):
//   curl -X POST "http://localhost:3000/api/admin/seed?secret=YOUR_REVALIDATE_SECRET"

import * as home from '@/content/home';
import * as nav from '@/content/nav';
import * as talent from '@/content/talent';
import * as advisory from '@/content/advisory';
import * as markets from '@/content/markets';
import * as institution from '@/content/institution';
import * as network from '@/content/network';
import * as careers from '@/content/careers';
import * as contact from '@/content/contact';
import * as images from '@/content/images';
import * as insights from '@/content/insights';
import { athletes } from '@/content/athletes';
import { articles } from '@/content/insights';
import { roles } from '@/content/careers';
import type { Bi } from '@/lib/i18n';

// Serialize a namespace import into plain JSON (drop functions / undefined).
function toData(ns: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(ns)) {
    if (typeof v === 'function') continue;
    out[k] = v;
  }
  return JSON.parse(JSON.stringify(out));
}

const DOCS: Record<string, Record<string, unknown>> = {
  home, nav, talent, advisory, markets, institution, network, careers, contact, images, insights,
};

export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const db = serviceClient();
  const report: Record<string, unknown> = {};

  // content_docs
  const docRows = Object.entries(DOCS).map(([key, ns]) => ({ key, data: toData(ns) }));
  const { error: docErr } = await db.from('content_docs').upsert(docRows, { onConflict: 'key' });
  if (docErr) return NextResponse.json({ step: 'content_docs', error: docErr.message }, { status: 500 });
  report.content_docs = docRows.length;

  // athletes
  const athleteRows = athletes.map((a, i) => ({
    slug: a.slug,
    name_ar: a.name.ar, name_en: a.name.en,
    sport_ar: a.sport.ar, sport_en: a.sport.en,
    position_ar: a.position.ar, position_en: a.position.en,
    tier: a.tier,
    club_ar: a.club.ar, club_en: a.club.en,
    featured: Boolean(a.featured),
    bio_ar: a.bio.ar, bio_en: a.bio.en,
    trajectory_ar: a.trajectory.ar, trajectory_en: a.trajectory.en,
    media_value_ar: a.mediaValue.ar, media_value_en: a.mediaValue.en,
    stats: a.stats,
    accent: a.accent,
    sort: i,
    published: true,
  }));
  const { error: aErr } = await db.from('athletes').upsert(athleteRows, { onConflict: 'slug' });
  if (aErr) return NextResponse.json({ step: 'athletes', error: aErr.message }, { status: 500 });
  report.athletes = athleteRows.length;

  // articles — derive a stable slug from the en title
  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 60);
  const articleRows = articles.map((a, i) => ({
    slug: slugify(a.title.en) || `article-${i}`,
    category_ar: a.category.ar, category_en: a.category.en,
    title_ar: a.title.ar, title_en: a.title.en,
    excerpt_ar: a.excerpt.ar, excerpt_en: a.excerpt.en,
    date: a.date,
    type: a.type,
    sort: i,
    published: true,
  }));
  const { error: artErr } = await db.from('articles').upsert(articleRows, { onConflict: 'slug' });
  if (artErr) return NextResponse.json({ step: 'articles', error: artErr.message }, { status: 500 });
  report.articles = articleRows.length;

  // roles — no natural key; clear + insert
  await db.from('roles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const roleRows = roles.list.map((r: { title: Bi; team: Bi; type: Bi; location: Bi }, i: number) => ({
    title_ar: r.title.ar, title_en: r.title.en,
    team_ar: r.team.ar, team_en: r.team.en,
    type_ar: r.type.ar, type_en: r.type.en,
    location_ar: r.location.ar, location_en: r.location.en,
    sort: i,
    published: true,
  }));
  const { error: rErr } = await db.from('roles').insert(roleRows);
  if (rErr) return NextResponse.json({ step: 'roles', error: rErr.message }, { status: 500 });
  report.roles = roleRows.length;

  return NextResponse.json({ ok: true, seeded: report });
}
