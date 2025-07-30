import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from 'react';
import { Navbar, Footer, FallbackLoader, ThemeProviderWrapper, ToastProvider } from "@/constants";
import { Inter } from "next/font/google";
import GA from "@/components/image-converter/GA";
export const generateMetadata = (): Metadata => {

  const title = "FastSave Instagram Reels Downloader – Save IG Reels Online in HD";

  const description = "Download Instagram Reels in HD with FastSave. No watermark, no login, 100% free. Save public Reels to MP4 quickly and easily.";
  const keywords = [
    "Instagram Reels Downloader", "Download Instagram Reels", "IG Reels to MP4",
    "Save Instagram Reels", "No Watermark Reels Download", "Fast Instagram Downloader",
    "Reels Video Saver", "Online Reels Downloader", "IG Reels Grabber", "Free IG Reels Tool"
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
    <html lang="en" className={inter?.className} suppressHydrationWarning>
      <GA GA_MEASUREMENT_ID="G-52GQ441X7H" />
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