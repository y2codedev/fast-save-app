'use client';
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useGetT } from '@/hooks/useGetT';
import { FiUpload, FiDownload, FiCheck, FiFile, FiArchive, FiX, FiShield, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone, FileRejection } from 'react-dropzone';
import type { WorkerInputMessage, WorkerOutputMessage } from '@/workers/archive-converter.worker';

type ConversionStage = string;

const STAGES: ConversionStage[] = [
  'Loading converter',
  'Reading ZIP',
  'Extracting files',
  'Creating 7Z archive',
  'Preparing download',
  'Completed',
];

export default function ArchiveConverter(): React.ReactElement {
  const getT = useGetT();
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<'upload' | 'processing' | 'complete'>('upload');
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string>('converted.7z');
  const [resultSize, setResultSize] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<ConversionStage>('Loading converter');
  const [isBrowserSupported, setIsBrowserSupported] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const workerRef = useRef<Worker | null>(null);
  const urlRef = useRef<string | null>(null);

  // Check browser capability and device type on mount
  useEffect(() => {
    // Detect required capabilities
    const supported =
      typeof WebAssembly === 'object' &&
      typeof WebAssembly.instantiate === 'function' &&
      typeof Worker !== 'undefined' &&
      typeof Blob !== 'undefined' &&
      typeof ArrayBuffer !== 'undefined' &&
      typeof URL.createObjectURL === 'function';
    setIsBrowserSupported(supported);

    // Careful mobile device detection without relying solely on screen width
    const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTouchOnly =
      'maxTouchPoints' in navigator && navigator.maxTouchPoints > 0 && !window.matchMedia('(pointer: fine)').matches;
    const isSmallScreen = window.innerWidth <= 768;
    setIsMobile(isMobileUA || (isTouchOnly && isSmallScreen));

    // Cleanup worker and URLs on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      if (urlRef.current) {
        URL.revokeObjectURL(urlRef.current);
        urlRef.current = null;
      }
    };
  }, []);

  const maxFileSizeMB = isMobile ? 100 : 500;
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  const cleanupUrl = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
      setResultUrl(null);
    }
  }, []);

  const handleFileChange = useCallback(
    (acceptedFile: File) => {
      cleanupUrl();
      setError(null);

      // Validate ZIP format extension and basic characteristics
      if (!acceptedFile.name.toLowerCase().endsWith('.zip') && acceptedFile.type !== 'application/zip' && acceptedFile.type !== 'application/x-zip-compressed') {
        setError(getT('Wrong file format: Please select a valid .zip file.'));
        return;
      }

      if (acceptedFile.size > maxFileSizeBytes) {
        setError(
          `File exceeds maximum allowed size of ${maxFileSizeMB} MB for your device. Please choose a smaller file.`
        );
        return;
      }

      setFile(acceptedFile);
      setStep('upload');
    },
    [cleanupUrl, maxFileSizeBytes, maxFileSizeMB]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        if (rejection.errors.some(e => e.code === 'file-too-large')) {
          setError(`${getT('File exceeds maximum allowed size of')} ${maxFileSizeMB} MB ${getT('for your device.')}`);
        } else {
          setError(getT('Wrong file format: Please select a valid .zip archive.'));
        }
        return;
      }
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange, maxFileSizeMB]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
    },
    maxSize: maxFileSizeBytes,
  });

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const handleCancel = useCallback(() => {
    terminateWorker();
    setStep('upload');
    setCurrentStage('Loading converter');
  }, [terminateWorker]);

  const handleConvert = async (): Promise<void> => {
    if (!file) return;
    if (!isBrowserSupported) {
      setError('{getT("Your browser does not support browser-based archive conversion. Please update your browser and try again.")}');
      return;
    }

    cleanupUrl();
    setError(null);
    setStep('processing');
    setCurrentStage('Loading converter');

    try {
      // Terminate any existing worker before starting a fresh conversion
      terminateWorker();

      const worker = new Worker(new URL('../../workers/archive-converter.worker', import.meta.url), { type: 'module' });
      workerRef.current = worker;

      worker.onmessage = (event: MessageEvent<WorkerOutputMessage>) => {
        const data = event.data;
        if (data.type === 'status') {
          setCurrentStage(data.stage);
        } else if (data.type === 'complete') {
          setCurrentStage('Completed');
          const blob = new Blob([data.outputBuffer], { type: 'application/x-7z-compressed' });
          const url = URL.createObjectURL(blob);
          urlRef.current = url;
          setResultUrl(url);
          setResultName(data.outputName);
          setResultSize(blob.size);
          setStep('complete');
          // Terminate worker immediately after task completes to release WASM memory
          terminateWorker();
        } else if (data.type === 'error') {
          setError(data.message || getT('An error occurred during conversion.'));
          setStep('upload');
          terminateWorker();
        }
      };

      worker.onerror = (event) => {
        console.error('Archive worker failed:', event.message, event.filename, event.lineno);
        setError('An unexpected error occurred during worker execution. Please try again.');
        setStep('upload');
        terminateWorker();
      };

      // Read file into ArrayBuffer and transfer ownership to worker without making extra memory copies
      const arrayBuffer = await file.arrayBuffer();
      const message: WorkerInputMessage = {
        type: 'convert',
        inputBuffer: arrayBuffer,
        inputName: file.name,
        targetFormat: '7z',
      };

      worker.postMessage(message, [arrayBuffer]);
    } catch (err: unknown) {
      terminateWorker();
      const msg = err instanceof Error ? err.message : String(err);
      setError(`${getT('Failed to initiate conversion:')} ${msg}`);
      setStep('upload');
    }
  };

  const resetConverter = useCallback(() => {
    terminateWorker();
    cleanupUrl();
    setFile(null);
    setStep('upload');
    setError(null);
    setCurrentStage('Loading converter');
  }, [terminateWorker, cleanupUrl]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const currentStageIndex = STAGES.indexOf(currentStage);

  return (
    <div className="w-full py-2">
      <div className="relative max-w-5xl mx-auto w-full">
        {/* Title & Privacy Badge Section */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center whitespace-nowrap gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3 border border-gray-200 dark:border-gray-700 shadow-sm">
            <FiArchive className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
              100% Client-Side Archive Converter
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-3">
            Convert ZIP <span className="text-indigo-600 dark:text-indigo-400">to 7Z</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-3">
            Convert ZIP archives to the highly efficient 7Z compression format without uploading anything to a server.
          </p>

          {/* Prominent Privacy Message */}
          <div className="inline-flex items-center whitespace-nowrap gap-2 px-4 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm font-medium shadow-sm">
            <FiShield className="w-4 h-4 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
            <span>Your files never leave your device. Conversion happens entirely inside your browser.</span>
          </div>
        </motion.div>

        {/* Unsupported Browser Alert */}
        {!isBrowserSupported && (
          <div
            className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 inline-flex items-center whitespace-nowrap gap-3 text-amber-900 dark:text-amber-200"
            role="alert"
            aria-live="assertive"
          >
            <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-sm sm:text-base font-medium">
              Your browser does not support browser-based archive conversion. Please update your browser and try again.
            </p>
          </div>
        )}

        {/* Step Indicators */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              {[
                { s: 'upload', label: getT('Select ZIP'), icon: FiUpload },
                { s: 'processing', label: getT('Convert to 7Z'), icon: FiArchive },
                { s: 'complete', label: getT('Download'), icon: FiDownload },
              ].map(({ s, label, icon: Icon }, index) => (
                <div key={s} className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                      step === s
                        ? 'bg-gradient-to-br from-indigo-600 to-violet-600 border-transparent text-white shadow-md'
                        : step === 'complete' && s === 'complete'
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-transparent text-white shadow-md'
                        : index === 0 || (step === 'processing' && s === 'processing') || step === 'complete'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-400 dark:text-indigo-400'
                        : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600'
                    }`}
                  >
                    {step === 'complete' && s === 'complete' ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`text-sm sm:text-base font-medium ${
                      step === s || (step === 'complete' && s === 'complete')
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {label}
                  </span>
                  {index < 2 && (
                    <div
                      className={`w-6 sm:w-8 h-0.5 mx-2 sm:mx-4 hidden sm:block ${
                        index === 0 || step === 'processing' || step === 'complete'
                          ? 'bg-indigo-600 dark:bg-indigo-400'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel - Converter Workspace */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/60 p-6 sm:p-8 h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {step === 'upload' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <label className="block sm:text-sm text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        {getT("Upload ZIP Archive")}
                      </label>
                      <div
                        {...getRootProps()}
                        role="button"
                        aria-label="Drag and drop ZIP file area or click to browse"
                        tabIndex={0}
                        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                          isDragActive
                            ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-900/20 shadow-inner'
                            : 'border-gray-300 dark:border-gray-600 bg-gray-50/80 dark:bg-gray-700/40 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/60'
                        }`}
                      >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md inline-flex items-center whitespace-nowrap justify-center text-white">
                            <FiUpload className="text-2xl sm:text-3xl" />
                          </div>
                          {file ? (
                            <div className="space-y-1 text-center">
                              <p className="font-bold text-indigo-600 dark:text-indigo-400 text-base sm:text-lg break-all">
                                {file.name}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                {getT("Drag & drop a .zip file here, or")}{' '}
                                <span className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300">
                                  browse
                                </span>
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">
                                {getT('Max size:')} {maxFileSizeMB} MB ({isMobile ? getT('Mobile') : getT('Desktop')})
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Selected File Details & Large File Warning */}
                    {file && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-gray-700/50 border border-indigo-100 dark:border-gray-600 inline-flex items-center whitespace-nowrap justify-between">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FiFile className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                            <div className="truncate">
                              <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              resetConverter();
                            }}
                            aria-label="Remove selected file"
                            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Large File Warning */}
                        {file.size > 50 * 1024 * 1024 && (
                          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-amber-800 dark:text-amber-300 text-xs sm:text-sm">
                            <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                            <span>
                              Large files may require significant memory and processing time. Keep this tab open during
                              conversion.
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        aria-live="assertive"
                        className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 text-red-700 dark:text-red-300 text-sm"
                      >
                        <FiAlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 dark:text-red-400 mt-0.5" />
                        <span className="font-medium">{error}</span>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="button"
                        onClick={handleConvert}
                        disabled={!file || !isBrowserSupported}
                        aria-label="Convert ZIP to 7Z"
                        className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 text-base shadow-md ${
                          file && isBrowserSupported
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 hover:shadow-lg active:scale-[0.99] cursor-pointer'
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <FiArchive className="w-5 h-5" />
                        Convert to 7Z
                      </button>
                      {file && (
                        <button
                          type="button"
                          onClick={resetConverter}
                          aria-label="Choose a different file"
                          className=" inline-flex items-center whitespace-nowrap justify-center gap-2 py-4 px-6 rounded-xl font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                        >
                          <FiUpload className="w-5 h-5" />
                          Choose Different File
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col items-center justify-center py-8 space-y-8 flex-1"
                  >
                    {/* Indeterminate Progress Animated Bar & Spinner */}
                    <div className="w-full flex flex-col items-center space-y-4">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <FiLoader className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin" />
                      </div>
                      <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 rounded-full animate-[pulse_1.5s_ease-in-out_infinite] transform translate-x-full duration-1000 transition-transform" style={{ width: '60%' }} />
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900 dark:text-white mb-2" aria-live="polite">
                        {currentStage}...
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getT("Please do not close or reload this tab while conversion is in progress.")}
                      </p>
                    </div>

                    {/* Processing Stage Checklist */}
                    <div className="w-full max-w-xs space-y-2.5 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-200/60 dark:border-gray-700">
                      {STAGES.map((stage, i) => {
                        const isDone = i < currentStageIndex || currentStageIndex === STAGES.length - 1;
                        const isCurrent = i === currentStageIndex && currentStageIndex !== STAGES.length - 1;

                        return (
                          <div key={stage} className="flex items-center gap-3 text-sm">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                isDone
                                  ? 'bg-green-500 text-white'
                                  : isCurrent
                                  ? 'border-2 border-indigo-600 dark:border-indigo-400 animate-pulse'
                                  : 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800'
                              }`}
                            >
                              {isDone && <FiCheck className="w-3 h-3 stroke-[3]" />}
                              {isCurrent && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
                            </div>
                            <span
                              className={`${
                                isDone
                                  ? 'text-gray-800 dark:text-gray-200 font-medium'
                                  : isCurrent
                                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                            >
                              {stage}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Cancel Button */}
                    <button
                      type="button"
                      onClick={handleCancel}
                      aria-label="Cancel conversion"
                      className=" inline-flex items-center whitespace-nowrap gap-2 py-3 px-6 rounded-xl font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors cursor-pointer text-sm"
                    >
                      <FiX className="w-4 h-4" />
                      Cancel Conversion
                    </button>
                  </motion.div>
                )}

                {step === 'complete' && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col items-center justify-center py-10 space-y-6 flex-1"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 inline-flex items-center whitespace-nowrap justify-center shadow-lg text-white">
                      <FiCheck className="w-10 h-10 stroke-[2.5]" />
                    </div>

                    <div className="text-center space-y-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{getT("Conversion Complete!")}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {getT("Your file was successfully converted to 7Z archive format.")}
                      </p>
                    </div>

                    {/* Result Summary Box */}
                    <div className="w-full max-w-sm p-4 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600/60 inline-flex items-center whitespace-nowrap justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FiArchive className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <div className="truncate">
                          <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{resultName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(resultSize)}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs font-semibold">
                        Ready
                      </span>
                    </div>

                    {/* Download Button */}
                    <div className="w-full max-w-sm space-y-3 pt-2">
                      {resultUrl && (
                        <a
                          href={resultUrl}
                          download={resultName}
                          role="button"
                          aria-label={`Download ${resultName}`}
                          className="w-full inline-flex items-center whitespace-nowrap justify-center gap-2.5 py-4 px-8 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                        >
                          <FiDownload className="w-5 h-5" />
                          Download .7z Archive
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={resetConverter}
                        aria-label="Convert another file"
                        className="w-full inline-flex items-center whitespace-nowrap justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer text-sm"
                      >
                        <FiUpload className="w-4 h-4" />
                        Convert Another File
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Panel - Features & Technical Explainer */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-md border border-gray-200 dark:border-gray-700/60 p-6 sm:p-8 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
                  Why Use Client-Side 7Z?
                </h3>

                {[
                  {
                    title: 'Ultimate Data Privacy',
                    desc: 'No servers, no cloud storage, no logs. Your files are processed entirely within a browser Web Worker sandbox.',
                  },
                  {
                    title: 'High Compression Ratio',
                    desc: '7Z archives powered by LZMA compression drastically reduce file sizes compared to standard ZIP archives.',
                  },
                  {
                    title: 'Unicode & Folder Fidelity',
                    desc: 'Preserves complete directory hierarchies and special character filenames exactly as originally archived.',
                  },
                  {
                    title: 'Zero Memory Leaks',
                    desc: 'Automatically revokes memory allocations, unmounts virtual files, and terminates workers upon task completion.',
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 inline-flex items-center whitespace-nowrap justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400 font-bold text-sm shadow-sm">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50/80 to-violet-50/80 dark:from-indigo-950/40 dark:to-violet-950/40 rounded-xl border border-indigo-100 dark:border-indigo-800/50 text-xs">
                  <p className="font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wide mb-1.5">
                    System Specifications:
                  </p>
                  <ul className="space-y-1.5 text-indigo-800 dark:text-indigo-300 font-medium">
                    <li>• Engine: WebAssembly (7z-wasm / Emscripten)</li>
                    <li>• Concurrency: Non-blocking Web Worker</li>
                    <li>• Max Desktop Limit: 500 MB</li>
                    <li>• Max Mobile Limit: 100 MB</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700/60 mt-6">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Compatible with Chrome, Edge, Firefox, and Safari on desktop and mobile devices.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
