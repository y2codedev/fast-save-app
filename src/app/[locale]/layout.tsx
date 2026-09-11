import type { Metadata, Viewport } from "next";
import "../globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FallbackLoader from "@/components/ui/FallbackLoader";
import ThemeProviderWrapper from "@/components/sections/ThemeProviderWrapper";
import ToastProvider from "@/components/sections/ToastProvider";
import AdvertisingScript from "@/components/AdvertisingScript";
import { ADS_CLIENT_ID } from "@/lib/advertising";
import { Inter } from "next/font/google";
import Script from "next/script";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale, getSiteUrl } from '@/lib/seo';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Index'});
  const navT = await getTranslations({locale, namespace: 'Navigation'});
  const siteUrl = getSiteUrl();
  const pageTitle = `Free Online File Converter — PDF, Image & Video Tools | ConvertAllNow`;
  const description = `Free browser-based tools to convert, compress, and edit PDFs, images, videos, and archives. No signup, no uploads — processing happens in your browser.`;

  return {
    metadataBase: new URL(siteUrl),
    other: {
      "google-adsense-account": ADS_CLIENT_ID,
    },
    title: {
      default: pageTitle,
      template: '%s',
    },
    description: description,
    keywords: [
      "free online file converter",
      "PDF converter online",
      "compress image online",
      "merge PDF free",
      "video to mp3",
      "image compressor",
      "background remover",
      "image converter",
      "browser based tools",
      "no upload file converter",
      "ConvertAllNow",
    ],


    authors: [{ name: "ConvertAllNow", url: siteUrl }],
    publisher: "ConvertAllNow",
    creator: "ConvertAllNow",
    robots: {
      index: true,
      follow: true,
      nocache: false,
      "max-image-preview": "large",
      "max-video-preview": "-1",
    },

    alternates: {
      canonical: getCanonicalUrl(locale),
      languages: getAlternateLanguages(),
    },

    openGraph: {
      title: pageTitle,
      description: description,
      type: "website",
      url: getCanonicalUrl(locale),
      siteName: "ConvertAllNow",
      locale: getOgLocale(locale),
      images: [
        {
          url: "/images/home-og.png",
          width: 1200,
          height: 630,
          alt: "ConvertAllNow - Free Online File Converter & Media Tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: ["/images/home-og.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
    },
    category: "Technology",
    applicationName: "ConvertAllNow",
  };
};

const inter = Inter({ subsets: ["latin"], display: "swap" });
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();



  return (
  <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={inter.className} suppressHydrationWarning>
  <head>
    <link rel="manifest" href="/manifest.webmanifest" />
    {/* Google AdSense Site Verification & Delivery */}
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT_ID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
    {/* Analytics remains opt-in until consent handling is configured. */}
    {process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" && <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-D77QJC0T0J"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-D77QJC0T0J');
      `}
    </Script>
    </>}
  </head>
  <body className="overflow-x-hidden min-h-screen flex flex-col" suppressHydrationWarning>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                  console.log('ServiceWorker registration failed: ', err);
                });
              });
            }
          `}
        </Script>
        <OrganizationSchema />
        <ThemeProviderWrapper>
          <NextIntlClientProvider messages={messages}>
            <NextTopLoader
              color="#4f46e5"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #4f46e5,0 0 5px #4f46e5"
            />
            <Navbar />
            <Suspense fallback={<FallbackLoader />}>
              {children}
            </Suspense>
            <Footer />
            <ToastProvider />
          </NextIntlClientProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
