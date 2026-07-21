'use client';

import { useRef, useState } from 'react';
import ImageTracer from 'imagetracerjs';
import { ErrorMessage, FileUploadArea, ImagePreview, Loader, SVGOutput } from '@/constants';
import { motion } from 'framer-motion';


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
  return (
    <div className="mx-auto w-full space-y-6">
      
      {!svg && !loading && (
        <FileUploadArea onFileUpload={handleFile} loading={false} subtitle="PNG, JPG (Max. 5MB)" />
      )}

      <canvas ref={canvasRef} className="hidden" />

      {loading && (
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50 p-12 flex flex-col items-center justify-center min-h-[300px]">
          <Loader />
          <p className="mt-6 font-medium text-gray-700 dark:text-gray-300 animate-pulse">Tracing image to SVG vectors...</p>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {svg && !loading && preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full relative rounded-2xl border border-white/40 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg p-6 lg:p-8"
        >
          <div className="flex flex-col lg:flex-row gap-8 w-full mb-8">
            {/* Original Preview */}
            <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col items-center p-6 shadow-inner">
              <span className="font-bold text-sm text-gray-400 mb-4 uppercase tracking-wider">Original Raster</span>
              <div className="relative w-full h-64 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                <img src={preview} className="max-w-full max-h-full object-contain drop-shadow-md" alt="Original" />
              </div>
            </div>

            {/* SVG Preview */}
            <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col items-center p-6 shadow-inner">
              <span className="font-bold text-sm text-indigo-500 mb-4 uppercase tracking-wider">Vector SVG</span>
              <div className="relative w-full h-64 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-lg overflow-hidden">
                <img 
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} 
                  className="max-w-full max-h-full object-contain drop-shadow-md" 
                  alt="Vector SVG" 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-3xl mx-auto">
            <button 
              onClick={handleDownload} 
              className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold px-6 py-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download SVG
            </button>
            <button 
              onClick={handleCopyCode} 
              className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-semibold px-6 py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              {showCode ? 'Copied to Clipboard!' : 'Copy SVG Code'}
            </button>
            <button 
              onClick={() => { setSvg(null); setPreview(null); }} 
              className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-transparent hover:border-red-200 dark:hover:border-red-800 font-semibold px-6 py-4 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center hover:-translate-y-0.5"
            >
              Convert Another
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
