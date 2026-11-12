'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from '@/lib/advertising';

const GA_MEASUREMENT_ID = 'G-D77QJC0T0J';

export default function AnalyticsScript() {
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

  if (!hasConsent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
