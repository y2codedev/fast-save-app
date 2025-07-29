import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from 'react';
import { Navbar, Footer, FallbackLoader, ThemeProviderWrapper, ToastProvider } from "@/constants";
import { Inter } from "next/font/google";
import GA from "@/components/image-converter/GA";
export const generateMetadata = (): Metadata => {
  const title = "FastSave Instagram Reels Downloader – Save IG Reels Online in HD";
  const description =
    "Download Instagram Reels quickly and easily with FastSave. Save IG Reels in HD quality with no watermark, no login required. 100% free, fast, and compatible with all devices. Download public Instagram Reels to MP4 in seconds!";

  const keywords = [
    "Instagram Reels Downloader", "Download Instagram Reels", "IG Reels Download",
    "Reels Saver", "Instagram Reels to MP4", "Download IG Reels Online",
    "Fast Instagram Downloader", "Save Reels HD", "No Watermark Reels Download",
    "Download Reels without Login", "Free IG Reels Download Tool", "Instagram Reels Grabber",
    "Instagram Video Downloader", "Instagram Reels Download Website", "Online Reels Downloader",
    "FastSave IG Reels", "Save Instagram Shorts", "Reels to MP4 Converter",
    "Instagram Reels Downloader for Android", "IG Reels Saver iPhone", "Reels Download Chrome",
    "Batch Reels Downloader", "Quick Instagram Reels Download", "Instagram Reels to Phone",
    "Download Trending IG Reels", "Save Viral Instagram Reels", "Reels Downloader No App"
  ];


  return {
    metadataBase: new URL("https://fast-save.vercel.app"),
    other: {
      "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
    },
    title: title,
    description: description,
    keywords: keywords,

    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: "https://fast-save.vercel.app",
      images: [
        {
          url: "public\images\logo.svg",
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
      images: ["/images/logo.svg"],
    },
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
      <GA GA_MEASUREMENT_ID="G-52GQ441X7H" />
      <head>
        <meta name="google-site-verification" content="tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA" />
      </head>
      <body>
        <ThemeProviderWrapper>
          <Navbar />
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