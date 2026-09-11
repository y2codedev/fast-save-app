'use client';

import Script from 'next/script';
import { usePathname } from '@/i18n/routing';
import { ADS_CLIENT_ID, canShowAds } from '@/lib/advertising';

export default function AdvertisingScript() {
  const pathname = usePathname();
  if (!canShowAds(pathname)) return null;
  return <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT_ID}`} strategy="afterInteractive" crossOrigin="anonymous" />;
}
