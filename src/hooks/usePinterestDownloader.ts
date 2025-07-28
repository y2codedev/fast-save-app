'use client';

import { useState } from 'react';

interface MediaItem {
  url: string;
  title?: string;
  description?: string;
  sourceUrl?: string;
  thumbnail?: string;
  videoUrl?: string;
}

const usePinterestDownloader = () => {
  const [pinterestUrl, setPinterestUrl] = useState('');
  const [mediaItem, setMediaItem] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinterestUrl(e.target.value);
  };

  const resetForm = () => {
    setPinterestUrl('');
    setMediaItem(null);
  };

  const fetchPinterestData = async () => {
    if (!pinterestUrl) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/pinterest-download?url=${encodeURIComponent(pinterestUrl)}`,);
      const data = await response.json();

      if (!response.ok) {
        console.error(data.error || 'Failed to fetch data');
        setMediaItem(null);
        return;
      }

      if (!data.videoUrl) {
        console.error('No video found in Pinterest pin');
        setMediaItem(null);
        return;
      }

      setMediaItem({
        url: data.videoUrl,
        title: data.title,
        description: data.description,
        sourceUrl: data.sourceUrl,
        thumbnail: data.thumbnail
      });
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pinterestUrl,
    mediaItem,
    isLoading,
    handleUrlChange,
    fetchPinterestData,
    resetForm,
  };
};

export default usePinterestDownloader;