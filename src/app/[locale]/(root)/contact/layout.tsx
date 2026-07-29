import { Metadata } from 'next';
import React from 'react';

const title = 'Contact Us - FastSave Support';
const description = 'Get in touch with the FastSave team. We are here to help you with any questions or feedback regarding our media tools.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fastsave.com';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${siteUrl}/contact`,
    siteName: 'FastSave',
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
