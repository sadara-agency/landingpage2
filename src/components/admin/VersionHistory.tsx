'use client';

import { useEffect, useState } from 'react';
import type { ContentVersion } from '@/lib/admin/versions';

type VersionsResult = { ok: true; versions: ContentVersion[] } | { ok: false; error: string };

export function VersionHistory({
  fetchVersions, onRestore, onClose,
}: {
  fetchVersions: () => Promise<VersionsResult>;
  onRestore: (snapshot: Record<string, unknown>) => void;
  onClose: () => void;
}) {
  const [versions, setVersions] = useState<ContentVersion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVersions().then((res) => {
      if (res.ok) setVersions(res.versions);
      else setError(res.error);
    });
  }, [fetchVersions]);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/60" onClick={onClose}>
      <div
        className="h-full w-full max-w-lg overflow-y-auto p-8"
        style={{ background: 'var(--adm-surface)', color: 'var(--adm-text)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">History</h2>
          <button onClick={onClose} className="text-2xl" style={{ color: 'var(--adm-text-sm)' }}>✕</button>
        </div>

        {error && <p className="text-sm" style={{ color: 'var(--adm-danger)' }}>Error: {error}</p>}
        {!error && versions === null && (
          <p className="text-sm" style={{ color: 'var(--adm-text-xs)' }}>Loading…</p>
        )}
        {!error && versions?.length === 0 && (
          <p className="text-sm" style={{ color: 'var(--adm-text-xs)' }}>No earlier versions yet.</p>
        )}

        <div className="space-y-3">
          {versions?.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-lg border p-3"
              style={{ borderColor: 'var(--adm-border)', background: 'var(--adm-input-bg)' }}
            >
              <div className="text-xs" style={{ color: 'var(--adm-text-sm)' }}>
                {new Date(v.created_at).toLocaleString()}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Restore this version? Your current draft will be replaced (still unsaved until you save).\nاستعادة هذا الإصدار؟ سيتم استبدال المسودة الحالية.')) {
                    onRestore(v.snapshot);
                    onClose();
                  }
                }}
                className="rounded-lg px-3 py-1.5 text-xs"
                style={{ border: '1px solid var(--adm-border-md)', color: 'var(--adm-text-md)' }}
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
