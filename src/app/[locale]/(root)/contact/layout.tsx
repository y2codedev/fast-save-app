import { Metadata } from 'next';
import React from 'react';

const title = 'Contact Us - ConvertAllNow Support';
const description = 'Get in touch with the ConvertAllNow team. We are here to help you with any questions or feedback regarding our media tools.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://convertallnow.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/contact`,
    siteName: 'ConvertAllNow',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
