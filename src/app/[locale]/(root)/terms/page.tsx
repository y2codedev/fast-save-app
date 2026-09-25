import React from 'react';
import { Metadata } from 'next';
import { getCanonicalUrl, getAlternateLanguages, getOgLocale } from '@/lib/seo';
import VisualBreadcrumb from '@/components/ui/VisualBreadcrumb';
import WebPageSchema from '@/components/seo/WebPageSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = 'Terms of Use | ConvertAllNow';
  const description =
    "Read the terms governing the use of ConvertAllNow's file conversion and online tools.";

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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@convertallnow',
      creator: '@convertallnow',
    },
    alternates: {
      canonical: getCanonicalUrl(locale, '/terms'),
      languages: getAlternateLanguages('/terms'),
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Terms of Use', href: '/terms' },
  ];

  return (
    <>
      <WebPageSchema
        title="Terms of Use | ConvertAllNow"
        description="Read the terms governing the use of ConvertAllNow's file conversion and online tools."
        path="/terms"
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
              Terms of Use
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Last updated: September 25, 2026 &bull; Rules, Responsibilities &amp; Legal Conditions
            </p>
          </header>

          {/* Intro Card */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 space-y-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed shadow-xs">
            <p>
              Welcome to ConvertAllNow (&ldquo;the Website&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). These Terms of Use govern your access to and use of our suite of free online conversion utilities, document tools, media formatters, and link resolution features.
            </p>
            <p>
              Please read these terms carefully before using the Website. By accessing or interacting with our tools, you confirm your acceptance of these Terms of Use and agree to comply with them.
            </p>
          </div>

          {/* Main Terms Article */}
          <article className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-12 border border-gray-200 dark:border-gray-800 space-y-10 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed shadow-xs">

            {/* 1. Acceptance of Terms */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, or utilizing any tool on ConvertAllNow, you enter into a legally binding agreement with us governed by these Terms of Use. If you do not agree to every provision contained herein, you must immediately cease all use of our website and services.
              </p>
            </section>

            {/* 2. Eligibility & Use of the Service */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                2. Eligibility &amp; Use of the Service
              </h2>
              <p>
                You must possess the legal capacity to enter into binding agreements in your applicable jurisdiction to use ConvertAllNow. ConvertAllNow is offered free of charge and does not require user registration or account creation.
              </p>
            </section>

            {/* 3. Permitted Use */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                3. Permitted Use
              </h2>
              <p>
                You are granted a revocable, non-exclusive, non-transferable license to access and use ConvertAllNow strictly for lawful personal, educational, and legitimate commercial file manipulation tasks, including:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>Converting, merging, splitting, compressing, or securing document files you legally own or hold authorization to modify.</li>
                <li>Formatting, re-encoding, or resizing your personal or company images, videos, audio clips, and archive packages.</li>
                <li>Utilizing URL tools to preview or back up publicly accessible media where you hold necessary rights or statutory fair-use authorization.</li>
              </ul>
            </section>

            {/* 4. Prohibited Use */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                4. Prohibited Use
              </h2>
              <p>
                You expressly agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc ps-6 space-y-1.5">
                <li>Processing, creating, or distributing files that contain malicious code, spyware, viruses, trojans, ransomware, or corrupted binaries.</li>
                <li>Processing or attempting to process content that is unlawful, infringing, defamatory, predatory, or harmful to minors.</li>
                <li>Using automated scripts, bots, spiders, or scrapers to perform high-frequency or bulk automated requests that overburden or degrade service availability for other users.</li>
                <li>Attempting to bypass security mechanisms, circumvent rate limits, exploit vulnerabilities, or reverse-engineer our backend APIs.</li>
                <li>Using the website to infringe upon any patent, trademark, trade secret, copyright, or other proprietary rights of any party.</li>
              </ul>
            </section>

            {/* 5. User Files and Content Ownership */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                5. User Files and Content Ownership
              </h2>
              <p>
                ConvertAllNow asserts <strong>zero ownership</strong> over the documents, photographs, videos, audio files, or archives you process using our services. You retain complete copyright, ownership, and all associated intellectual property rights in your files.
              </p>
              <p>
                You represent and warrant that you hold all necessary legal rights, licenses, and permissions to process, alter, or transform any content you input into our tools.
              </p>
            </section>

            {/* 6. Intellectual Property of ConvertAllNow */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                6. Intellectual Property of ConvertAllNow
              </h2>
              <p>
                All elements of the ConvertAllNow website—including but not limited to software code, algorithms, visual design, stylesheets, user interfaces, documentation, logos, and branding—are the proprietary intellectual property of ConvertAllNow and its licensors, protected by copyright and intellectual property laws.
              </p>
              <p>
                You may not mirror, sell, sublicense, re-host, reverse-compile, or redistribute the Website or its interface without our prior written authorization.
              </p>
            </section>

            {/* 7. Copyright & Third-Party Content (Downloader Notice) */}
            <section className="space-y-3 p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-amber-200">
                7. Copyright &amp; Third-Party Content
              </h2>
              <p className="text-amber-950/90 dark:text-amber-200/90">
                ConvertAllNow includes utilities that resolve publicly accessible links (such as Instagram, Facebook, and Snapchat downloaders). These tools are provided strictly as technical link resolution aids for personal reference, fair-use analysis, or archiving content you are authorized to access.
              </p>
              <ul className="list-disc ps-6 space-y-1.5 text-amber-950/90 dark:text-amber-200/90">
                <li>
                  <strong>User Responsibility:</strong> You are solely responsible for ensuring you have the content owner&rsquo;s authorization, a valid license, or applicable legal exemption before downloading, saving, or distributing third-party media.
                </li>
                <li>
                  <strong>No Endorsement:</strong> ConvertAllNow does not endorse, encourage, or facilitate copyright infringement.
                </li>
                <li>
                  <strong>No Platform Affiliation:</strong> ConvertAllNow is an independent entity and is not affiliated with, sponsored by, or endorsed by Instagram, Meta Platforms, Inc., Snap Inc., or any other third-party service provider.
                </li>
                <li>
                  <strong>DMCA &amp; Copyright Notices:</strong> If you are a copyright owner or an agent thereof and believe content referenced through our tools infringes your intellectual property, please submit an infringement notice to <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline font-medium">support@y2code.com</a> with complete verification details.
                </li>
              </ul>
            </section>

            {/* 8. Third-Party Services & Advertisements */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                8. Third-Party Services and Advertisements
              </h2>
              <p>
                ConvertAllNow may display third-party advertisements delivered by Google AdSense and may provide links to external websites. We do not endorse, guarantee, or assume responsibility for the accuracy, content, goods, or services offered by third-party advertisers or external websites.
              </p>
              <p>
                Any interactions or transactions you have with third parties found through our website are solely between you and the respective third party.
              </p>
            </section>

            {/* 9. Availability of Tools and Service Modifications */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                9. Availability of Tools &amp; Modifications
              </h2>
              <p>
                We strive to maintain continuous uptime and functionality. However, we do not guarantee that our tools will be available at all times without interruption. We reserve the right to modify, suspend, update, or discontinue any tool, feature, or route at our discretion without prior notice or liability.
              </p>
            </section>

            {/* 10. Conversion Results and Accuracy */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                10. Conversion Results and Accuracy
              </h2>
              <p>
                Our file converters execute locally inside your browser environment. Output quality and fidelity depend upon your source file integrity, file format standards, your browser engine, available device memory, and chosen conversion settings.
              </p>
              <p>
                While our tools utilize established open-source and WebAssembly conversion libraries, we make no representation that complex document layouts, proprietary embedded fonts, or damaged archives will convert without variance or formatting loss.
              </p>
            </section>

            {/* 11. User Responsibilities & Data Backups */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                11. User Responsibilities &amp; Backups
              </h2>
              <p>
                You are solely responsible for maintaining secure, independent backup copies of all original files before using any ConvertAllNow tool. Always inspect and verify your downloaded output file before deleting or overwriting any original source document.
              </p>
            </section>

            {/* 12. Disclaimer of Warranties */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                12. Disclaimer of Warranties
              </h2>
              <p>
                THE WEBSITE AND ALL TOOLS, FEATURES, AND DOCUMENTATION ARE PROVIDED STRICTLY ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p>
                TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, CONVERTALLNOW DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL MEET YOUR SPECIFIC REQUIREMENTS, BE ERROR-FREE, UNINTERRUPTED, OR FREE OF DEFECTS.
              </p>
            </section>

            {/* 13. Limitation of Liability */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                13. Limitation of Liability
              </h2>
              <p>
                UNDER NO CIRCUMSTANCES SHALL CONVERTALLNOW, ITS OPERATORS, CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA LOSS, CORRUPTED FILES, HARDWARE DAMAGE, OR BUSINESS INTERRUPTION) ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE TOOLS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                YOUR SOLE REMEDY FOR DISSATISFACTION WITH THE SERVICE IS TO DISCONTINUE USING CONVERTALLNOW.
              </p>
            </section>

            {/* 14. Changes to the Service */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                14. Changes to the Service
              </h2>
              <p>
                We may improve, refine, alter file limits, or change technical implementations of our utilities at any time to preserve system security, optimize client-side performance, or satisfy legal and regulatory requirements.
              </p>
            </section>

            {/* 15. Changes to These Terms */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                15. Changes to These Terms
              </h2>
              <p>
                We reserve the right to amend these Terms of Use at any time. When updates are published, the revised date at the top of this document will be updated. Your continued use of ConvertAllNow after the posting of changes constitutes your binding acceptance of the revised Terms.
              </p>
            </section>

            {/* 16. Contact & Authoritative Links */}
            <section className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                16. Contact &amp; Related Legal Resources
              </h2>
              <p>
                If you have questions, copyright notices, or legal inquiries concerning these Terms of Use, please reach out to our team:
              </p>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 text-sm space-y-1">
                <div>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:support@y2code.com" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                    support@y2code.com
                  </a>
                </div>
                <div>
                  <strong>Privacy Policy:</strong>{' '}
                  <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                    ConvertAllNow Privacy Policy (Data &amp; Cookies)
                  </Link>
                </div>
                <div>
                  <strong>File Handling &amp; Processing:</strong>{' '}
                  <Link href="/file-privacy-security" className="text-indigo-600 dark:text-indigo-400 underline font-medium">
                    File Privacy &amp; Processing Architecture
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