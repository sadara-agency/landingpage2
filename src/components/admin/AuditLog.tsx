import type { AuditLogEntry } from '@/lib/admin/audit';

const ACTION_COLOR: Record<AuditLogEntry['action'], string> = {
  create: '#34C759',
  update: '#3C3CFA',
  delete: '#FF453A',
};

export function AuditLog({ entries }: { entries: AuditLogEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm" style={{ color: 'var(--adm-text-xs)' }}>No activity yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--adm-border)' }}>
      <table className="w-full text-sm">
        <thead className="text-left" style={{ background: 'var(--adm-input-bg)', color: 'var(--adm-text-sm)' }}>
          <tr>
            <th className="px-4 py-2 font-medium">When</th>
            <th className="px-4 py-2 font-medium">Action</th>
            <th className="px-4 py-2 font-medium">Type</th>
            <th className="px-4 py-2 font-medium">Item</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id} className="border-t" style={{ borderColor: 'var(--adm-border)' }}>
              <td className="px-4 py-2 text-xs" style={{ color: 'var(--adm-text-sm)' }}>
                {new Date(e.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <span className="font-medium capitalize" style={{ color: ACTION_COLOR[e.action] }}>{e.action}</span>
              </td>
              <td className="px-4 py-2 capitalize" style={{ color: 'var(--adm-text-sm)' }}>{e.entity_type}</td>
              <td className="px-4 py-2">{e.label || e.entity_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
