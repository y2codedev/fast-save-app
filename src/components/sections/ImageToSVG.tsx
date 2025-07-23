'use client';

import { useRef, useState } from 'react';
import ImageTracer from 'imagetracerjs';
import { FileUploadArea, ImagePreview, Loader, SVGOutput, Toast } from '@/constants';


export default function ImageToSVG() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);

  const handleFile = (file: File) => {
    setLoading(true);
    setError(null);
    setSvg(null);
    setPreview(null);

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = canvasRef.current!;
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const svgString = ImageTracer.imagedataToSVG(imageData, {
            numberofcolors: 8,
            strokewidth: 1,
            scale: 1,
          });

          setSvg(svgString);
          setPreview(img.src);
          setLoading(false);
        };

        img.onerror = () => {
          throw new Error('Failed to load image.');
        };
      } catch (err: any) {
        setError('Failed to convert image to SVG.');
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the image file.');
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!svg) return;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'converted-image.svg';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    if (!svg) return;

    navigator.clipboard.writeText(svg);
    setShowCode(true);

    setTimeout(() => {
      setShowCode(false);
    }, 1000);
  }

  if (error) {
    Toast("error", error)
    return
  }

  return (
    <div className="mx-auto bg-transparent dark:bg-gray-800">
      <h1 className="font-medium text-sm sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
        Image to SVG Converter
      </h1>

      <FileUploadArea onFileUpload={handleFile} loading={loading}  />

      {preview && <ImagePreview imageSrc={preview} />}

      <canvas ref={canvasRef} className="hidden" />

      {loading && (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader />
          <span className="text-gray-600 dark:text-gray-400">Converting to SVG...</span>
        </div>
      )}

      {svg && !loading && (
        <SVGOutput
          onDownload={handleDownload}
          onCopyCode={handleCopyCode}
          showCode={showCode}
        />
      )}
    </div>
  );
}
