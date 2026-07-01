import { listMedia } from './actions';
import { MediaManager } from '@/components/admin/MediaManager';

export default async function MediaPage() {
  const res = await listMedia();
  const rows = res.ok ? res.rows : [];

  return (
    <div className="max-w-5xl">
      <h1 className="text-xl font-semibold">Media Library</h1>
      <p className="mt-0.5 text-xs" style={{ color: 'var(--adm-text-sm)' }}>
        Every uploaded image, in one place.
      </p>
      <div className="mt-6">
        <MediaManager initial={rows} />
      </div>
    </div>
  );
}
