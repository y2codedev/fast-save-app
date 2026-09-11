import { getSiteUrl } from '@/lib/seo';

export default function OrganizationSchema() {
  const siteUrl = getSiteUrl();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ConvertAllNow',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description:
      'Free browser-based tools for converting, editing, compressing, and managing images, videos, audio, and PDF files.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${siteUrl}/contact`,
      availableLanguage: [
        'English', 'Spanish', 'French', 'German', 'Portuguese',
        'Russian', 'Turkish', 'Arabic', 'Chinese', 'Indonesian',
      ],
    },
    foundingDate: '2026',
    knowsAbout: [
      'PDF conversion', 'Image compression', 'Video editing',
      'Audio extraction', 'Background removal', 'File format conversion',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ConvertAllNow',
    url: siteUrl,
    description: 'Free browser-based file converter and media tools — no signup required.',
    publisher: {
      '@type': 'Organization',
      name: 'ConvertAllNow',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
