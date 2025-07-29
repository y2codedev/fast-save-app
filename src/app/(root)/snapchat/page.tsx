
import { DownloadForm, Group } from "@/constants";

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Snapchat Video Downloader – Save Snapchat Videos in HD";

    const description =
        "Download Snapchat videos in HD with FastSave. Save snaps, stories, and videos quickly. No watermark, no login, no app needed. Free and works on all devices.";

    const keywords = [
        "Snapchat Video Downloader",
        "Download Snapchat Videos",
        "Snapchat Story Saver",
        "Save Snap Videos",
        "Snapchat Video Download Online",
        "HD Snapchat Downloader",
        "Fast Snapchat Saver",
        "Download Snaps Without Watermark",
        "Snapchat Video Converter",
        "Online Snapchat Downloader",
        "Free Snapchat Video Download",
        "Snapchat Private Video Saver",
        "Snapchat Downloader for Android",
    ];

    return {
        metadataBase: new URL("https://fast-save.vercel.app"),
        other: {
            "google-site-verification": "tDnK8wGpDutxTfAN-cFdlLdL0AZxiNnDkkvqH08TAIA",
        },
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "website",
            url: "https://fast-save.vercel.app",
            images: [
                {
                    url: "https://fast-save.vercel.app/images/snapchat.jpg",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Snapchat Video Downloader",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["https://fast-save.vercel.app/images/snapchat.jpg"],
        },
    };
};

export default function Home() {

  return (
    <div className=" bg-white dark:bg-gray-900">
      <DownloadForm />
      <Group />
    </div>
  );
}