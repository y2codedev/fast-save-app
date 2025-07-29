import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Snapchat Video Downloader – Save Snapchat Videos Online in HD";
    const description =
        "Download Snapchat videos online in high-quality HD with FastSave Snapchat Video Downloader. Save snaps, stories, and videos quickly with no watermark, no login, and no app install. 100% free, secure, and works on all devices.";

    const keywords = [
        "Snapchat Video Downloader", "Download Snapchat Videos", "Snapchat Story Saver",
        "Save Snap Videos", "Snapchat Video Download Online", "HD Snapchat Downloader",
        "Fast Snapchat Saver", "Snapchat Reels Downloader", "Download Snaps Without Watermark",
        "Snapchat Video Converter", "Snap Video Grabber", "Online Snapchat Downloader",
        "Free Snapchat Video Download", "Snapchat Private Video Saver", "Snapchat Video Download Tool",
        "FastSave Snap Downloader", "Snapchat HD Saver", "Snapchat Video Extractor",
        "Download Snapchat Story Video", "Snapchat Downloader for Android", "Snapchat Downloader for iPhone",
        "Save Snapchat Memories", "Snapchat Status Video Download", "Quick Snapchat Video Saver",
        "Snapchat to MP4 Converter", "Download Snapchat Videos No Login", "Snapchat Clip Saver",
        "Fast Snapchat Download Site"
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
                    url: "/images/logo.svg",
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
            images: ["/images/logo.svg"],
        },
    };
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
