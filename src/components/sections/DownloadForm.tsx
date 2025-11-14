'use client';

import { useState } from 'react';
import { ReelResult, Toast, Button, InputField, ResetButton } from '@/constants';
import { usePathname } from 'next/navigation';
import { TopHeader_Item } from '@/constants/data';
import { Sparkles, Link2, Download } from 'lucide-react';

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
    const isInstagram = pathName === '/' && trimmedUrl?.includes("https://www.instagram.com/reel");
    const isFacebook = pathName === '/fb-video' && trimmedUrl?.includes("https://www.facebook.com/share") || trimmedUrl?.includes("https://www.facebook.com/");
    const isSnapchat = pathName === '/snapchat' && (trimmedUrl?.includes("https://t.snapchat.com/") || trimmedUrl?.includes("https://snapchat.com/"));

    if (pathName === '/' && !isInstagram) {
      Toast('error', 'Please enter a valid Instagram URL');
      setIsLoading(false);
      return;
    }

    if (pathName === '/fb-video' && !isFacebook) {
      Toast('error', 'Please enter a valid Facebook URL');
      setIsLoading(false);
      return;
    }

    if (pathName === '/snapchat' && !isSnapchat) {
      Toast('error', 'Please enter a valid Snapchat URL');
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
    <main id="download-section" className="relative pt-16 px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Fast & Secure Downloads
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-violet-600 dark:from-white dark:via-purple-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            Download Social Media
            <span className="block text-purple-600 dark:text-purple-400">Videos Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Download videos from Instagram, Facebook, and Snapchat in high quality. 
            Plus, enjoy additional tools like background removal and audio extraction.
          </p>
        </div>

        {/* Download Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-lg opacity-30"></div>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <InputField
                  label={`Enter ${urlPath?.highlight} URL`}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your video link here..."
                  icon={<Link2 className="h-5 w-5 text-gray-400" />}
                />
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  isProcessing={isLoading}
                  labal={isLoading ? "Processing..." : "Download Now"}
                  icon={<Download className="h-5 w-5" />}
                  className="flex-1 min-w-[200px]"
                />

                {url && (
                  <ResetButton
                    onClick={resetForm}
                    labal='Clear'
                    isProcessing={isSaving}
                    variant="outline"
                  />
                )}
              </div>
            </form>

            {/* Quick Tips */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No Watermark</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>High Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Fast Download</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {downloadData && (
          <div className="mt-8 animate-fade-in">
            <ReelResult data={downloadData} isSaving={isSaving} setIsSaving={setIsSaving} />
          </div>
        )}
      </div>
    </main>
  );
}