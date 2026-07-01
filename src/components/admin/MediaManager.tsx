'use client';

import { useState } from 'react';
import { deleteMedia, type MediaRow } from '@/app/admin/(dashboard)/media/actions';
import { errText } from '@/lib/admin/validate';

export function MediaManager({
  initial, onSelect,
}: { initial: MediaRow[]; onSelect?: (url: string) => void }) {
  const [rows, setRows] = useState<MediaRow[]>(initial);
  const [msg, setMsg] = useState<string | null>(null);

  async function onDelete(row: MediaRow) {
    if (!confirm('Delete this image? This cannot be undone.\nحذف هذه الصورة؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    const res = await deleteMedia(row.id, row.bucket_path);
    if (!res.ok) { setMsg(`Error: ${errText(res.error)}`); return; }
    setRows((rs) => rs.filter((r) => r.id !== row.id));
  }

  function onCopy(url: string) {
    navigator.clipboard.writeText(url);
    setMsg('Copied · تم النسخ');
  }

  return (
    <div>
      {msg && <p className="mb-4 text-xs" style={{ color: 'var(--adm-text-sm)' }}>{msg}</p>}
      {rows.length === 0 && (
        <p className="text-sm" style={{ color: 'var(--adm-text-xs)' }}>No uploads yet.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {rows.map((r) => (
          <div
            key={r.id}
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-input-bg)' }}
          >
            {onSelect ? (
              <button type="button" onClick={() => onSelect(r.public_url)} className="block w-full">
                {/* eslint-disable-next-line @next/next/no-img-element -- admin preview, not a public LCP image */}
                <img src={r.public_url} alt={r.label ?? ''} className="h-28 w-full object-cover" />
              </button>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- admin preview, not a public LCP image
              <img src={r.public_url} alt={r.label ?? ''} className="h-28 w-full object-cover" />
            )}
            <div className="space-y-1 p-2 text-xs" style={{ color: 'var(--adm-text-sm)' }}>
              <div className="truncate" title={r.label ?? ''}>{r.label || '(untitled)'}</div>
              <div style={{ color: 'var(--adm-text-xs)' }}>{new Date(r.created_at).toLocaleDateString()}</div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => onCopy(r.public_url)} className="text-[#3C3CFA]">Copy URL</button>
                {!onSelect && (
                  <button type="button" onClick={() => onDelete(r)} className="text-[#FF453A]">Delete</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
