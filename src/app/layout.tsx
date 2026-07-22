import type { Metadata } from "next";
import "./globals.css";
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
export const generateMetadata = (): Metadata => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fast-save.vercel.app";
  const title = "FastSave - Free Online Media & PDF Tools";

  const description = "Edit, convert, compress, and merge PDFs, Videos, Images, and Audio instantly in your browser. 100% free, secure, and privacy-focused media suite.";
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
    "FastSave Suite"
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
      icon: '/favicon.svg',
    },

    authors: [{ name: "FastSave", url: siteUrl }],
    publisher: "FastSave",
    creator: "FastSave",
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
      siteName: "FastSave",
      locale: "en_IN",
      images: [
        {
          url: "/images/home-og.png",
          width: 1200,
          height: 630,
          alt: "FastSave - All-in-One Media & PDF Suite",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/images/home-og.png"],
      creator: "@fastsaveapp",
      site: "@fastsaveapp",
      creatorId: "fastsaveapp",
      siteId: "fastsaveapp",
    },
    category: "Technology",
    applicationName: "FastSave - Media & PDF Suite",

  };
};

const inter = Inter({ subsets: ["latin"], display: "swap" });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en" className={inter.className} suppressHydrationWarning>
  <head>
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
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
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}