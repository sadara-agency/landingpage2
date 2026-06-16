import { AthletesManager } from '@/components/admin/AthletesManager';
import { listAllAthletes } from './actions';

export default async function AthletesAdminPage() {
  const res = await listAllAthletes();
  const rows = res.ok ? res.rows : [];
  return <AthletesManager initial={rows} />;
}
