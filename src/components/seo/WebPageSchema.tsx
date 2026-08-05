import { getSiteUrl } from '@/lib/seo';

interface WebPageSchemaProps {
  title: string;
  description: string;
  path: string;
  locale: string;
  dateModified?: string;
  breadcrumb?: { name: string; href?: string }[];
}

export default function WebPageSchema({
  title,
  description,
  path,
  locale,
  dateModified,
  breadcrumb,
}: WebPageSchemaProps) {
  const siteUrl = getSiteUrl();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const pageUrl = `${siteUrl}${localePrefix}${path}`;
  const today = new Date().toISOString().split('T')[0];

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: pageUrl,
    inLanguage: locale,
    dateModified: dateModified || today,
    isPartOf: {
      '@type': 'WebSite',
      name: 'ConvertAllNow',
      url: siteUrl,
    },
    author: {
      '@type': 'Organization',
      name: 'ConvertAllNow',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ConvertAllNow',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
  };

  if (breadcrumb && breadcrumb.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(item.href ? { item: `${siteUrl}${localePrefix}${item.href}` } : {}),
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
