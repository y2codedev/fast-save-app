'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, UploadCloud, Download, AlertCircle, Loader2, RefreshCcw } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<{ url: string; index: number }[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // pdfjs-dist v3 has standard worker resolution
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImages([]);
      setError(null);
      setProgress(0);
      processPdf(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const processPdf = async (pdfFile: File) => {
    setLoading(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      // Use getDocument without .promise to get the loading task in v3
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const extractedImages = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for high quality

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;

        // White background (PDF pages are transparent by default)
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // In v3, render() returns a promise directly 
        await page.render(renderContext).promise;
        const imgUrl = canvas.toDataURL('image/jpeg', 0.9);
        extractedImages.push({ url: imgUrl, index: i });
        setProgress(Math.round((i / numPages) * 100));
      }

      setImages(extractedImages);
    } catch (err) {
      console.error(err);
      setError("Failed to process PDF. Make sure it is not password protected.");
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace('.pdf', '')}_page_${index}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetState = () => {
    setFile(null);
    setImages([]);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/30 mb-4">
            <ImagePlus className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            PDF to JPG Converter
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Extract every page of your PDF into high-quality JPG images. Processed entirely on your device for maximum privacy and speed.
        </p>
      </div>

      {!file && !loading && (
        <div 
          {...getRootProps()} 
          className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm ${isDragActive ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-cyan-400 hover:bg-cyan-50/30 dark:hover:bg-cyan-900/10'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`p-4 rounded-full transition-colors duration-300 ${isDragActive ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/30 group-hover:text-cyan-500'}`}>
              <UploadCloud className="w-10 h-10" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {isDragActive ? "Drop PDF file here" : "Click to upload or drag & drop a PDF"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Only single .pdf file is supported.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {loading && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-12 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-6" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Converting PDF to Images...</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Extracting high-quality JPGs from your document.</p>
          
          <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-cyan-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-2">{progress}%</p>
        </div>
      )}

      {images.length > 0 && !loading && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Conversion Complete</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Extracted {images.length} pages from {file?.name}</p>
            </div>
            <button 
              onClick={resetState}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600"
            >
              <RefreshCcw className="w-4 h-4" />
              Convert Another
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div 
                  key={img.index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow group flex flex-col"
                >
                  <div className="relative aspect-[3/4] w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
                    <img src={img.url} alt={`Page ${img.index}`} className="max-w-full max-h-full object-contain drop-shadow-md" />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
                      Page {img.index}
                    </div>
                  </div>
                  <div className="p-4 mt-auto">
                    <button 
                      onClick={() => downloadImage(img.url, img.index)}
                      className="w-full py-2.5 bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-900/20 dark:hover:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download JPG
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* How to Use Section */}
      <motion.div 
        className="mt-16 mb-8 text-left max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to extract JPGs from PDF?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Upload PDF</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click the upload area or drag & drop your PDF file. The processing is done securely in your browser so your data never leaves your device.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Our tool instantly scans all the pages of your PDF document and converts them into high-quality JPG image formats.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Download Images</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Preview the extracted images and click the download button on any individual page to save it as a JPG image to your device.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
