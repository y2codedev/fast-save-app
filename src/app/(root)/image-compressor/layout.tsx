import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Image Compressor – Compress Images Online Without Losing Quality";
    const description =
        "Compress JPEG, PNG, WebP, and other image formats online with FastSave Image Compressor. Reduce file size without losing quality. Fast, free, secure, and watermark-free — perfect for web, email, or social sharing. No signup required.";

    const keywords = [
        "Image Compressor", "Compress Images Online", "JPEG Compressor", "PNG Compressor",
        "WebP Compression", "Reduce Image Size", "Fast Image Compression", "Online Image Optimizer",
        "Image Resizer", "Free Image Compressor", "Lossless Compression Tool", "Compress Photos",
        "Image File Reducer", "Image Size Reducer", "FastSave Image Tool", "Online PNG Reducer",
        "Tiny Image Compressor", "Optimize Images for Web", "Photo Compressor", "Reduce JPEG File Size",
        "High-Quality Image Compressor", "Batch Image Compression", "Free Online Photo Compression",
        "Web Image Optimizer", "Compress Images Without Losing Quality", "Compress Image Without Watermark",
        "Fast Image Size Reducer", "Online Image Resizer and Compressor", "FastSave Photo Optimizer"
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
                    alt: "FastSave Image Compressor",
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
