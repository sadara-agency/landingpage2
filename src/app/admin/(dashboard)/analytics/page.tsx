import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { getAnalytics } from './actions';

export default async function AnalyticsPage() {
  const res = await getAnalytics(30);
  const initial = res.ok ? res.summary : null;
  return <AnalyticsDashboard initial={initial} />;
}
