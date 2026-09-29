'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Check, ShieldCheck, ExternalLink } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        // Small delay so it doesn't flash on initial paint
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem('cookie_consent', 'accepted'); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem('cookie_consent', 'declined'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4 animate-in slide-in-from-bottom-2 duration-300"
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
          <Cookie className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            We use cookies &amp; third-party ads
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            ConvertAllNow uses cookies for site functionality, Google Analytics, and Google AdSense advertising. 
            Ads help keep all tools free. Third-party vendors including Google may use cookies to serve 
            personalized ads based on your visits.{' '}
            <a href="/privacy" className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 font-medium">
              Privacy Policy
            </a>
            {' '}·{' '}
            <a
              href="https://myadcenter.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 inline-flex items-center gap-0.5"
            >
              Ad Settings <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 self-stretch sm:self-auto">
          <button
            onClick={decline}
            className="px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all inline-flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md inline-flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
