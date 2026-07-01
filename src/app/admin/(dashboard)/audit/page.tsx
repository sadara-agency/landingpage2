import { listAuditLog } from '@/lib/admin/audit';
import { AuditLog } from '@/components/admin/AuditLog';

export default async function AuditPage() {
  const res = await listAuditLog();
  const entries = res.ok ? res.entries : [];

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold">Activity Log</h1>
      <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>
        Recent create/update/delete actions across the CMS.
      </p>
      <div className="mt-6">
        <AuditLog entries={entries} />
      </div>
    </div>
  );
}
