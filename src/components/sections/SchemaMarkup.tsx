import { ReactElement } from 'react';
import { getSiteUrl } from '@/lib/seo';

interface WebApplicationSchema {
    "@context": "https://schema.org";
    "@type": "WebApplication" | "SoftwareApplication";
    name: string;
    description: string;
    applicationCategory: "Multimedia" | "UtilitiesApplication" | "BrowserApplication";
    operatingSystem: "Web";
    url?: string;
    offers?: {
      "@type": "Offer";
      price: string;
      priceCurrency: string;
    };
    browserRequirements?: string;
    featureList?: string[];
    screenshot?: string;
}

interface SchemaMarkupProps {
    data?: WebApplicationSchema;
}

export default function SchemaMarkup({ data }: SchemaMarkupProps): ReactElement | null {
    if (!data) return null;
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

/**
 * Helper to create a full SoftwareApplication schema for tool pages.
 */
export function createToolSchema({
  name,
  description,
  path,
  locale,
  featureList,
  screenshot,
}: {
  name: string;
  description: string;
  path: string;
  locale: string;
  featureList?: string[];
  screenshot?: string;
}): WebApplicationSchema {
  const siteUrl = getSiteUrl();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: "Multimedia",
    operatingSystem: "Web",
    url: `${siteUrl}${localePrefix}${path}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
    ...(featureList ? { featureList } : {}),
    ...(screenshot ? { screenshot: `${siteUrl}${screenshot}` } : {}),
  };
}