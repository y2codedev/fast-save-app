'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ALL_TOOLS = [
    { name: 'Social Downloader', path: '/' },
    { name: 'Background Remover', path: '/bg-remover' },
    { name: 'Video Trimmer', path: '/video-trimmer' },
    { name: 'Image Compressor', path: '/image-compressor' },
    { name: 'Image Converter', path: '/photo' },
    { name: 'SVG Converter', path: '/photo' },
    { name: 'Markdown to PDF', path: '/md-converter' },
    { name: 'Video to GIF', path: '/video-to-gif' },
    { name: 'Audio Converter', path: '/audio' },
    { name: 'Audio Trimmer', path: '/audio-trimmer' },
    { name: 'Image to PDF', path: '/image-to-pdf' },
    { name: 'Video Compressor', path: '/video-compressor' },
    { name: 'PDF to JPG', path: '/pdf-to-jpg' },
    { name: 'Merge PDF', path: '/merge-pdf' },
    { name: 'Unlock PDF', path: '/unlock-pdf' },
    { name: 'Pro Image Editor', path: '/image-editor' },
    { name: 'IG Downloader', path: '/ig-downloader' },
];

export default function ExploreOtherTools() {
  const pathname = usePathname();
  const toolsToShow = ALL_TOOLS.filter(t => t.path !== pathname);

  return (
    <div className="text-center mt-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Explore More Tools
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Done with your media? Check out our other dedicated tools for downloading, converting, and compressing files.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
              {toolsToShow.map(tool => (
                  <Link key={tool.name} href={tool.path} className="inline-flex items-center gap-2 bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm border border-gray-200 dark:border-gray-600 hover:border-indigo-300 hover:-translate-y-1">
                      {tool.name}
                  </Link>
              ))}
          </div>
      </div>
    </div>
  );
}
