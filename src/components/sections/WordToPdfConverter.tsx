"use client";

import { useRef, useState } from "react";
import { FiUpload, FiFileText, FiDownload, FiCheck, FiFile } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";

export default function WordToPdfConverter() {
  const t = useTranslations('ConverterUI');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBlobURL, setPdfBlobURL] = useState<string | null>(null);
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [conversionStep, setConversionStep] = useState<'upload' | 'convert' | 'complete'>('upload');
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const handleFileChange = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.docx') && !file.name.toLowerCase().endsWith('.doc')) {
      if (messageRef.current) {
        messageRef.current.style.color = '#ef4444';
        messageRef.current.innerHTML = "Error: Please upload a valid Microsoft Word (.docx or .doc) file.";
      }
      return;
    }
    
    if (file.size > 30 * 1024 * 1024) {
      if (messageRef.current) {
        messageRef.current.style.color = '#ef4444';
        messageRef.current.innerHTML = "Error: File is too large. Max size is 30MB.";
      }
      return;
    }

    setWordFile(file);
    setPdfBlobURL(null);
    setConversionStep('convert');
    if (messageRef.current) messageRef.current.innerHTML = "";
  };

  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    } else if (rejectedFiles.length > 0 && rejectedFiles[0]?.file) {
      handleFileChange(rejectedFiles[0].file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxSize: 30 * 1024 * 1024,
  });

  const convertToPdf = async () => {
    if (!wordFile) return;
    setIsLoading(true);

    if (messageRef.current) {
      messageRef.current.style.color = '#4f46e5';
      messageRef.current.innerHTML = "Parsing Microsoft Word document styling & layout...";
    }

    try {
      const arrayBuffer = await wordFile.arrayBuffer();
      
      // Import mammoth for Word XML to styled HTML translation
      const mammoth = await import("mammoth");
      const htmlResult = await mammoth.convertToHtml({ arrayBuffer });
      const renderedHtml = htmlResult.value;

      if (messageRef.current) {
        messageRef.current.innerHTML = "Compiling vector PDF pages in your browser memory...";
      }

      // Create an offscreen document container for PDF printing
      const container = document.createElement("div");
      container.style.padding = "40px";
      container.style.backgroundColor = "#ffffff";
      container.style.color = "#1f2937";
      container.style.fontFamily = "Arial, sans-serif";
      container.style.fontSize = "14px";
      container.style.lineHeight = "1.6";
      container.innerHTML = renderedHtml || "<p>Document contained no renderable text or tables.</p>";
      document.body.appendChild(container);
      container.style.position = "absolute";
      container.style.left = "-9999px";

      // Import html2pdf for rendering DOM to PDF Blob
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const opt = {
        margin: 0.6,
        filename: wordFile.name.replace(/\.[^/.]+$/, "") + ".pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      const pdfBlob: Blob = await html2pdf().set(opt).from(container).output("blob");
      document.body.removeChild(container);

      const url = URL.createObjectURL(pdfBlob);
      setPdfBlobURL(url);
      setConversionStep('complete');
      if (messageRef.current) messageRef.current.innerHTML = "";
    } catch (error) {
      console.error("Word to PDF error:", error);
      if (messageRef.current) {
        messageRef.current.style.color = "#ef4444";
        messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : "Conversion failed."}`;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetConverter = () => {
    if (pdfBlobURL && pdfBlobURL.startsWith("blob:")) {
      URL.revokeObjectURL(pdfBlobURL);
    }
    setWordFile(null);
    setPdfBlobURL(null);
    setConversionStep('upload');
    if (messageRef.current) messageRef.current.innerHTML = "";
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto w-full">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className=" inline-flex items-center whitespace-nowrap gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <FiFileText className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {t('badgeBrowser')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6 tracking-tight">
            {t('wordToPdfTitle')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('wordToPdfSubtitle')}
          </p>
        </motion.div>

        {/* Step Indicators */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {[
                { step: 'upload', label: t('stepUploadWord'), icon: FiUpload },
                { step: 'convert', label: t('stepConvert'), icon: FiFileText },
                { step: 'complete', label: t('stepDownloadPdf'), icon: FiDownload },
              ].map(({ step, label, icon: Icon }, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    conversionStep === step 
                      ? 'bg-gradient-to-br from-indigo-500 to-violet-500 border-transparent text-white shadow-md' 
                      : conversionStep === 'complete' && step === 'complete'
                      ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-transparent text-white shadow-md'
                      : index === 0 || (conversionStep === 'convert' && step === 'convert') || (conversionStep === 'complete')
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-400 dark:text-indigo-400'
                      : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600'
                  }`}>
                    {conversionStep === 'complete' && step === 'complete' ? (
                      <FiCheck className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`font-medium ${
                    conversionStep === step || (conversionStep === 'complete' && step === 'complete')
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {label}
                  </span>
                  {index < 2 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      index === 0 || conversionStep === 'convert' || conversionStep === 'complete'
                        ? 'bg-indigo-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-8 h-full">
              <AnimatePresence mode="wait">
                {conversionStep === 'upload' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="mb-6">
                      <label className="block sm:text-sm text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {t('uploadLabelWord')}
                      </label>
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-colors duration-200 cursor-pointer
                          ${isDragActive ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10" : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50"}`}
                      >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg inline-flex items-center whitespace-nowrap justify-center">
                            <FiUpload className="text-xl sm:text-2xl text-white" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{t('dragDropWord')}</span>{' '}
                            <span className="text-indigo-600 dark:text-indigo-400 underline">{t('browse')}</span>
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {t('supportedDocxMax')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 py-2.5 px-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                      {t('clientSideNotice')}
                    </div>
                  </motion.div>
                )}

                {conversionStep === 'convert' && wordFile && (
                  <motion.div
                    key="convert"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 w-full">
                      <div className="flex items-start sm:items-center gap-3">
                        <FiFile className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5 sm:mt-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-green-800 dark:text-green-200">
                            Word Document Ready
                          </p>
                          <div className="text-sm text-green-700 dark:text-green-300 mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                            <span className="truncate block" title={wordFile.name}>{wordFile.name}</span>
                            <span className="flex-shrink-0 whitespace-nowrap opacity-80">({(wordFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p ref={messageRef} className="text-center text-sm font-medium"></p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={convertToPdf}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 border border-transparent cursor-pointer text-sm font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 transition-all duration-300 shadow-md"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Converting to PDF...
                          </>
                        ) : (
                          <>
                            <FiFileText className="w-4 h-4" />
                            Convert to PDF Now
                          </>
                        )}
                      </button>

                      <button
                        onClick={resetConverter}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiUpload className="w-4 h-4" />
                        Different File
                      </button>
                    </div>
                  </motion.div>
                )}

                {conversionStep === 'complete' && pdfBlobURL && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FiCheck className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800 dark:text-green-200">
                            {t('pdfReadyTitle')}
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            {t('pdfReadyDesc')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={pdfBlobURL}
                        download={`${wordFile?.name.replace(/\.[^/.]+$/, "") || 'converted'}.pdf`}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5"
                      >
                        <FiDownload className="h-5 w-5" />
                        {t('downloadPdfBtn')}
                      </a>
                      <button
                        onClick={resetConverter}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        {t('convertAnother')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-8 h-full flex flex-col justify-center min-h-[400px]">
              {pdfBlobURL ? (
                <div className="text-center text-green-600 dark:text-green-400 space-y-3">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 inline-flex items-center whitespace-nowrap justify-center mx-auto mb-4 shadow-inner">
                    <FiCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{t('pdfCompiledSuccess')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('pdfCompiledSuccessDesc')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('whyUseTitleWord')}</h3>
                  {[
                    { title: t('localFormatting'), desc: t('localFormattingDesc') },
                    { title: t('zeroCloudStorage'), desc: t('zeroCloudStorageDesc') },
                    { title: t('noServerDelays'), desc: t('noServerDelaysDesc') },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 inline-flex items-center whitespace-nowrap justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
