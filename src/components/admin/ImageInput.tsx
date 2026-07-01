'use client';

import { useState } from 'react';
import { listMedia, type MediaRow } from '@/app/admin/(dashboard)/media/actions';
import { MediaManager } from './MediaManager';

// Image field: shows a preview, lets the admin upload to Supabase Storage,
// paste a URL, or pick a previously-uploaded image from the media library.
// Upload goes through /api/admin/upload (admin-guarded server route).
export function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [browsing, setBrowsing] = useState(false);
  const [library, setLibrary] = useState<MediaRow[] | null>(null);

  async function openLibrary() {
    setBrowsing(true);
    if (!library) {
      const res = await listMedia();
      setLibrary(res.ok ? res.rows : []);
    }
  }

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
        <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover" style={{ border: '1px solid var(--adm-border-md)' }} />
      ) : (
        <div
          className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed text-[10px]"
          style={{ borderColor: 'var(--adm-border-md)', color: 'var(--adm-text-xs)' }}
        >
          none
        </div>
      )}
      <div className="flex-1 space-y-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload"
          className="h-9 w-full rounded-lg px-3 text-sm outline-none"
          style={{
            border: '1px solid var(--adm-border-md)',
            background: 'var(--adm-input-bg)',
            color: 'var(--adm-text)',
          }}
        />
        <div className="flex gap-2">
          <label
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs"
            style={{ border: '1px solid var(--adm-border-md)', color: 'var(--adm-text-md)' }}
          >
            {busy ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" onChange={onFile} disabled={busy} className="hidden" />
          </label>
          <button
            type="button"
            onClick={openLibrary}
            className="rounded-lg px-3 py-1.5 text-xs"
            style={{ border: '1px solid var(--adm-border-md)', color: 'var(--adm-text-md)' }}
          >
            Browse library
          </button>
        </div>
        {error && <p className="text-xs" style={{ color: 'var(--adm-danger)' }}>{error}</p>}
      </div>

      {browsing && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={() => setBrowsing(false)}>
          <div
            className="h-full w-full max-w-2xl overflow-y-auto p-8"
            style={{ background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Media Library</h2>
              <button onClick={() => setBrowsing(false)} className="text-2xl" style={{ color: 'var(--adm-text-sm)' }}>✕</button>
            </div>
            {library === null ? (
              <p className="text-sm" style={{ color: 'var(--adm-text-xs)' }}>Loading…</p>
            ) : (
              <MediaManager
                initial={library}
                onSelect={(url) => { onChange(url); setBrowsing(false); }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
