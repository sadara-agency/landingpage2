import { NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase/service';
import { getSessionUser } from '@/lib/supabase/server';
import { logAction } from '@/lib/admin/audit';

// Admin-only image upload → Supabase Storage 'site-media' → returns public URL.
export async function POST(req: Request) {
  const { user, isAdmin } = await getSessionUser();
  if (!user || !isAdmin) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'no file' }, { status: 400 });

  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  // Deterministic-ish name: timestamp comes from the file's lastModified (no Date.now()).
  const path = `uploads/${file.lastModified}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`.slice(0, 200);

  const db = serviceClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await db.storage
    .from('site-media')
    .upload(path, buffer, { contentType: file.type || `image/${ext}`, upsert: true });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const { data } = db.storage.from('site-media').getPublicUrl(path);
  const { data: created } = await db.from('media').insert({
    bucket_path: path,
    public_url: data.publicUrl,
    label: file.name,
    uploaded_by: user.id,
  }).select('id').single();

  if (created) await logAction(user.id, 'create', 'media', created.id, file.name);

  return NextResponse.json({ url: data.publicUrl });
}
