import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminPrefsProvider } from '@/components/admin/AdminPrefsContext';
import { getSessionUser } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/service';

// Gate for every authenticated admin page. Non-admins are bounced to login.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#11132B] p-8 text-center text-white">
        <div className="max-w-md">
          <h1 className="text-lg font-semibold">CMS not configured</h1>
          <p className="mt-2 text-sm text-white/60">
            Set the Supabase env vars in <code>.env.local</code> and run{' '}
            <code>supabase/001_cms_schema.sql</code>.
          </p>
        </div>
      </div>
    );
  }

  const { user, isAdmin } = await getSessionUser();
  if (!user) redirect('/admin/login');
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#11132B] p-8 text-center text-white">
        <div className="max-w-md">
          <h1 className="text-lg font-semibold">Not authorised</h1>
          <p className="mt-2 text-sm text-white/60">
            {user.email} is signed in but is not an admin. Ask an administrator to enable access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminPrefsProvider>
      <AdminShell email={user.email ?? null} isAdmin={isAdmin}>{children}</AdminShell>
    </AdminPrefsProvider>
  );
}
