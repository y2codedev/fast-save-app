"use client";

import { Toast } from '@/constants';
import { useState } from 'react';

interface MediaItem {
  url: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
  title?: string;
}

const usePinterestDownloader = () => {
  const [pinterestUrl, setPinterestUrl] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab';

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinterestUrl(e.target.value);
  };

  const fetchPinterestData = async () => {
    if (!pinterestUrl) {
      Toast('error', 'Please enter a Pinterest URL');
      return;
    }

    setIsLoading(true);
    setMediaItems([]);

    try {

      const encodedUrl = encodeURIComponent(pinterestUrl);

      const response = await fetch(
        `https://pinterest-video-and-image-downloader.p.rapidapi.com/pinterest?url=${encodedUrl}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'pinterest-video-and-image-downloader.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY || '5da58acae9mshaca9e06ba0032afp175489jsn9e4219e979ab',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const items: MediaItem[] = [];

      if (data.success && data.data?.url) {
        items.push({
          url: data.data.url,
          type: data.type === 'video' ? 'video' : 'image',
          width: data.data.width,
          height: data.data.height,
          title: data.data.title
        });
      } else if (data.images && Array.isArray(data.images)) {
        data.images.forEach((url: string) => {
          items.push({ url, type: 'image' });
        });
      } else if (data.videos && Array.isArray(data.videos)) {
        data.videos.forEach((url: string) => {
          items.push({ url, type: 'video' });
        });
      }

      if (items.length === 0) {
        throw new Error('No media found at this URL');
      }

      setMediaItems(items);
    } catch (err) {
      console.error('Pinterest download failed:', err);
      Toast("error", err instanceof Error ? err.message : 'Failed to fetch Pinterest content');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setPinterestUrl('');
    setMediaItems([]);
  };

  return {
    pinterestUrl,
    mediaItems,
    isLoading,
    handleUrlChange,
    fetchPinterestData,
    resetForm
  };
};

export default usePinterestDownloader;