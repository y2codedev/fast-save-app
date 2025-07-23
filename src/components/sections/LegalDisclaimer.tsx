
'use client';

import Link from "next/link";

export default function LegalDisclaimer() {
  return (
    <div className="bg-white dark:bg-gray-900   py-16">
      <div className="mx-4">
        <div className="bg-gray-50 rounded-xl dark:bg-gray-800 py-16 mx-auto max-w-7xl sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Legal Disclaimer</h2>
              <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-300">
                <p>
                  FastVideoSave.net is not affiliated with Instagram or Meta. This service is intended for personal use only.
                </p>
                <p>
                  Downloading copyrighted content without permission may violate Instagram's Terms of Service and applicable copyright laws. Please ensure you have the right to download and use the content.
                </p>
                <p>
                  We respect intellectual property rights and comply with the DMCA. If you believe any content infringes your copyright, please contact us with the details.
                </p>
                <p className="font-medium">
                  By using our service, you agree to our
                  <Link
                    href="/terms"
                    className="text-indigo-600 px-2 underline hover:text-indigo-700 "
                  >
                    Terms of Service
                  </Link>
                  and
                  <Link
                    href="/privacy"
                    className="text-indigo-600 px-2 underline hover:text-indigo-700 "
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}