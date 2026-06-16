import { ArticlesManager } from '@/components/admin/ArticlesManager';
import { listAllArticles } from './actions';

export default async function ArticlesAdminPage() {
  const res = await listAllArticles();
  const rows = res.ok ? res.rows : [];
  return <ArticlesManager initial={rows} />;
}
