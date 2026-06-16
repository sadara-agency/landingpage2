import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Refreshes the Supabase auth session cookie on admin routes so server
// components see a current session. Public site routes are untouched.
export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: req });

  // Only run on /admin (login is public but still needs the client for session).
  if (!req.nextUrl.pathname.startsWith('/admin')) return res;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return res; // not configured yet — let pages handle the empty state

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(toSet) {
        toSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
