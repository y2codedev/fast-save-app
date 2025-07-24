'use client';
import { Button, Group, InputField, Toast } from '@/constants';
import { LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function SnapchatDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [finalLink, setFinalLink] = useState<Blob | null>(null);

  const getData = async () => {

    if (!url) {
      Toast("error", "Please enter a valid Snapchat URL");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/snapchat-video?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!data?.videoUrl) {
        Toast('error', 'Video URL not found. Please try again.');
        return;
      }

      const response = await fetch(data.videoUrl);
      const blob = await response.blob();
      setUrl('');
      setFinalLink(blob);

    } catch (error) {
      console.error('Download failed:', error);
      Toast('error', 'Download failed. Please check the URL or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadClick = async () => {
    if (!finalLink) {
      Toast('error', 'Please fetch the video first.');
      return;
    }

    try {

      setIsSaving(true);

      const blobUrl = URL.createObjectURL(finalLink);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'snapchat-video.mp4';
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      Toast('error', 'Failed to download the video. Please try again.');

    } finally {
      setIsSaving(false);
    }

  };

  return (
    <>
      <div id="download-section" className="bg-white dark:bg-gray-900 pt-10 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gray-50 shadow-sm dark:bg-gray-800 p-6 sm:p-10">

            <InputField
              label="Enter Snapchat URL"
              type="url"
              id="snapchat-url"
              placeholder="Paste public Snapchat video URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <div className="mt-4 flex gap-4">
              <Button
                onClick={getData}
                isProcessing={loading}
                labal="Get Video"
              />

              {finalLink && (
                <Button
                  onClick={handleDownloadClick}
                  isProcessing={isSaving}
                  labal="Download"
                />
              )}

            </div>

            {!finalLink && !loading && (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
                  <LinkIcon className="w-full h-full" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  No media fetched yet
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enter a Pinterest URL and click "Fetch Media" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Group />
    </>
  );
}
