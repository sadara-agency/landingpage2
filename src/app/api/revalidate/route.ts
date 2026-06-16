import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// Called by admin save actions after a content write.
// Body: { secret, paths?: string[] }. If no paths given, revalidates the whole
// localized tree via the layout segment.
export async function POST(req: Request) {
  let body: { secret?: string; paths?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 });
  }
  if (!body.secret || body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const paths = body.paths?.length ? body.paths : ['/'];
  for (const p of paths) {
    // 'layout' so every locale variant under the path is refreshed.
    revalidatePath(p, 'layout');
  }
  return NextResponse.json({ revalidated: true, paths });
}
