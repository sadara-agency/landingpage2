'use client';

import { useState } from 'react';

// Image field: shows a preview, lets the admin upload to Supabase Storage or
// paste a URL. Upload goes through /api/admin/upload (admin-guarded server route).
export function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'upload failed');
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'upload failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-start gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element -- admin preview, not a public LCP image
        <img src={value} alt="" className="h-16 w-16 rounded-lg border border-white/15 object-cover" />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-white/20 text-[10px] text-white/40">
          none
        </div>
      )}
      <div className="flex-1 space-y-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload"
          className="h-9 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm outline-none focus:border-[#3C3CFA]"
        />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5">
          {busy ? 'Uploading…' : 'Upload image'}
          <input type="file" accept="image/*" onChange={onFile} disabled={busy} className="hidden" />
        </label>
        {error && <p className="text-xs text-[#FF453A]">{error}</p>}
      </div>
    </div>
  );
}
