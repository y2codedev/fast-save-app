import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Terms' });
  const title = `Terms of Service – ConvertAllNow`;
  const description = `Terms and Conditions governing the use of ConvertAllNow online file conversion and media tools.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/terms'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/terms'),
      languages: getAlternateLanguages('/terms'),
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Terms' });

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <>
      <WebPageSchema
        title="Terms of Service – ConvertAllNow"
        description="Terms and conditions for ConvertAllNow tools and services."
        path="/terms"
        locale={locale}
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <VisualBreadcrumb items={breadcrumbItems} className="mb-4 sm:mb-8" />
        <main className="max-w-4xl mx-auto space-y-10">

          <header className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Last modified: September 11, 2026. Please read these terms carefully before using ConvertAllNow.
            </p>
          </header>

          <article className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 space-y-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed shadow-sm">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Agreement to Terms</h2>
              <p>
                By accessing or using ConvertAllNow (&ldquo;the Website&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Permitted Use &amp; Local Processing</h2>
              <p>
                ConvertAllNow provides browser-based file conversion, image optimization, document organization, and media processing tools. Supported tools execute code locally in your web browser. You agree to use the services solely for lawful purposes and in compliance with all applicable local, national, and international laws.
              </p>
              <ul className="list-disc ps-6 space-y-1">
                <li>You must not use our tools to process material that infringes copyright, trademark, or intellectual property rights.</li>
                <li>You must not process malicious code, viruses, corrupted binaries, or content designed to disrupt systems.</li>
                <li>You must not attempt to reverse engineer, disrupt, overload, or bypass security barriers on the website.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Social Media Downloaders &amp; Third-Party Rights</h2>
              <p>
                ConvertAllNow provides online utilities that resolve publicly accessible media links (including Instagram, Facebook, and Snapchat utilities).
              </p>
              <ul className="list-disc ps-6 space-y-1">
                <li><strong>No Affiliation:</strong> ConvertAllNow is not affiliated with, endorsed by, or partnered with Instagram, Meta Platforms, Inc., Snap Inc., or any other third-party platform.</li>
                <li><strong>User Responsibility:</strong> You are solely responsible for ensuring that you have the copyright holder&rsquo;s authorization, a valid license, or applicable fair-use exemption before downloading or using any third-party media content.</li>
                <li><strong>Personal Reference Only:</strong> Download tools are provided for personal, non-commercial reference and backup purposes only.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Copyright Infringement &amp; DMCA Contact</h2>
              <p>
                We respect the intellectual property rights of others. Because browser-based converter tools process files directly inside your browser without uploading to our servers, we do not host or store user documents. For any questions regarding content resolution or intellectual property notices, please contact us at <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline">support@y2code.com</a> with complete claim details.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Prohibited Automated Abuse</h2>
              <p>
                Automated scraping, bulk harvesting, bot queries, or programmatic denial-of-service attempts against our endpoints without express written permission are strictly prohibited. We reserve the right to restrict or block IP addresses violating this policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Service Availability &amp; Disclaimer of Warranties</h2>
              <p>
                ConvertAllNow is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p>
                We do not warrant that the website will be uninterrupted, error-free, or free from browser compatibility bugs. Browser-based file processing depends entirely on your device hardware, memory, and browser execution environment.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Limitation of Liability</h2>
              <p>
                In no event shall ConvertAllNow, its developers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or file corruption arising from your access to or inability to use our tools. Always maintain independent backups of your important files.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Privacy Policy &amp; Transparency</h2>
              <p>
                Your privacy is paramount. Please review our detailed <Link href="/file-privacy-security" className="text-indigo-600 dark:text-indigo-400 underline font-medium">File Privacy &amp; Security Report</Link> and <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 underline font-medium">Privacy Policy</Link> for information on how browser sandboxing, cookies, and AdSense advertising operate.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">9. Changes to Terms &amp; Contact</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Continued use of the website following any changes constitutes acceptance of the new terms.
              </p>
              <p>
                If you have any questions regarding these Terms, please contact us by email at{' '}
                <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                  support@y2code.com
                </a>.
              </p>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}