import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Facebook Video Downloader – Download FB Videos in HD";

    const description =
        "Download Facebook videos in HD quickly and free with FastSave. No watermark, no login needed. Save reels, feeds, pages & private videos on all devices.";

    const keywords = [
        "Facebook Video Downloader",
        "Download Facebook Videos",
        "FB Video Download",
        "Save Facebook Videos",
        "FB HD Video Downloader",
        "Download Facebook Reels",
        "Facebook Private Video Download",
        "FB MP4 Download",
        "Free Facebook Video Downloader",
        "Online FB Video Download",
        "No Watermark Facebook Download",
        "Facebook Story Download",
        "Facebook Video Saver",
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
                    alt: "FastSave Facebook Video Downloader",
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
