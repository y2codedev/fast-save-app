import React from 'react';
import { Metadata } from 'next';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Privacy Policy | ConvertAllNow';
  const description =
    'Learn how ConvertAllNow handles personal information, cookies, analytics, advertising and other website data.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(locale, '/privacy'),
      siteName: 'ConvertAllNow',
      locale: getOgLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/privacy'),
      languages: getAlternateLanguages('/privacy'),
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <>
      <WebPageSchema
        title="Privacy Policy | ConvertAllNow"
        description="Learn how ConvertAllNow handles personal information, cookies, analytics, advertising and other website data."
        path="/privacy"
        locale={locale}
        dateModified="2026-09-25"
        breadcrumb={breadcrumbItems}
      />
      <BreadcrumbSchema locale={locale} items={breadcrumbItems} />

      <div className="w-full min-h-screen bg-slate-50 dark:bg-gray-950 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <VisualBreadcrumb items={breadcrumbItems} className="mb-4 sm:mb-8" />
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Header */}
          <header className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Last updated: September 25, 2026 &bull; ConvertAllNow Data Governance &amp; Privacy Practices
            </p>
          </header>

          {/* Intro Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 space-y-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed shadow-xs">
            <p>
              At ConvertAllNow (&ldquo;the Website&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we respect your personal privacy. This Privacy Policy details how we handle website visitor information, technical logging, browser cookies, analytics, and advertising when you visit our website.
            </p>
            <p>
              We believe in data minimization: our tools are freely accessible without account registration, and we do not collect personal names, email addresses, or payment cards to use our standard converters.
            </p>
          </div>

          {/* Main Privacy Policy Article */}
          <article className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-gray-800 space-y-10 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed shadow-xs">

            {/* 1. Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                1. Information We Collect
              </h2>
              <p>
                When you browse ConvertAllNow, we automatically receive and record limited technical usage data. We do not require account registration, passwords, phone numbers, or credit card information to use our online conversion tools.
              </p>
              <p>
                The information collected automatically includes standard web log variables, browser characteristics, referring pages, and aggregated usage metrics necessary to deliver the web application securely and reliably.
              </p>
            </section>

            {/* 2. Information Users Provide Directly */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                2. Information You Provide Directly
              </h2>
              <p>
                The only personal information we collect directly is information you choose to submit when communicating with our team. For example:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>
                  <strong>Support Inquiries:</strong> When you email our support team at <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline font-medium">support@y2code.com</a>, we receive your email address, sender name, and the contents of your message.
                </li>
                <li>
                  <strong>Feedback &amp; Bug Reports:</strong> Technical details you voluntarily provide regarding tool errors, browser versions, or feature requests.
                </li>
              </ul>
              <p>
                We use this information solely to respond to your inquiry and resolve technical issues. We never sell or rent your contact details to third parties.
              </p>
            </section>

            {/* 3. Technical & Device Information */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                3. Technical and Device Information
              </h2>
              <p>
                To maintain site stability, mitigate DDoS attacks, and verify client WebAssembly and HTML5 support, our hosting servers and monitoring systems may log:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>Internet Protocol (IP) address (used for approximate geographic region and security filtering)</li>
                <li>Browser software and version (e.g. Chrome, Firefox, Safari, Edge)</li>
                <li>Operating system and device category (desktop, mobile, tablet)</li>
                <li>Language preferences and screen viewport dimensions</li>
                <li>Date, timestamp, and referring URL of your visit</li>
              </ul>
            </section>

            {/* 4. File Processing & Document Privacy */}
            <section className="space-y-3 p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-950 dark:text-indigo-200">
                4. File Processing &amp; Document Privacy
              </h2>
              <p className="text-indigo-950/90 dark:text-indigo-200/90">
                We maintain a strict boundary between general website telemetry and your private files. ConvertAllNow file conversion utilities (PDF, image, audio, video, archive, and markdown tools) execute conversions <strong>client-side directly inside your web browser</strong>. Your documents, photos, and media are not uploaded to our web servers, stored in cloud databases, or indexed by our systems.
              </p>
              <p className="text-sm font-medium">
                For a complete, in-depth architectural report on in-browser WebAssembly memory handling, temporary lifecycle, and security boundaries, please visit our dedicated guide:{' '}
                <Link href="/file-privacy-security" className="text-indigo-600 dark:text-indigo-400 underline font-bold">
                  File Privacy &amp; Processing at ConvertAllNow &rarr;
                </Link>
              </p>
            </section>

            {/* 5. Cookies and Similar Technologies */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                5. Cookies and Local Storage
              </h2>
              <p>
                ConvertAllNow uses cookies and local browser storage (such as <code>localStorage</code>) to support core site functionality and enhance your user experience:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>
                  <strong>Functional Local Storage:</strong> We store local preferences on your device, such as your theme selection (Dark Mode vs Light Mode) and recent tool UI state. These tokens remain entirely on your device and are not transmitted to third-party databases.
                </li>
                <li>
                  <strong>Third-Party Cookies:</strong> External service providers, including Google Analytics and Google AdSense, place cookies or web beacons through your browser to measure site engagement and deliver relevant advertisements.
                </li>
              </ul>
            </section>

            {/* 6. Analytics (Google Analytics) */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                6. Web Analytics
              </h2>
              <p>
                We use Google Analytics (Property ID: <code>G-D77QJC0T0J</code>) to analyze aggregate visitor traffic patterns. Google Analytics collects information such as how frequently visitors view tools, bounce rates, and navigation paths. This data is aggregated and does not identify individual visitors personally.
              </p>
              <p>
                You can prevent Google Analytics from collecting your visit data by installing the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </section>

            {/* 7. Advertising & Google AdSense */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                7. Advertising &amp; Google AdSense
              </h2>
              <p>
                ConvertAllNow provides its tools for free. To support ongoing server hosting, bandwidth, and software maintenance, we display advertisements via Google AdSense (Publisher ID: <code>ca-pub-1504999187644497</code>).
              </p>
              <p>
                Third-party advertising vendors, including Google, use cookies to serve ads based on your prior visits to ConvertAllNow and other websites across the Internet. Google’s use of advertising cookies enables it and its partners to serve personalized ads to users based on browsing history.
              </p>
              <p>
                You can opt out of personalized advertising by visiting{' '}
                <a
                  href="https://myadcenter.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                >
                  Google My Ad Center
                </a>{' '}
                or learn how Google manages advertising data at{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 underline font-medium"
                >
                  Google Partner Sites Privacy Policy
                </a>.
              </p>
            </section>

            {/* 8. Third-Party Services */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                8. Third-Party Services &amp; Links
              </h2>
              <p>
                ConvertAllNow may integrate with or link to third-party services:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>
                  <strong>Social Media Download Endpoints:</strong> When using social link utilities (such as Instagram or Facebook utilities), your browser requests our endpoint, which queries third-party API providers to identify public streaming video URLs.
                </li>
                <li>
                  <strong>External Links:</strong> Our website may contain links to external websites, documentation, or tools. We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party platforms.
                </li>
              </ul>
            </section>

            {/* 9. Data Retention */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                9. Data Retention Policy
              </h2>
              <p>
                We adhere to strict data retention limits:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>
                  <strong>User Files &amp; Documents:</strong> Zero retention. Files processed in local converter tools are not uploaded and therefore never retained on our servers.
                </li>
                <li>
                  <strong>Server Access Logs:</strong> Standard web server access logs (containing IP address, browser type, and timestamp) are stored for transient operational security and diagnostics, then automatically rotated and deleted.
                </li>
                <li>
                  <strong>Support Communications:</strong> Direct emails sent to our support desk are retained only for as long as necessary to answer your inquiry and manage related technical support.
                </li>
              </ul>
            </section>

            {/* 10. Data Security */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                10. Data Security Measures
              </h2>
              <p>
                We deploy industry-standard technical measures to safeguard information:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>
                  <strong>Transport Layer Security (HTTPS):</strong> All communications between your browser and ConvertAllNow are encrypted using modern TLS/HTTPS certificates to prevent tampering or eavesdropping in transit.
                </li>
                <li>
                  <strong>Client-Side Isolation:</strong> By executing file transformations locally in browser WebAssembly and JavaScript environments, sensitive document data avoids internet transmission entirely.
                </li>
              </ul>
              <p>
                Please note that no method of transmission over the Internet or electronic infrastructure is completely invulnerable; we continuously review and update our configurations to maintain strong protections.
              </p>
            </section>

            {/* 11. User Privacy Choices & Rights */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                11. User Privacy Choices and Rights
              </h2>
              <p>
                Depending on your geographic location (including residents of the European Economic Area, the United Kingdom under GDPR, and California under CCPA/CPRA), you may have specific statutory privacy rights:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>
                  <strong>Cookie Controls:</strong> You can configure your browser to reject cookies, delete stored cookies, or notify you when a cookie is placed.
                </li>
                <li>
                  <strong>Right of Access &amp; Erasure:</strong> Because we do not operate user accounts, we do not hold user profile records. If you have previously communicated with us via email, you may request access to or deletion of that correspondence by emailing <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline">support@y2code.com</a>.
                </li>
                <li>
                  <strong>Opt-Out of Targeted Advertising:</strong> You can manage or disable interest-based advertising via Google My Ad Center and industry opt-out portals such as the Digital Advertising Alliance (<a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">optout.aboutads.info</a>).
                </li>
              </ul>
            </section>

            {/* 12. Children's Privacy */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                12. Children&rsquo;s Privacy
              </h2>
              <p>
                ConvertAllNow is a general-audience website and is not directed at or marketed to children under the age of 13 (or under 16 where applicable by regional law). We do not knowingly collect, request, or solicit personal information from children. If you believe that a minor has provided us with personal contact data, please notify us immediately at <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline">support@y2code.com</a>, and we will promptly delete the information.
              </p>
            </section>

            {/* 13. Changes to This Privacy Policy */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                13. Changes to This Privacy Policy
              </h2>
              <p>
                We may revise this Privacy Policy periodically to reflect service updates, technological advances, or statutory requirements. When modifications occur, we will update the &ldquo;Last updated&rdquo; timestamp at the top of this page. We encourage you to review this page periodically to stay informed about our data handling practices.
              </p>
            </section>

            {/* 14. Contact Information */}
            <section className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                14. Contact Us
              </h2>
              <p>
                If you have questions, feedback, or concerns regarding this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 text-sm space-y-1">
                <div>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                    support@y2code.com
                  </a>
                </div>
                <div>
                  <strong>Online Inquiries:</strong>{' '}
                  <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                    ConvertAllNow Contact &amp; Support Form
                  </Link>
                </div>
                <div>
                  <strong>Terms of Use:</strong>{' '}
                  <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                    Terms of Use
                  </Link>
                </div>
              </div>
            </section>

          </article>
        </div>
      </div>
    </>
  );
}