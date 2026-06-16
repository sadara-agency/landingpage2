import { NextResponse } from 'next/server';
import { serviceClient, supabaseConfigured } from '@/lib/supabase/service';

// Public contact-form endpoint. Stores a submission row (admin reads it in the inbox).
export async function POST(req: Request) {
  let body: { name?: string; email?: string; org?: string; route?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ error: 'invalid' }, { status: 422 });
  }

  if (!supabaseConfigured()) {
    // No DB configured (e.g. local without env): accept silently so UX isn't broken.
    return NextResponse.json({ ok: true, stored: false });
  }

  const db = serviceClient();
  const { error } = await db.from('contact_submissions').insert({
    name,
    email,
    org: (body.org ?? '').trim(),
    route: (body.route ?? '').trim(),
    message,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, stored: true });
}
