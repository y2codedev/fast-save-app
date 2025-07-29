import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    const title = "FastSave Background Remover – Remove Image Backgrounds Instantly & Free";
    const description =
        "FastSave Background Remover helps you instantly remove backgrounds from any photo or image online. Use AI-powered technology to create transparent PNGs, profile pictures, product images, and more in seconds. 100% free, high-resolution output with no watermark!";
    const keywords = [
        "Background Remover", "Remove Background Online", "AI Background Removal",
        "Transparent Image Maker", "Remove Background from Photo", "FastSave Background Eraser",
        "Image Background Cleaner", "Remove Background Free", "No Watermark Background Remover",
        "Transparent PNG Generator", "Erase Image Background", "Product Image Background Remover",
        "Remove White Background", "Remove Background Tool", "Photo Cutout", "Remove Background Automatically",
        "Online Background Remover", "Fast Background Cleaner", "Profile Picture Maker",
        "FastSave Transparent Maker", "Free Background Removal", "Background Eraser for E-commerce",
        "Bulk Background Remover", "HD Transparent Background", "Auto Remove Image Background",
        "Fast Background Extractor", "One-click Background Removal", "AI Cutout Tool"
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
                    alt: "FastSave Background Remover",
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
