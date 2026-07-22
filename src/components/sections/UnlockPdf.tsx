'use client';

import React, { useState, useRef } from 'react';
import { FiUnlock, FiUpload, FiDownload, FiCheck, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { decryptPDF } from '@pdfsmaller/pdf-decrypt';

export default function UnlockPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }
    setFile(selectedFile);
    setError(null);
    setUnlockedUrl(null);
    setPassword('');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUnlock = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);
      
      // Attempt to decrypt the PDF
      const unlockedBytes = await decryptPDF(pdfBytes, password);
      
      const blob = new Blob([unlockedBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setUnlockedUrl(url);
    } catch (err: any) {
      console.error('Failed to unlock PDF:', err);
      if (err.message && err.message.toLowerCase().includes('password')) {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Failed to unlock PDF. The file might be corrupted or uses unsupported encryption.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setPassword('');
    setShowPassword(false);
    setUnlockedUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="text-center mb-10">
        <motion.div 
          className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiUnlock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Unlock PDF
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Remove password protection from your PDF files instantly in your browser.
        </motion.p>
      </div>

      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch max-w-5xl mx-auto">
        {/* Left Panel: Upload */}
        <motion.div 
          className="relative lg:col-span-8 flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-white/20 dark:border-gray-700/50 p-6 sm:p-8 min-h-[400px] flex-1 flex flex-col">
            
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
              
            {!file ? (
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer flex-1 flex flex-col items-center justify-center min-h-[300px] ${
                  isDragActive 
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/10' 
                    : 'border-gray-300 hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50 dark:border-gray-600 dark:bg-gray-800/50'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="bg-white dark:bg-gray-700 p-4 rounded-full shadow-sm mb-4 inline-block">
                  <FiUpload className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Select PDF File</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Upload a password-protected PDF file.</p>
              </div>
            ) : (
              <div className="flex flex-col h-full flex-1 items-center justify-center text-center">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 w-full max-w-sm mb-6">
                  <FiLock className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button 
                  onClick={resetState}
                  className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                >
                  Remove File
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Panel: Settings & Unlock */}
        <motion.div 
          className="relative lg:col-span-4 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-white/20 dark:border-gray-700/50 p-6 flex-1 flex flex-col">
            
            {!unlockedUrl ? (
               <div className="flex flex-col flex-1">
                {/* PDF Settings Header */}
                <div className="flex items-center gap-3 mb-6 text-gray-900 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-700/50 pb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-lg">
                    <FiUnlock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  Unlock Settings
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <FiLock className="h-4 w-4 text-gray-400" /> Password
                  </label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter PDF password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/50">
                    {error}
                  </div>
                )}
                
                <button
                  onClick={handleUnlock}
                  disabled={!file || isProcessing}
                  className={`w-full inline-flex mt-auto items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg ${
                    file 
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white hover:-translate-y-1'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 shadow-none'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <FiUnlock className="h-5 w-5" />
                      Unlock PDF
                    </>
                  )}
                </button>
               </div>
            ) : (
              <div className="flex flex-col h-full flex-1">
                <div className="flex items-center justify-center gap-3 mb-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 py-3 px-4 rounded-xl border border-green-200 dark:border-green-800">
                  <FiCheck className="w-5 h-5" />
                  <span className="font-medium">Success! PDF Unlocked.</span>
                </div>
                
                <div className="flex-1 flex items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 mb-6">
                   <p className="text-gray-500 dark:text-gray-400">
                      Your PDF is now free of password protection and ready to download.
                   </p>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                  <a
                    href={unlockedUrl}
                    download={`unlocked_${file?.name || 'document.pdf'}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <FiDownload className="h-5 w-5" />
                    Download PDF
                  </a>
                  
                  <button 
                    onClick={resetState}
                    className="w-full py-3.5 px-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-xl transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    Unlock Another PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* How to Use Section */}
      <motion.div 
        className="mt-16 mb-8 text-left max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to remove PDF password?</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Upload Protected PDF</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click the upload area or drag & drop your encrypted PDF file. Your file never leaves your device as the decryption happens locally.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Enter Password</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Type the correct password for the PDF file into the settings box on the right. This is required to decrypt the document.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Unlock & Download</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Click 'Unlock PDF'. We will remove the password protection entirely, allowing you to download an unlocked version of your PDF.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
