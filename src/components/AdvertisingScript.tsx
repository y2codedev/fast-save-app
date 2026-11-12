'use client';

import Script from 'next/script';
import { usePathname } from '@/i18n/routing';
import { useEffect, useState } from 'react';
import {
  ADS_CLIENT_ID,
  canShowAds,
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from '@/lib/advertising';

export default function AdvertisingScript() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const updateConsent = () => {
      try {
        setHasConsent(localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted');
      } catch {
        setHasConsent(false);
      }
    };

    updateConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, updateConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, updateConsent);
  }, []);

  if (!hasConsent || !canShowAds(pathname)) return null;
  return <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT_ID}`} strategy="afterInteractive" crossOrigin="anonymous" />;
}
