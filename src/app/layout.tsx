import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from 'react';
import { Navbar, Footer, FallbackLoader, ThemeProviderWrapper, ToastProvider, AdsenseAd } from "@/constants";
import { Inter } from "next/font/google";
import GA from "@/components/image-converter/GA";
import { ExampleUsage } from "@/components/sections/SchemaMarkup";
import Script from "next/script";
import Head from "next/head";
export const generateMetadata = (): Metadata => {

  const title = "FastSave Instagram Reels Downloader – Save Reels in HD";

  const description = "Download Instagram Reels in HD with FastSave. No watermark, no login, 100% free. Save public Reels as MP4 videos in seconds.";
  const keywords = [
    "Instagram Reels Downloader",
    "Download Instagram Reels",
    "IG Reels to MP4",
    "Save Instagram Reels",
    "No Watermark Reels Download",
    "Fast Instagram Downloader",
    "Reels Video Saver",
    "Online Reels Downloader",
    "IG Reels Grabber",
    "Free IG Reels Tool"
  ];

  return {
    metadataBase: new URL("https://fast-save.vercel.app"),
    other: {
      "google-adsense-account": "ca-pub-1504999187644497",
    },
    title: title,
    description: description,
    keywords: keywords,

    authors: [{ name: "FastSave", url: "https://fast-save.vercel.app" }],
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
      canonical: "https://fast-save.vercel.app",
      types: {
        "application/rss+xml": "https://fast-save.vercel.app/feed.xml",
        "application/atom+xml": "https://fast-save.vercel.app/feed.xml",
      },
    },

    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: "https://fast-save.vercel.app",
      siteName: "FastSave",
      locale: "en_IN",
      images: [
        {
          url: "/images/insta.png",
          width: 1200,
          height: 630,
          alt: "FastSave - Social Media Downloader",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/images/insta.png"],
      creator: "@fastsaveapp",
      site: "@fastsaveapp",
      creatorId: "fastsaveapp",
      siteId: "fastsaveapp",
    },
    category: "Technology",
    applicationName: "FastSave - Instagram Reels Downloader",

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
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  </head>
  <body>
        <ThemeProviderWrapper>
          <Navbar />
          <AdsenseAd height="h-[100px]" slot={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string} className="" />
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