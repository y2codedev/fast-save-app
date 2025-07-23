'use client';

import Script from 'next/script';

interface GAProps {
  GA_MEASUREMENT_ID: string;
}

export default function GA({ GA_MEASUREMENT_ID }: GAProps) {
  return (
    <>
      {/* Load the Google Tag Manager script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* Initialize Google Analytics once the script has been loaded */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined") {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
              
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            }
          `,
        }}
      />
    </>
  );
}
