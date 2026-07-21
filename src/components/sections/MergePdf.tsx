'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PDFDocument } from 'pdf-lib';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, UploadCloud, X, ArrowUp, ArrowDown, Download, AlertCircle, FilePlus } from 'lucide-react';

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setFiles(prev => [...prev, ...acceptedFiles]);
    setMergedPdfUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setMergedPdfUrl(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index - 1];
    newFiles[index - 1] = temp;
    setFiles(newFiles);
    setMergedPdfUrl(null);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + 1];
    newFiles[index + 1] = temp;
    setFiles(newFiles);
    setMergedPdfUrl(null);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      // Cast to any to satisfy TypeScript strict ArrayBufferView check
      const blob = new Blob([mergedPdfFile as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
    } catch (err) {
      console.error(err);
      setError("Failed to merge PDFs. Make sure they are not password protected.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 mb-4">
            <Layers className="w-8 h-8 text-rose-600 dark:text-rose-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            Merge PDF Files
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Combine multiple PDF files into a single document. Drag and drop to reorder the files before merging. Completely secure and processed directly in your browser.
        </p>
      </div>

      {/* Dropzone */}
      <div 
        {...getRootProps()} 
        className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${isDragActive ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-900/10'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full transition-colors duration-300 ${isDragActive ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/30 group-hover:text-rose-500'}`}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {isDragActive ? "Drop PDF files here" : "Click to upload or drag & drop PDFs"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Only .pdf files are supported.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Selected Files ({files.length})</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Order them exactly as you want them merged</span>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div 
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="hidden sm:flex flex-col gap-1">
                      <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                        <ArrowUp className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button onClick={() => moveDown(index)} disabled={index === files.length - 1} className="p-1 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                        <ArrowDown className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-lg shrink-0">
                      <span className="font-bold text-rose-600 dark:text-rose-400">{index + 1}</span>
                    </div>
                    <div className="truncate">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="sm:hidden flex flex-col gap-1 mr-2">
                      <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                      <button onClick={() => moveDown(index)} disabled={index === files.length - 1} className="p-1 disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                    </div>
                    <button onClick={() => removeFile(index)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!mergedPdfUrl ? (
            <button 
              onClick={mergePdfs}
              disabled={files.length < 2 || loading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Merging PDFs...</span>
                </div>
              ) : (
                <>
                  <FilePlus className="w-5 h-5" />
                  <span>Merge {files.length} PDFs</span>
                </>
              )}
            </button>
          ) : (
            <div className="w-full mt-4 flex flex-col sm:flex-row items-center gap-4">
              <a 
                href={mergedPdfUrl}
                download="merged_document.pdf"
                className="w-full sm:flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Download Merged PDF</span>
              </a>
              <button 
                onClick={() => { setFiles([]); setMergedPdfUrl(null); }}
                className="w-full sm:flex-1 py-4 px-6 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold rounded-xl shadow-sm transition-colors border border-gray-200 dark:border-gray-700"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
