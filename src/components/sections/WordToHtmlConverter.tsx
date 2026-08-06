"use client";

import { useRef, useState } from "react";
import { FiUpload, FiCode, FiDownload, FiCheck, FiFile, FiCopy, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

export default function WordToHtmlConverter() {
  const [isLoading, setIsLoading] = useState(false);
  const [htmlBlobURL, setHtmlBlobURL] = useState<string | null>(null);
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [conversionStep, setConversionStep] = useState<'upload' | 'convert' | 'complete'>('upload');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
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
    setHtmlBlobURL(null);
    setHtmlCode("");
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

  const convertToHtml = async () => {
    if (!wordFile) return;
    setIsLoading(true);

    if (messageRef.current) {
      messageRef.current.style.color = '#4f46e5';
      messageRef.current.innerHTML = "Parsing Microsoft Word document styling & formatting...";
    }

    try {
      const arrayBuffer = await wordFile.arrayBuffer();
      
      const mammoth = await import("mammoth");
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const bodyContent = result.value || "<p>No readable text or tables found in document.</p>";

      const titleName = wordFile.name.replace(/\.[^/.]+$/, "");
      
      const completeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titleName} - Document</title>
  <style>
    :root {
      --primary: #4f46e5;
      --text: #1f2937;
      --bg: #f9fafb;
      --card-bg: #ffffff;
      --border: #e5e7eb;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.65;
      color: var(--text);
      background-color: var(--bg);
      margin: 0;
      padding: 40px 20px;
    }
    .document-container {
      max-width: 850px;
      margin: 0 auto;
      background: var(--card-bg);
      padding: 50px 60px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid var(--border);
    }
    h1, h2, h3, h4, h5, h6 {
      color: #111827;
      margin-top: 1.4em;
      margin-bottom: 0.6em;
      font-weight: 700;
    }
    h1 { font-size: 2.25rem; border-bottom: 2px solid var(--border); padding-bottom: 0.3em; }
    h2 { font-size: 1.75rem; }
    p { margin-bottom: 1.25em; font-size: 1.05rem; }
    ul, ol { margin-bottom: 1.25em; padding-left: 1.5em; }
    li { margin-bottom: 0.5em; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 2em 0;
    }
    th, td {
      border: 1px solid var(--border);
      padding: 12px 16px;
      text-align: left;
    }
    th {
      background-color: #f3f4f6;
      font-weight: 600;
    }
    tr:nth-child(even) { background-color: #f9fafb; }
    blockquote {
      border-left: 4px solid var(--primary);
      margin: 1.5em 0;
      padding: 0.5em 0 0.5em 1.5em;
      background: #eef2ff;
      color: #3730a3;
      border-radius: 0 8px 8px 0;
    }
    @media print {
      body { background: transparent; padding: 0; }
      .document-container { box-shadow: none; border: none; padding: 0; width: 100%; max-width: none; }
    }
  </style>
</head>
<body>
  <main class="document-container">
    ${bodyContent}
  </main>
</body>
</html>`;

      const htmlBlob = new Blob([completeHtml], { type: "text/html" });
      const url = URL.createObjectURL(htmlBlob);
      setHtmlBlobURL(url);
      setHtmlCode(completeHtml);
      setConversionStep('complete');
      if (messageRef.current) messageRef.current.innerHTML = "";
    } catch (error) {
      console.error("Word to HTML error:", error);
      if (messageRef.current) {
        messageRef.current.style.color = "#ef4444";
        messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : "Conversion failed."}`;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetConverter = () => {
    if (htmlBlobURL && htmlBlobURL.startsWith("blob:")) {
      URL.revokeObjectURL(htmlBlobURL);
    }
    setWordFile(null);
    setHtmlBlobURL(null);
    setHtmlCode("");
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
            <FiCode className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Browser-Based HTML Engine
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Word to <span className="text-indigo-600 dark:text-indigo-400">HTML Converter</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Convert Microsoft Word documents (.docx, .doc) into clean, responsive, and ready-to-publish HTML code instantly inside your browser.
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
                { step: 'upload', label: 'Upload Word', icon: FiUpload },
                { step: 'convert', label: 'Generate HTML', icon: FiCode },
                { step: 'complete', label: 'Preview & Download', icon: FiDownload },
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
                        Upload Microsoft Word File (.docx or .doc)
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
                            <span className="font-medium text-gray-700 dark:text-gray-300">Drag & drop your Word file or</span>{' '}
                            <span className="text-indigo-600 dark:text-indigo-400 underline">browse</span>
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            Supported formats: DOCX & DOC (Max 30MB)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 py-2.5 px-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                      ⚡ 100% Client-Side & Private • Zero Server File Storage
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
                        onClick={convertToHtml}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 border border-transparent cursor-pointer text-sm font-bold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-6 transition-all duration-300 shadow-md"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Generating HTML...
                          </>
                        ) : (
                          <>
                            <FiCode className="w-4 h-4" />
                            Convert to HTML Now
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

                {conversionStep === 'complete' && htmlBlobURL && (
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
                            HTML Ready for Publishing!
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            Your Word document has been converted to responsive, professional HTML code.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={htmlBlobURL}
                        download={`${wordFile?.name.replace(/\.[^/.]+$/, "") || 'document'}.html`}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:-translate-y-0.5 text-center"
                      >
                        <FiDownload className="h-5 w-5" />
                        Download .html File
                      </a>
                      <button
                        onClick={copyToClipboard}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer text-center"
                      >
                        <FiCopy className="h-5 w-5" />
                        {copied ? "Copied to Clipboard!" : "Copy HTML Code"}
                      </button>
                    </div>

                    <button
                      onClick={resetConverter}
                      className="w-full inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      Convert Another File
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Panel: Live Preview & HTML Code Viewer */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-6 h-full flex flex-col min-h-[450px]">
              {htmlBlobURL ? (
                <div className="flex flex-col h-full space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab('preview')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeTab === 'preview'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <FiEye className="w-4 h-4" /> Live Web Preview
                      </button>
                      <button
                        onClick={() => setActiveTab('code')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeTab === 'code'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <FiCode className="w-4 h-4" /> Raw HTML Source
                      </button>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{(htmlCode.length / 1024).toFixed(1)} KB</span>
                  </div>

                  <div className="flex-1 w-full rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    {activeTab === 'preview' ? (
                      <iframe
                        srcDoc={htmlCode}
                        title="Converted HTML Preview"
                        className="w-full h-[380px] bg-white border-0"
                        sandbox="allow-same-origin"
                      />
                    ) : (
                      <div className="p-4 h-[380px] overflow-y-auto font-mono text-xs text-indigo-300 bg-gray-950 rounded-xl leading-relaxed select-all">
                        <pre className="whitespace-pre-wrap break-all">{htmlCode}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full space-y-6 text-center py-12">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 inline-flex items-center whitespace-nowrap justify-center">
                    <FiCode className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Interactive Preview & Code Viewer</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mt-2">
                      Once converted, you can preview your webpage layout directly here and copy the generated HTML code with one click.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
