'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { browserClient } from '@/lib/supabase/browser';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = browserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    router.replace('/admin');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#11132B] px-4 text-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
      >
        <h1 className="text-xl font-semibold">Sadara CMS</h1>
        <p className="mt-1 text-sm text-white/50">Sign in to manage site content.</p>

        <label className="mt-6 block text-sm text-white/70">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="mt-1 h-11 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-[15px] outline-none focus:border-[#3C3CFA]"
          />
        </label>

        <label className="mt-4 block text-sm text-white/70">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="mt-1 h-11 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-[15px] outline-none focus:border-[#3C3CFA]"
          />
        </label>

        {error && <p className="mt-4 text-sm text-[#FF453A]">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 h-11 w-full rounded-lg bg-[#3C3CFA] font-medium transition-opacity disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
