export const metadata = {
    title: 'FastSave - Terms & Conditions',
    description: 'Terms of Service for FastSave download tools',
}

export default function TermsPage() {
    return (
        <div className="w-full min-h-screen bg-white dark:bg-gray-900 py-8">
            <main className="max-w-7xl mx-auto px-4 lg:px-8 bg-white dark:bg-gray-900 ">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-indigo-600">Terms & Conditions</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
                </header>

                <article className="prose dark:prose-invert prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using FastSave ("the Service"), you agree to be bound by these Terms of Service.
                            If you disagree with any part of the terms, you may not access the Service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                        <p>FastSave provides tools for downloading and processing online content, including:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>Pinterest content downloader</li>
                            <li>Video downloader from various platforms</li>
                            <li>Audio extraction from videos</li>
                            <li>Photo downloading tools</li>
                            <li>Facebook video downloader</li>
                            <li>Background removal from images</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                        <p>You agree to use the Service only for lawful purposes and in accordance with these Terms.</p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>You must not use the Service to violate any laws or regulations</li>
                            <li>You must respect copyright and intellectual property rights</li>
                            <li>You must not upload or process harmful or malicious content</li>
                            <li>You are responsible for any content you download or process</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">4. Limitations of Liability</h2>
                        <p>
                            FastSave is provided "as is" without any warranties. We do not guarantee that:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>The Service will be uninterrupted or error-free</li>
                            <li>The results obtained from using the Service will be accurate or reliable</li>
                            <li>The quality of any downloaded content will meet your expectations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms at any time. Your continued use of the Service
                            after any changes constitutes acceptance of the new Terms.
                        </p>
                    </section>
                </article>
            </main>
        </div>
    )
}