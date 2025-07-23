'use client';

import React from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  imageSrc: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
  return (
    <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h2 className="font-medium text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-3">
        Original Image Preview
      </h2>
      <div className="relative w-full max-w-full h-64"> 
        <Image
          src={imageSrc}
          alt="Preview"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain rounded-lg"
          priority 
        />
      </div>
    </div>
  );
};

export default ImagePreview;
