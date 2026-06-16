import { notFound } from 'next/navigation';
import { DocEditor } from '@/components/admin/DocEditor';
import { getDoc, type DocKey } from '@/lib/content';

const TITLES: Record<string, string> = {
  home: 'Home',
  nav: 'Navigation & Footer',
  talent: 'Talent',
  advisory: 'Advisory',
  markets: 'Markets',
  institution: 'Institution',
  network: 'Network',
  careers: 'Careers',
  insights: 'Insights & Press',
  contact: 'Contact',
  images: 'Images',
};

export default async function DocPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  if (!(doc in TITLES)) notFound();

  // Current effective content (DB merged over in-repo fallback) → seeds the form.
  const data = (await getDoc(doc as DocKey)) as unknown as Record<string, unknown>;
  const plain = JSON.parse(JSON.stringify(data)) as Record<string, unknown>;

  return <DocEditor docKey={doc} title={TITLES[doc]} initial={plain} />;
}
