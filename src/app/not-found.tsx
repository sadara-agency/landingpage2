import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-electric">404</p>
      <h1 className="mt-4 text-h1 font-extrabold text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-muted">The page you’re looking for doesn’t exist.</p>
      <Link href="/ar" className="editorial-link mt-8">Return home</Link>
    </main>
  );
}
