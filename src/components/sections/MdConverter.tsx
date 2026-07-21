"use client";

import { Button, FileUploader } from "@/constants";
import { useRef, useState } from "react";
import { FiUpload, FiFileText, FiDownload, FiCheck, FiFile } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";

function MdConverter() {
  const [isLoading, setIsLoading] = useState(false);
  const [mdFile, setMdFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [conversionStep, setConversionStep] = useState<'upload' | 'preview'>('upload');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const handleFileChange = (file: File) => {
    setMdFile(file);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      if (text) {
        const parsedHtml = await marked.parse(text);
        setHtmlContent(parsedHtml);
        setConversionStep('preview');
      }
    };
    reader.readAsText(file);
  };

  const convertToPdf = async () => {
    if (!htmlContent || !contentRef.current) return;
    setIsLoading(true);
    try {
      if (messageRef.current) messageRef.current.innerHTML = "Generating PDF...";
      const html2pdf = (await import('html2pdf.js')).default;
      const element = contentRef.current;
      
      const opt = {
        margin:       1,
        filename:     `${mdFile?.name.replace(/\.[^/.]+$/, "")}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      
      if (messageRef.current) messageRef.current.innerHTML = "PDF Downloaded Successfully!";
    } catch (error) {
      console.error("PDF Conversion error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
    }
  };

  const convertToDocx = async () => {
    if (!htmlContent) return;
    setIsLoading(true);
    try {
      if (messageRef.current) messageRef.current.innerHTML = "Generating Word Document...";
      
      // Zero-dependency native MS Word HTML document generation
      const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      const footer = "</body></html>";
      const sourceHTML = header + htmlContent + footer;
      
      const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
      const fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = `${mdFile?.name.replace(/\.[^/.]+$/, "") || 'document'}.doc`;
      fileDownload.click();
      document.body.removeChild(fileDownload);

      if (messageRef.current) messageRef.current.innerHTML = "Word Document Downloaded Successfully!";
    } catch (error) {
      console.error("Word Conversion error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
    }
  };

  const resetConverter = () => {
    setMdFile(null);
    setHtmlContent("");
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
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
            <FiFileText className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Markdown to PDF & Word
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            Convert Markdown Files
            <span className="block text-indigo-600 dark:text-indigo-400">Instantly & Securely</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transform your raw .md files into beautifully formatted PDF or DOCX documents right in your browser. No data leaves your device.
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
                { step: 'upload', label: 'Upload .md File', icon: FiUpload },
                { step: 'preview', label: 'Preview & Export', icon: FiFileText }
              ].map(({ step, label, icon: Icon }, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    conversionStep === step 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : index === 0 && conversionStep === 'preview'
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600'
                  }`}>
                    {index === 0 && conversionStep === 'preview' ? (
                      <FiCheck className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`font-medium ${
                    conversionStep === step || (index === 0 && conversionStep === 'preview')
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {label}
                  </span>
                  {index < 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      conversionStep === 'preview'
                        ? 'bg-indigo-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 mb-12">
          {/* Action Sidebar */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl shadow-lg">
                  {conversionStep === 'preview' ? (
                    <FiFile className="h-6 w-6 text-white" />
                  ) : (
                    <FiUpload className="h-6 w-6 text-white" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {conversionStep === 'preview' ? 'Export Document' : 'Upload Markdown'}
                </h2>
              </div>

              <AnimatePresence mode="wait">
                {conversionStep === 'upload' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-1 flex flex-col justify-center space-y-6"
                  >
                    <FileUploader 
                      videoFile={mdFile} 
                      handleFileChange={handleFileChange} 
                      title="Select Document File"
                      subtitle=".md or .txt files (Max 5MB)"
                      accept={{ 'text/markdown': ['.md'], 'text/plain': ['.txt'] }}
                    />
                  </motion.div>
                )}

                {conversionStep === 'preview' && mdFile && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6 flex-1 flex flex-col"
                  >
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 w-full">
                      <div className="flex items-start sm:items-center gap-3">
                        <FiFileText className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5 sm:mt-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-green-800 dark:text-green-200">
                            File Parsed Successfully
                          </p>
                          <div className="text-sm text-green-700 dark:text-green-300 mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                            <span className="truncate block" title={mdFile.name}>{mdFile.name}</span>
                            <span className="flex-shrink-0 whitespace-nowrap opacity-80">({(mdFile.size / 1024).toFixed(2)} KB)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p ref={messageRef} className="text-center text-sm text-indigo-500 font-mono font-medium"></p>

                    <div className="space-y-3 mt-auto">
                      <button
                        onClick={convertToPdf}
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 border border-transparent cursor-pointer text-sm font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 transition-all duration-300 hover:-translate-y-1"
                      >
                        {isLoading ? "Processing..." : (
                           <><FiDownload className="w-5 h-5" /> Export as PDF</>
                        )}
                      </button>

                      <button
                        onClick={convertToDocx}
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 border border-transparent cursor-pointer text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 transition-all duration-300 hover:-translate-y-1"
                      >
                        {isLoading ? "Processing..." : (
                           <><FiDownload className="w-5 h-5" /> Export as Word (DOCX)</>
                        )}
                      </button>

                      <button
                        onClick={resetConverter}
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center gap-2 border border-transparent bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-xl text-sm transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Choose Different File
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Document Preview Area */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-white dark:bg-gray-50 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50 h-[600px] flex flex-col overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center justify-center text-sm font-medium text-gray-600">
                Document Preview
              </div>
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {htmlContent ? (
                  <div 
                    ref={contentRef}
                    className="prose prose-sm sm:prose-base prose-indigo text-gray-900 max-w-none"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <FiFileText className="h-20 w-20 mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">Your Document Preview</p>
                    <p className="text-sm">will appear here after upload</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global CSS for Markdown Preview Styling */}
        <style dangerouslySetInnerHTML={{__html: `
          .prose h1, .prose h2, .prose h3 { font-weight: bold; margin-bottom: 0.5em; margin-top: 1em; color: #111827; }
          .prose h1 { font-size: 2.25em; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
          .prose h2 { font-size: 1.5em; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3em; }
          .prose p { margin-bottom: 1em; line-height: 1.6; }
          .prose a { color: #4f46e5; text-decoration: underline; }
          .prose ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1em; }
          .prose ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1em; }
          .prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; color: #6b7280; font-style: italic; }
          .prose code { background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 0.25rem; font-family: monospace; font-size: 0.875em; }
          .prose pre { background-color: #1f2937; color: #f9fafb; padding: 1em; border-radius: 0.5rem; overflow-x: auto; margin-bottom: 1em; }
          .prose pre code { background-color: transparent; padding: 0; color: inherit; }
          .prose table { width: 100%; border-collapse: collapse; margin-bottom: 1em; }
          .prose th, .prose td { border: 1px solid #e5e7eb; padding: 0.5em 1em; text-align: left; }
          .prose th { background-color: #f9fafb; font-weight: bold; }
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        `}} />
      </div>
    </div>
  );
}

export default MdConverter;
