import { ReactElement } from 'react';

interface WebApplicationSchema {
    "@context": "https://schema.org";
    "@type": "WebApplication";
    name: string;
    description: string;
    applicationCategory: "Multimedia";
    operatingSystem: "Web";
}

const schemaData: WebApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FastSave - Instagram Reels Downloader",
    "description": "Download Instagram Reels in HD with no watermark. Free, fast, and no login required.",
    "applicationCategory": "Multimedia",
    "operatingSystem": "Web",
};

interface SchemaMarkupProps {
    data: WebApplicationSchema;
}

export default function SchemaMarkup({ data }: SchemaMarkupProps): ReactElement {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}


export function ExampleUsage() {
    return <SchemaMarkup data={schemaData} />
}