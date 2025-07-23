'use client';

import { useState } from 'react';
import { ReelResult, Toast, Button, InputField } from '@/constants';

export default function DownloadForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadData, setDownloadData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!url.includes("instagram.com/reel/")) {
      Toast('error', 'Please enter a valid Instagram Reel URL.');
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = `/api/download?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
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
      // Toast('success', 'Reel data fetched successfully!');
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
    }
  };

  return (
    <div id="download-section" className="bg-white dark:bg-gray-900 pt-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gray-50 shadow-sm dark:bg-gray-800 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputField
                label='Enter Instagram Reel URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/..."
              />
            </div>
            <Button
              isProcessing={isLoading}
              labal='Download Now'
            />
          </form>
          {downloadData && <ReelResult data={downloadData} isSaving={isSaving} setIsSaving={setIsSaving} />}
        </div>
      </div>
    </div>
  );
}