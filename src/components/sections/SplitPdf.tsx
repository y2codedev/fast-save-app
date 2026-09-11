'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, UploadCloud, Download, AlertCircle, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PrivacyBadge from '@/components/ui/PrivacyBadge';

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<'range' | 'all'>('range');
  const [pageRange, setPageRange] = useState<string>('1');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const selectedFile = acceptedFiles[0];
    setError(null);
    setDownloadUrl(null);
    setFile(selectedFile);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();
      setPageCount(count);
      setPageRange(`1-${Math.min(count, 3)}`);
    } catch (err) {
      console.error('Failed to parse PDF', err);
      setError('Could not read PDF. Make sure the file is not password-protected.');
      setFile(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setDownloadUrl(null);
    setError(null);
    setProgress(0);
  };

  const parsePageNumbers = (rangeStr: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = rangeStr.split(/[,;\s]+/).filter(Boolean);

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const from = Math.max(1, Math.min(start, end));
          const to = Math.min(maxPages, Math.max(start, end));
          for (let i = from; i <= to; i++) {
            pages.add(i - 1); // 0-indexed
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= maxPages) {
          pages.add(num - 1); // 0-indexed
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file || pageCount === 0) return;
    setLoading(true);
    setError(null);
    setProgress(10);

    try {
      const buffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer);
      const baseName = file.name.replace(/\.[^/.]+$/, '');

      if (splitMode === 'range') {
        const pageIndices = parsePageNumbers(pageRange, pageCount);
        if (pageIndices.length === 0) {
          setError(`Please specify valid page numbers between 1 and ${pageCount}.`);
          setLoading(false);
          return;
        }

        setProgress(40);
        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
        copiedPages.forEach((page) => newDoc.addPage(page));
        setProgress(80);

        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setDownloadName(`${baseName}-split.pdf`);
      } else {
        // Split all pages into individual PDFs zipped
        const zip = new JSZip();
        for (let i = 0; i < pageCount; i++) {
          const singleDoc = await PDFDocument.create();
          const [page] = await singleDoc.copyPages(srcDoc, [i]);
          singleDoc.addPage(page);
          const singleBytes = await singleDoc.save();
          zip.file(`${baseName}-page-${i + 1}.pdf`, singleBytes);
          setProgress(Math.round(20 + ((i + 1) / pageCount) * 60));
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        setDownloadUrl(url);
        setDownloadName(`${baseName}-all-pages.zip`);
      }

      setProgress(100);
    } catch (err) {
      console.error(err);
      setError('An error occurred while splitting the PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-5 px-4 sm:px-6 py-2">
      <div className="text-center mb-4">
        <div className="inline-flex items-center whitespace-nowrap justify-center w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 mb-2 shadow-sm">
          <Scissors className="w-6 h-6 text-rose-600 dark:text-rose-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          Split PDF Online
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-3 text-sm sm:text-base">
          Extract specific page ranges or split every page into separate PDF documents directly in your browser.
        </p>
        <PrivacyBadge text="Files stay on your device. Local in-browser processing with zero server uploads." />
      </div>

      {!file ? (
        <div
          {...getRootProps()}
          className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${
            isDragActive
              ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-900/10'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3">
            <div
              className={`p-3 rounded-full transition-colors duration-300 ${
                isDragActive
                  ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/30 group-hover:text-rose-500'
              }`}
            >
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200">
                {isDragActive ? 'Drop your PDF here' : 'Choose a PDF file or drag & drop'}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports standard multi-page PDF documents
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-6">
          {/* File summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200/60 dark:border-gray-600/60">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-8 h-8 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • {pageCount} {pageCount === 1 ? 'page' : 'pages'} detected
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 font-medium px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Change File
            </button>
          </div>

          {/* Mode Selector */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Choose Split Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSplitMode('range')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  splitMode === 'range'
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20 ring-2 ring-rose-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  Extract Page Range
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Extract specific pages or custom ranges (e.g. 1-3, 5) into a single PDF.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSplitMode('all')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  splitMode === 'all'
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20 ring-2 ring-rose-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  Split All Pages
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Save each page as a separate PDF file, packaged in a single ZIP download.
                </div>
              </button>
            </div>
          </div>

          {/* Range input */}
          {splitMode === 'range' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Enter page ranges to extract:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder={`e.g. 1-${Math.min(pageCount, 3)} or 1, 3, 5`}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Example: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">1-4, 7, 9-10</code>. Max page: {pageCount}.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action button */}
          {!downloadUrl ? (
            <button
              onClick={handleSplit}
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Splitting PDF ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  <span>Split PDF Now</span>
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
                  Split Completed Successfully!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Your files have been processed in-browser. Click below to download.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={downloadUrl}
                  download={downloadName}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download {splitMode === 'all' ? 'ZIP Archive' : 'PDF'}</span>
                </a>
                <button
                  onClick={reset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Split Another PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
