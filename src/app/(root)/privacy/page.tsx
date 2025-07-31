export const metadata = {
  title: 'FastSave - Privacy Policy',
  description: 'Privacy Policy for FastSave download tools',
}

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 py-8">
      <main className="max-w-7xl mx-auto px-4 lg:px-8 bg-white dark:bg-gray-900 ">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </header>

        <article className="prose dark:prose-invert prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>When you use FastSave, we may collect the following information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>URLs of content you want to download or process</li>
              <li>Basic usage data (features used, duration of use)</li>
              <li>Device information (browser type, operating system)</li>
              <li>IP address for security and analytics purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To provide and maintain our Service</li>
              <li>To improve user experience and develop new features</li>
              <li>To monitor usage and analyze trends</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To ensure compliance with our Terms of Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Third parties in connection with a business transaction</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p>
              We implement security measures to protect your information, but no method of transmission
              over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p>
              Our Service may contain links to third-party websites or services that are not operated by us.
              We have no control over and assume no responsibility for their content or privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page.
            </p>
          </section>
        </article>
      </main>
    </div>
  )
}