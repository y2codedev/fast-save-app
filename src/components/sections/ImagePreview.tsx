'use client';

import Image from 'next/image';

interface ImagePreviewProps {
  imageSrc: string;
  label: string;
  size?: number; 
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageSrc,
  label,
  size,
  className = ""
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      const kb = bytes / 1024;
      return `${kb.toFixed(kb < 100 ? 1 : 0)} KB`;
    } else {
      const mb = bytes / (1024 * 1024);
      return `${mb.toFixed(1)} MB`;
    }
  };

  return (
    <div className={` bg-gray-50 dark:bg-gray-800 rounded-lg  p-4 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-medium text-sm sm:text-lg text-gray-700 dark:text-gray-300">
          {label}
        </h2>
        {size !== undefined && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatFileSize(size)}
          </span>
        )}
      </div>
      <div className="relative w-full  aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={label}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          quality={80}
          priority={true}
        />
      </div>
    </div>
  );
};

export default ImagePreview;