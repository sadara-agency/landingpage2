import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';

// Runs on the Node runtime so `crypto` is available for hashing the visitor key.
export const runtime = 'nodejs';

const BOT_RE = /bot|crawl|spider|slurp|bing|preview|fetch|monitor|lighthouse|headless/i;

// Internal page-view ingestion endpoint. Called fire-and-forget from middleware on
// public /[locale]/... requests. Never blocks navigation — always returns { ok: true }.
export async function POST(req: Request) {
  let body: { path?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const path = (body.path ?? '').trim();
  const ua = req.headers.get('user-agent') ?? '';

  // Cheap filtering: ignore bots, admin/api/asset paths.
  if (
    !path ||
    BOT_RE.test(ua) ||
    path.startsWith('/admin') ||
    path.startsWith('/api') ||
    path.startsWith('/_next') ||
    path.includes('.')
  ) {
    return NextResponse.json({ ok: true });
  }

  if (!supabaseConfigured()) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const country = req.headers.get('x-vercel-ip-country') ?? '';
  const region = req.headers.get('x-vercel-ip-country-region') ?? '';
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() ?? '';

  // Salted daily hash — counts a visitor once per day without storing their IP.
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  const salt = process.env.ANALYTICS_SALT ?? '';
  const visitorDay = createHash('sha256').update(`${ip}|${ua}|${today}|${salt}`).digest('hex');

  const db = serviceClient();
  // Fire-and-forget: don't surface DB errors to the client.
  await db
    .from('page_views')
    .insert({ path, locale: (body.locale ?? '').trim(), country, region, visitor_day: visitorDay })
    .then(() => undefined, () => undefined);

  return NextResponse.json({ ok: true });
}
