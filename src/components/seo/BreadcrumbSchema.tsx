import { getSiteUrl } from '@/lib/seo';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  locale: string;
}

export default function BreadcrumbSchema({ items, locale }: BreadcrumbSchemaProps) {
  const siteUrl = getSiteUrl();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.href ? { "item": `${siteUrl}${localePrefix}${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
