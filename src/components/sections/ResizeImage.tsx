'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Scaling, UploadCloud, Download, AlertCircle, Image as ImageIcon, RotateCcw, Lock, Unlock, CheckCircle2 } from 'lucide-react';
import PrivacyBadge from '@/components/ui/PrivacyBadge';

export default function ResizeImage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [targetFormat, setTargetFormat] = useState<string>('original');
  const [quality, setQuality] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resizedBlobUrl, setResizedBlobUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const selected = acceptedFiles[0];
    setError(null);
    setResizedBlobUrl(null);
    setFile(selected);

    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.naturalWidth);
      setOrigHeight(img.naturalHeight);
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
      imgRef.current = img;
    };
    img.onerror = () => {
      setError('Failed to load image file. Please try a valid JPG, PNG, or WebP image.');
    };
    img.src = url;
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif'],
    },
    multiple: false,
  });

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setOrigWidth(0);
    setOrigHeight(0);
    setTargetWidth(0);
    setTargetHeight(0);
    setResizedBlobUrl(null);
    setResizedSize(0);
    setError(null);
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockAspect && origWidth > 0 && origHeight > 0) {
      const ratio = origHeight / origWidth;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockAspect && origWidth > 0 && origHeight > 0) {
      const ratio = origWidth / origHeight;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const applyPreset = (percentage: number) => {
    if (origWidth === 0 || origHeight === 0) return;
    const factor = percentage / 100;
    setTargetWidth(Math.round(origWidth * factor));
    setTargetHeight(Math.round(origHeight * factor));
  };

  const handleResize = () => {
    if (!imgRef.current || targetWidth <= 0 || targetHeight <= 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas 2D context unavailable');
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(imgRef.current, 0, 0, targetWidth, targetHeight);

      let mimeType = file?.type || 'image/jpeg';
      if (targetFormat === 'jpeg') mimeType = 'image/jpeg';
      else if (targetFormat === 'png') mimeType = 'image/png';
      else if (targetFormat === 'webp') mimeType = 'image/webp';

      const q = mimeType === 'image/png' ? undefined : quality / 100;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError('Image generation failed.');
            setIsProcessing(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          setResizedBlobUrl(url);
          setResizedSize(blob.size);
          setIsProcessing(false);
        },
        mimeType,
        q
      );
    } catch (err) {
      console.error(err);
      setError('An error occurred while resizing your image.');
      setIsProcessing(false);
    }
  };

  const getOutputFilename = (): string => {
    if (!file) return 'resized-image';
    const base = file.name.replace(/\.[^/.]+$/, '');
    let ext = 'jpg';
    if (targetFormat === 'png') ext = 'png';
    else if (targetFormat === 'webp') ext = 'webp';
    else if (targetFormat === 'original') {
      const originalExt = file.name.split('.').pop() || 'jpg';
      ext = originalExt;
    }
    return `${base}-${targetWidth}x${targetHeight}.${ext}`;
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 px-4 sm:px-6 py-2">
      <div className="text-center mb-4">
        <div className="inline-flex items-center whitespace-nowrap justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-2 shadow-sm">
          <Scaling className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Resize Image Online
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-3 text-sm sm:text-base">
          Resize JPG, PNG, and WebP images by exact pixel dimensions or percentage without losing clarity.
        </p>
        <PrivacyBadge text="Images are resized locally in your browser memory using HTML5 Canvas. No uploads to any server." />
      </div>

      {!file ? (
        <div
          {...getRootProps()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${
            isDragActive
              ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-purple-400 hover:bg-purple-50/30 dark:hover:bg-purple-900/10'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
            <div
              className={`p-3 rounded-full transition-colors duration-300 ${
                isDragActive
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/30 group-hover:text-purple-500'
              }`}
            >
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
                {isDragActive ? 'Drop your image here' : 'Choose an image or drag & drop'}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports JPG, PNG, WebP, GIF, and BMP
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-6">
          {/* File summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/60">
            <div className="flex items-center gap-3 min-w-0">
              <ImageIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Original: {origWidth} × {origHeight} px • {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change Image
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Quick Percentage Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {[25, 50, 75, 100, 150, 200].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => applyPreset(pct)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-purple-100 dark:bg-gray-700 dark:hover:bg-purple-900/40 text-gray-800 dark:text-gray-200 hover:text-purple-600 transition-colors"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                Width (pixels)
              </label>
              <input
                type="number"
                value={targetWidth || ''}
                onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                Height (pixels)
              </label>
              <input
                type="number"
                value={targetHeight || ''}
                onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Aspect lock & Format options */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => setLockAspect(!lockAspect)}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {lockAspect ? (
                <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              ) : (
                <Unlock className="w-4 h-4 text-gray-400" />
              )}
              <span>Lock Aspect Ratio ({lockAspect ? 'Enabled' : 'Unlocked'})</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Format:
              </span>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500"
              >
                <option value="original">Original Format</option>
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          </div>

          {/* Quality slider */}
          {targetFormat !== 'png' && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>Output Quality</span>
                <span>{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action button */}
          {!resizedBlobUrl ? (
            <button
              onClick={handleResize}
              disabled={isProcessing || targetWidth <= 0 || targetHeight <= 0}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Resizing Image...</span>
                </>
              ) : (
                <>
                  <Scaling className="w-5 h-5" />
                  <span>Resize Image to {targetWidth} × {targetHeight} px</span>
                </>
              )}
            </button>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  Image Resized Successfully!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  New Dimensions: {targetWidth} × {targetHeight} px • {(resizedSize / 1024).toFixed(1)} KB
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={resizedBlobUrl}
                  download={getOutputFilename()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resized Image</span>
                </a>
                <button
                  onClick={reset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Resize Another Image</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
