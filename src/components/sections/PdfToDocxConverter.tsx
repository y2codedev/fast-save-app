"use client";

import { Button, FileUploader } from "@/constants";
import { useRef, useState } from "react";
import { FiUpload, FiFileText, FiDownload, FiCheck, FiFile } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';

function PdfToDocxConverter() {
  const t = useTranslations('PdfToDocx');
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [docxBlobURL, setDocxBlobURL] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [conversionStep, setConversionStep] = useState<'upload' | 'convert' | 'complete'>('upload');
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const handleFileChange = (file: File) => {
    if (file.type !== 'application/pdf') {
      if (messageRef.current) messageRef.current.innerHTML = "Error: Please upload a valid PDF file.";
      return;
    }
    
    if (file.size > 20 * 1024 * 1024) {
      if (messageRef.current) messageRef.current.innerHTML = "Error: File is too large. Max size is 20MB.";
      return;
    }

    setPdfFile(file);
    setDocxBlobURL(null);
    setConversionStep('convert');
    if (messageRef.current) messageRef.current.innerHTML = "";
  };

  const convertToDocx = async () => {
    if (!pdfFile) return;
    setIsLoading(true);
    
    if (messageRef.current) {
      messageRef.current.style.color = '#4f46e5';
      messageRef.current.innerHTML = "Initializing client-side PDF parser...";
    }

    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

      const docChildren: any[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        if (messageRef.current) {
          messageRef.current.innerHTML = `Extracting layout from page ${i} of ${pdf.numPages}...`;
        }
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const linesMap = new Map<number, { text: string; fontSize: number; isBold: boolean }[]>();

        for (const item of textContent.items as any[]) {
          if (!item.str || item.str.trim() === '') continue;
          const y = Math.round(item.transform[5] / 4) * 4;
          const fontSize = Math.abs(Math.round(item.transform[0])) || 12;
          const fontName = (item.fontName || '').toLowerCase();
          const isBold = fontName.includes('bold') || fontName.includes('black');

          if (!linesMap.has(y)) {
            linesMap.set(y, []);
          }
          linesMap.get(y)!.push({ text: item.str, fontSize, isBold });
        }

        const sortedY = Array.from(linesMap.keys()).sort((a, b) => b - a);

        for (const y of sortedY) {
          const words = linesMap.get(y)!;
          const lineText = words.map(w => w.text).join(' ');
          const avgFontSize = words[0]?.fontSize || 12;
          const isLineBold = words[0]?.isBold || false;

          // Filter out invalid XML control characters which corrupt MS Word DOCX
          const cleanText = lineText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
          if (!cleanText.trim()) continue;

          let size = Math.round(avgFontSize * 2);
          if (size < 16) size = 16;
          if (size > 48) size = 48;

          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: cleanText,
                  size: size,
                  bold: isLineBold,
                  color: "000000",
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }

        if (i < pdf.numPages) {
          docChildren.push(new Paragraph({ text: "", spacing: { after: 240 } }));
        }
      }

      if (docChildren.length === 0) {
        docChildren.push(
          new Paragraph({
            text: "No recognizable text layer found in this PDF document (the file may consist of scanned image pages without OCR text layers).",
          })
        );
      }

      if (messageRef.current) {
        messageRef.current.innerHTML = "Structuring Microsoft Word (.docx) file...";
      }

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docChildren,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      setDocxBlobURL(url);
      setConversionStep('complete');
      if (messageRef.current) messageRef.current.innerHTML = "";
    } catch (error) {
      console.error("Conversion error:", error);
      if (messageRef.current) {
        messageRef.current.style.color = '#ef4444';
        messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : "Conversion failed."}`;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetConverter = () => {
    setPdfFile(null);
    setDocxBlobURL(null);
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
          <div className=" inline-flex items-center whitespace-nowrap gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
            <FiFileText className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('titleBadge')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            {t('titleMain')}
            <span className="block text-indigo-600 dark:text-indigo-400">{t('titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/50">
           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {[
                { step: 'upload', label: t('step1Title'), icon: FiUpload },
                { step: 'convert', label: t('step2Title'), icon: FiFileText },
                { step: 'complete', label: t('step3Title'), icon: FiDownload },
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
                    <FileUploader 
                      videoFile={pdfFile} 
                      handleFileChange={handleFileChange} 
                      accept={{ 'application/pdf': ['.pdf'] }}
                      title={t('uploadTitle')}
                      subtitle={t('uploadDesc')}
                      dropText="Drag & drop files or"
                      browseText="browse"
                    />
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <p>Supported format: PDF (Max 20MB)</p>
                    </div>
                  </motion.div>
                )}

                {conversionStep === 'convert' && pdfFile && (
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
                            Ready to Convert
                          </p>
                          <div className="text-sm text-green-700 dark:text-green-300 mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                            <span className="truncate block" title={pdfFile.name}>{pdfFile.name}</span>
                            <span className="flex-shrink-0 whitespace-nowrap opacity-80">({(pdfFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p ref={messageRef} className="text-center text-sm text-red-500 font-mono"></p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={convertToDocx}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 border border-transparent cursor-pointer text-sm font-medium rounded-[8px] text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 transition-all duration-300"
                      >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {t('convertingBtn')}
                            </>
                        ) : (
                            t('convertBtn')
                        )}
                      </button>

                      <button
                        onClick={resetConverter}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 border border-transparent bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-[8px] text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiUpload className="w-4 h-4" />
                        Choose Different File
                      </button>
                    </div>
                  </motion.div>
                )}

                {conversionStep === 'complete' && docxBlobURL && (
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
                            {t('resultTitle')}
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            {t('resultDesc')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={docxBlobURL}
                        download={`${pdfFile?.name.replace(/\.[^/.]+$/, "") || 'converted'}.docx`}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <FiDownload className="h-5 w-5" />
                        {t('downloadBtn')}
                      </a>
                      <button
                        onClick={resetConverter}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
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
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-8 h-full inline-flex items-center whitespace-nowrap justify-center min-h-[400px]">
              {docxBlobURL ? (
                <div className="text-center text-green-500">
                  <FiCheck className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-lg font-medium">Conversion Successful</p>
                  <p className="text-sm text-gray-500 mt-2">Ready to edit in Microsoft Word</p>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <FiFileText className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">{t('willAppearHere')}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* How to Use Section */}
        <motion.div 
          className="mt-16 mb-8 text-start max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('howToTitle')}</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className=" inline-flex items-center whitespace-nowrap justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{t('step1Title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('step1Desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className=" inline-flex items-center whitespace-nowrap justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{t('step2Title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('step2Desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className=" inline-flex items-center whitespace-nowrap justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{t('step3Title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('step3Desc')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PdfToDocxConverter;
