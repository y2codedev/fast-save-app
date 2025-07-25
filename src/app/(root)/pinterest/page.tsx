'use client';

import { Button, Group, InputField, ResetButton, Toast, usePinterestDownloader } from '@/constants';
import { useState } from 'react';

const PinterestDownloader = () => {
  const { pinterestUrl, mediaItem, isLoading, handleUrlChange, fetchPinterestData, resetForm } = usePinterestDownloader();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!mediaItem?.url) {
      Toast('error', 'No media item to download');
      return;
    }

    try {
      setIsDownloading(true);
      const response = await fetch(mediaItem.url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${mediaItem.title || 'pinterest-video'}.mp4`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);

    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 px-4">
        <div className="mx-auto max-w-7xl pt-10">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gray-50 shadow-sm dark:bg-gray-800 p-6 sm:p-10">
            <div className="">
              <InputField
                label='Enter Pinterest Video URL'
                type="url"
                id="pinterest-url"
                value={pinterestUrl}
                onChange={handleUrlChange}
                placeholder="https://www.pinterest.com/pin/123456789/"
              />
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                onClick={fetchPinterestData}
                isProcessing={isLoading}
                labal='Fetch Video'
              />

              {pinterestUrl && (
                <ResetButton
                  onClick={resetForm}
                  isProcessing={isLoading}
                  labal='Reset'
                />
              )}
            </div>

            {mediaItem && (
              <div className="space-y-6 mt-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Pinterest Video
                  </h2>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <div className="p-4">
                    {mediaItem.title && (
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2 line-clamp-2">
                        {mediaItem.title}
                      </h3>
                    )}

                    <div className="relative">
                      <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                        <video className="max-h-96 w-full" controls autoPlay>
                          <source src={mediaItem?.sourceUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                    <div className="mt-4 px-4 sm:px-4 flex justify-end">
                      <Button
                        onClick={handleDownload}
                        isProcessing={isDownloading}
                        labal='Download Now'
                        icon={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Group />
    </>
  );
};

export default PinterestDownloader;