'use client';
import { useState } from 'react';
import { Button, Group, InputField, Toast } from '@/constants';
import axios from 'axios';

export default function SocialMediaDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [finalLink, setFinalLink] = useState<string | null>(null);

  const fetchMedia = async () => {
    if (!url) {
      Toast('error', 'Please enter a valid URL');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/api/yt-video?url=${url}`);
      setLoading(false);

      if (!response.data?.format?.url) {
        Toast('error', 'Could not retrieve video');
        return;
      }

      setFinalLink(response.data.format.url);
      setShowDownloadButton(true);

    } catch (error) {
      console.error('Error fetching media:', error);
      Toast('error', 'Failed to fetch video');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 px-4 pt-10">
        <div className="max-w-5xl mx-auto sm:p-10 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <InputField
            label="Enter Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste social media URL here"
          />

          <div className="mt-4">
            <Button
              onClick={fetchMedia}
              isProcessing={loading}
              labal="Convert Video"
            />
          </div>

          {showDownloadButton && finalLink && (
            <div className="mt-4">
              <video src={finalLink} controls width="100%" />
              {/* <a
                href={finalLink}
                download
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Download Video
              </a> */}
            </div>
          )}
        </div>
      </div>
      <Group />
    </>
  );
}
