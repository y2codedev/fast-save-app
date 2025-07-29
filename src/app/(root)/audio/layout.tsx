import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Audio Converter – Convert Video to MP3, Download High-Quality Audio Online";
    const description = "Convert videos to MP3, extract audio, and download high-quality audio files from YouTube, Instagram, Facebook, and more with FastSave Audio Converter. Enjoy fast, watermark-free, and free audio conversion with multiple formats and batch support.";
    const keywords = [
        "Audio Converter", "MP3 Downloader", "Video to MP3", "FastSave MP3 Converter",
        "Extract Audio", "Download Audio", "Online MP3 Converter", "High-Quality Audio Download",
        "Convert YouTube to MP3", "Instagram Audio Download", "Facebook Audio Extractor",
        "Fast Audio Downloader", "No Watermark Audio", "Free Audio Converter", "Batch Audio Conversion",
        "Audio to MP3 Tool", "Online Audio Saver", "MP3 Audio Tool", "Fast MP3 Download",
        "Convert Reels to MP3", "Social Media Audio Downloader", "FastSave Audio", "MP3 Grabber",
        "YouTube Audio Saver", "Download Podcast MP3", "Audio Extract Tool", "Best Audio Converter",
        "Quick MP3 Download", "Music Converter", "FastSave Sound Downloader", "HQ Audio Converter"
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
                    alt: "FastSave Audio Downloader",
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
