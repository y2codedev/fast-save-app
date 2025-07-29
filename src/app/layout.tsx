import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from 'react';
import { Navbar, Footer, FallbackLoader, ThemeProviderWrapper, ToastProvider } from "@/constants";
import { Inter } from "next/font/google";
import GA from "@/components/image-converter/GA";
export const generateMetadata = (): Metadata => {

  const title = "FastSave – Download HD Videos, Photos & Audio Without Watermark | Instagram, Facebook, Pinterest";
  const description = "FastSave is your ultimate download tool for saving high-quality videos, photos, audio, and stories from popular platforms like Instagram, Facebook, Pinterest, and more. Enjoy blazing-fast downloads with no watermarks, batch processing, and multiple format options (MP4, MP3, etc.). Whether you need to save reels, FB videos, or remove backgrounds, FastSave delivers seamless, HD-quality downloads in seconds. Try it now for free!";
  const keywords = [
    "FastSave", "Video Downloader", "Instagram Downloader", "Facebook Video Download", "Pinterest Downloader",
    "HD Video Download", "No Watermark Download", "MP4 Downloader", "MP3 Converter", "Reels Downloader",
    "Story Saver", "Social Media Downloader", "Fast Video Download", "Background Remover", "Batch Downloader",
    "High-Speed Download", "Online Video Saver", "Free Download Tool", "TikTok Downloader", "YouTube Video Saver",
    "Media Grabber", "Audio Extractor", "Photo Downloader", "Save Instagram Videos", "Save FB Videos",
    "Pinterest Video Download", "FastSave App", "Online Media Downloader", "Video Saver Tool", "Instagram Reels Saver",
    "Social Video Download", "No Ads Downloader", "Quick Save Videos", "Multiple Format Download", "Best Video Downloader",
    "Save Stories Online", "FastSave Pro", "Download HD Content", "Watermark-Free Videos", "Instagram Story Downloader",
    "FB Reels Saver", "Pinterest Image Download", "Fast Media Download", "Free HD Video Saver", "Background Eraser Tool",
    "Bulk Video Download", "Online MP3 Downloader", "Save Viral Videos", "FastSave Chrome Extension", "Social Content Downloader",
    "Private Video Download", "Instagram Audio Download", "High-Quality Video Saver", "FastSave Premium", "Unlimited Downloads"
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
        <meta name="google-site-verification" content="t-2LnjOgR1zIIiYZ4lAQWDQOzoGnQ8kruHPwqe-tpSk" />
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