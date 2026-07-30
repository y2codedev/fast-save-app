import type { Metadata } from "next";
import "../globals.css";
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FallbackLoader from "@/components/ui/FallbackLoader";
import ThemeProviderWrapper from "@/components/sections/ThemeProviderWrapper";
import ToastProvider from "@/components/sections/ToastProvider";
import AdsenseAd from "@/components/AdsenseAd";
import { Inter } from "next/font/google";
import GA from "@/components/image-converter/GA";
import { ExampleUsage } from "@/components/sections/SchemaMarkup";
import Script from "next/script";
import Head from "next/head";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Index'});
  const navT = await getTranslations({locale, namespace: 'Navigation'});
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://convertallnow.com";
  const title = `${t('title')} - ${navT('All-in-One Tools')}`;

  const description = t('description');
  const keywords = [
    "Online Media Tools",
    "PDF Converter",
    "Merge PDF Online",
    "Video Compressor",
    "Video to Audio",
    "Background Remover",
    "Image Converter",
    "Free PDF Tools",
    "Online Video Editor",
    "ConvertAllNow Suite"
  ];

  return {
    metadataBase: new URL(siteUrl),
    other: {
      "google-adsense-account": "ca-pub-1504999187644497",
    },
    title: title,
    description: description,
    keywords: keywords,
    icons: {
      icon: '/images/icon.png',
    },

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
      canonical: siteUrl,
      types: {
        "application/rss+xml": `${siteUrl}/feed.xml`,
        "application/atom+xml": `${siteUrl}/feed.xml`,
      },
    },

    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: siteUrl,
      siteName: "ConvertAllNow",
      locale: "en_IN",
      images: [
        {
          url: "/images/home-og.png",
          width: 1200,
          height: 630,
          alt: "ConvertAllNow - All-in-One Media & PDF Suite",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/images/home-og.png"],
      creator: "@convertallnow",
      site: "@convertallnow",
      creatorId: "convertallnow",
      siteId: "convertallnow",
    },
    category: "Technology",
    applicationName: "ConvertAllNow - Media & PDF Suite",

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
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
    {/* Google Analytics */}
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
  </head>
  <body>
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
            <div className="mx-auto max-w-7xl px-4 mt-4">
              <AdsenseAd height="h-[50px] md:h-[90px]" slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string} className="rounded-xl" />
            </div>
            < ExampleUsage />
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