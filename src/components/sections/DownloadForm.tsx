'use client';

import { useState } from 'react';
import { ReelResult, Toast, Button, InputField, ResetButton } from '@/constants';
import { usePathname } from 'next/navigation';
import { TopHeader_Item } from '@/constants/data';
import { Sparkles, Link2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const pathName = usePathname();
  const urlPath = TopHeader_Item?.find(item => item?.path === pathName) || TopHeader_Item?.find(item => item?.path === '')!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!url) {
      Toast('error', 'Please enter a URL.');
      setIsLoading(false);
      return;
    }

    const trimmedUrl = url.trim();
    
    // Smart Input Validation
    const isValidPlatform = (link: string) => {
      try {
        const parsedUrl = new URL(link);
        const host = parsedUrl.hostname.toLowerCase();
        
        const allowedDomains = [
          'instagram.com', 'facebook.com', 'fb.watch',
          'snapchat.com', 't.snapchat.com',
          'youtube.com', 'youtu.be',
          'pinterest.com', 'pin.it',
          'tiktok.com', 'twitter.com', 'x.com'
        ];
        
        return allowedDomains.some(domain => host === domain || host.endsWith('.' + domain));
      } catch (e) {
        return false;
      }
    };

    if (!isValidPlatform(trimmedUrl)) {
      Toast('error', 'Please enter a valid social media URL (e.g., Instagram, Facebook, Snapchat)');
      setIsLoading(false);
      return;
    }

    try {
      setIsSaving(true);
      const apiUrl = `/api/download?url=${encodeURIComponent(trimmedUrl)}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      setDownloadData(data);
      setUrl('');
    } catch (err) {
      console.error('Download error:', err);
      Toast(
        'error',
        err instanceof Error
          ? err.message
          : 'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setUrl('');
    setDownloadData(null);
    setIsSaving(false);
    setIsLoading(false);
  };

  return (
    <div id="download-section" className="relative w-full">
      <div className="relative mx-auto max-w-4xl">
        {/* Modern Download Form Pill */}
        <div className="relative">
          <motion.form 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            onSubmit={handleSubmit} 
            className="relative z-10 flex flex-col md:flex-row items-center gap-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl p-2 md:p-3 rounded-3xl md:rounded-full shadow-2xl border border-white/40 dark:border-gray-700/50 transition-all focus-within:ring-4 focus-within:ring-indigo-500/20"
          >
            <div className="flex items-center flex-1 w-full pl-4 md:pl-6">
              <Link2 className="h-6 w-6 text-indigo-500 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={`Paste your ${urlPath?.highlight || 'media'} link here...`}
                className="w-full bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg py-3"
              />
              {url && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="pr-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Clear
                </button>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !url}
              className={`w-full md:w-auto font-bold py-4 px-10 rounded-2xl md:rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${
                isLoading || !url 
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 hover:-translate-y-1'
              }`}
            >
              {isLoading ? "Processing..." : "Download"}
              {!isLoading && <Download className="h-5 w-5" />}
            </button>
          </motion.form>

          {/* Quick Tips */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span>No Watermark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
              <span>High Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]"></div>
              <span>Fast Download</span>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {downloadData && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <ReelResult data={downloadData} isSaving={isSaving} setIsSaving={setIsSaving} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}