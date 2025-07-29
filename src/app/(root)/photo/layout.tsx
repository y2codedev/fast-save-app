import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Image Converter – Convert PNG, JPG, WebP & More Instantly";

    const description =
        "Convert PNG, JPG, WebP, SVG, and more quickly with FastSave Image Converter. Free, fast, secure, no watermarks. Supports batch conversion and all major formats.";

    const keywords = [
        "Image Converter",
        "PNG to JPG",
        "JPG to PNG",
        "Convert WebP to PNG",
        "JPEG to PNG",
        "Image to WebP",
        "Convert SVG to PNG",
        "Free Photo Converter",
        "Online Image Format Converter",
        "Fast Image Converter",
        "Batch Image Converter",
        "High-Quality Image Conversion",
        "Transparent PNG Converter",
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
                    url: "https://fast-save.vercel.app/images/photo.webp",
                    width: 1200,
                    height: 630,
                    alt: "FastSave Image Format Converter",
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
