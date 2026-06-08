/** Organization structured data for SEO/sharing. Rendered once in the root layout. */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sadara Sports',
    alternateName: 'صدارة الرياضية',
    url: 'https://sadarasport.sa',
    logo: 'https://sadarasport.sa/brand/logo-icon.svg',
    description:
      'An institution, not an agency. Sadara represents and develops athletes, advises clubs and federations, and connects markets — one institution, three strategic units.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riyadh',
      addressCountry: 'SA',
    },
    areaServed: 'MENA',
    knowsLanguage: ['ar', 'en'],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
