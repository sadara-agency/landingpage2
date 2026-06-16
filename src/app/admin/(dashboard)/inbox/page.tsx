import { InboxManager } from '@/components/admin/InboxManager';
import { listSubmissions } from './actions';

export default async function InboxAdminPage() {
  const res = await listSubmissions();
  const rows = res.ok ? res.rows : [];
  return <InboxManager initial={rows} />;
}
