'use client';

import { useState } from 'react';
import { ReelResult, Toast, Button, InputField, ResetButton } from '@/constants';
import { usePathname } from 'next/navigation';
import { TopHeader_Item } from '@/constants/data';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const pathName = usePathname();
  const urlPath = TopHeader_Item.find(item => item.path === pathName) || TopHeader_Item.find(item => item.path === '')!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!url) {
      Toast('error', 'Please enter a URL.');
      setIsLoading(false);
      return;
    }

    const supportedPlatforms = [
      'https://www.instagram.com/reel',
      'https://x.com/',
      'youtube.com',
      'youtu.be',
      'https://www.facebook.com/share',
      'https://pin.it',
    ];

    const isValidUrl = supportedPlatforms?.some(platform => url?.includes(platform));

    if (!isValidUrl) {
      Toast('error', 'Please enter a valid URL');
      setIsLoading(false);
      return;
    }

    try {

      setIsSaving(true);
      const apiUrl = `/api/download?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store'
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
    <div id="download-section" className="bg-white dark:bg-gray-900 pt-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gray-50 shadow-sm dark:bg-gray-800 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputField
                label={`Enter ${urlPath?.highlight} URL`}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.example.com/..."
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                isProcessing={isLoading}
                labal='Click Here'
              />

              {url && (
                <ResetButton
                  onClick={resetForm}
                  labal='Reset'
                  isProcessing={isSaving}
                />
              )}
            </div>
          </form>
          {downloadData && <ReelResult data={downloadData} isSaving={isSaving} setIsSaving={setIsSaving} />}
        </div>
      </div>
    </div>
  );
}