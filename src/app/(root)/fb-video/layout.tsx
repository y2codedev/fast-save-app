import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Facebook Video Downloader – Download FB Videos in HD for Free";
    const description =
        "FastSave Facebook Video Downloader allows you to download Facebook videos in high-definition (HD) quality quickly and for free. No watermark, no login required. Save videos from Facebook reels, feeds, pages, and private groups instantly. Works on all devices.";
    
    const keywords = [
        "Facebook Video Downloader", "Download Facebook Videos", "FB Video Download",
        "Save Facebook Videos", "Fast Facebook Downloader", "FB HD Video Downloader",
        "Download Facebook Reels", "Facebook Private Video Download", "FB MP4 Download",
        "FastSave Facebook Video Tool", "Free Facebook Video Downloader", "Online FB Video Download",
        "No Watermark Facebook Download", "Facebook Feed Video Saver", "Facebook Story Download",
        "Fast Facebook Media Grabber", "FB Video Extractor", "Facebook Reels to MP4",
        "Download FB Videos Android", "Download FB Videos iPhone", "Facebook Video Saver",
        "Fast Facebook Reel Downloader", "Download Video from Facebook", "FB Downloader Free",
        "Facebook HD Video Save", "Quick Facebook Video Downloader", "FastSave FB Video Tool",
        "Facebook Video Grabber Online", "Facebook Downloader Chrome Extension"
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
