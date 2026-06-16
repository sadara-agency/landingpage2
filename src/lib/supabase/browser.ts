'use client';
import { createBrowserClient } from '@supabase/ssr';

// Browser client (anon key). Used in the admin login + client components for the
// user session. RLS applies — writes require an is_admin profile.
export function browserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
