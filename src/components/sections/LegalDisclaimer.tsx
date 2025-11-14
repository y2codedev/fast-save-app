'use client';

import Link from "next/link";
import { Shield, FileText, Lock } from 'lucide-react';

export default function LegalDisclaimer() {
  return (
    <div className="relative py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Legal & Safety Information</h2>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Main Content */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Important Disclaimer
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      FastVideoSave.net is an independent service and is not affiliated with Instagram, Facebook, 
                      Snapchat, or their parent companies. This tool is designed for personal use only.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Lock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Copyright Notice
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Downloading copyrighted content without proper authorization may violate platform terms 
                      of service and applicable copyright laws. Please ensure you have the right to download 
                      and use any content.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Note:</strong> We respect intellectual property rights and comply with the DMCA. 
                    If you believe any content infringes your copyright, please contact us immediately.
                  </p>
                </div>
              </div>

              {/* Links & Policies */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Legal Documents
                </h4>
                <div className="space-y-3">
                  {[
                    { href: "/terms", label: "Terms of Service", description: "Read our service terms and conditions" },
                    { href: "/privacy", label: "Privacy Policy", description: "Learn how we protect your data" },
                    { href: "/dmca", label: "DMCA Policy", description: "Copyright infringement procedures" },
                    { href: "/contact", label: "Contact Us", description: "Get in touch with our team" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block p-3 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {link.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {link.description}
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    By using our service, you agree to our Terms and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}