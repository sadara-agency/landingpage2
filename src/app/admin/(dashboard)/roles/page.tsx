import { RolesManager } from '@/components/admin/RolesManager';
import { listAllRoles } from './actions';

export default async function RolesAdminPage() {
  const res = await listAllRoles();
  const rows = res.ok ? res.rows : [];
  return <RolesManager initial={rows} />;
}
