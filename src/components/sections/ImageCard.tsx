'use client';
import { useEffect, useState } from 'react';

export default function ImageCard() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generate/latest')
      .then(res => res.json())
      .then(data => setUrl(data.imageUrl))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-96 bg-gray-100 animate-pulse" />;
  if (!url) return <div>No artwork yet. Try generating one!</div>;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <img src={url} alt="Generated" className="w-full aspect-square object-cover" />
      <div className="p-4 text-right">
        <a
          href={url}
          download="ai-art.png"
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
        >Download</a>
      </div>
    </div>
  );
}
