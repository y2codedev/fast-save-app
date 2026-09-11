"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FiUpload, FiDownload, FiCheck, FiFile, FiArchive, FiLock, FiUnlock, FiTrash2, FiPlus, FiEye, FiEyeOff, FiLayers } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useTranslations } from 'next-intl';
import { ZIP_TOOL_CONFIGS } from '@/lib/zip-tools';

export { ZIP_TOOL_CONFIGS } from '@/lib/zip-tools';

export default function ZipToolConverter({ slug }: { slug: string }) {
  const t = useTranslations('Navigation');
  const guidance = useTranslations('SiteGuidance');
  const config = ZIP_TOOL_CONFIGS[slug];
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<'upload' | 'processing' | 'complete'>('upload');
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState<string>('Initializing engine...');

  // Security & Split options
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [splitSize, setSplitSize] = useState<string>('5m');
  const [splitResults, setSplitResults] = useState<{ name: string; url: string; size: number }[]>([]);

  // Edit ZIP state
  const [editableFiles, setEditableFiles] = useState<{ name: string; content: Blob; size: number }[]>([]);
  const [isEditingZip, setIsEditingZip] = useState<boolean>(false);

  const isMultiFile = slug === 'create-zip' || slug === 'merge-zip';

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
      if (resultUrl && resultUrl.startsWith('blob:')) {
        URL.revokeObjectURL(resultUrl);
      }
      splitResults.forEach((res) => {
        if (res.url.startsWith('blob:')) URL.revokeObjectURL(res.url);
      });
    };
  }, [resultUrl, splitResults]);

  const handleFileChange = useCallback(async (acceptedFile: File) => {
    setFile(acceptedFile);
    setStep('upload');
    setError(null);
    setResultUrl(null);
    setResultName('');
    setSplitResults([]);
    setPassword('');
    setIsEditingZip(false);

    if (slug === 'edit-zip') {
      try {
        const JSZip = (await import('jszip')).default;
        const zip = await JSZip.loadAsync(acceptedFile);
        const fileList: { name: string; content: Blob; size: number }[] = [];
        for (const [name, entry] of Object.entries(zip.files)) {
          if (!entry.dir) {
            const blob = await entry.async('blob');
            fileList.push({ name, content: blob, size: blob.size });
          }
        }
        setEditableFiles(fileList);
        setIsEditingZip(true);
      } catch (err) {
        setError('Failed to parse ZIP archive contents. Please make sure it is a valid, unencrypted ZIP file.');
      }
    }
  }, [slug]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0 || acceptedFiles.some(file => file.size === 0)) {
      setError(guidance('fileError'));
      return;
    }
    setError(null);
    if (isMultiFile) {
      setFiles(prev => [...prev, ...acceptedFiles]);
    } else if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, [handleFileChange, isMultiFile, guidance]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: isMultiFile,
    accept: config?.acceptMime,
    maxSize: 100 * 1024 * 1024,
  });

  const handleAddFilesToEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).map((f) => ({
      name: f.name,
      content: f as unknown as Blob,
      size: f.size,
    }));
    setEditableFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDeleteEditFile = (index: number) => {
    setEditableFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleConvert = async () => {
    const hasFiles = isMultiFile ? files.length > 0 : !!file;
    if (!hasFiles) return;

    setStep('processing');
    setError(null);
    setProgress(5);
    setCurrentStage('Initializing processing engine...');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 8;
      });
    }, 350);

    try {
      // 1. Create ZIP
      if (slug === 'create-zip') {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        for (const f of files) {
          zip.file(f.name, f);
        }
        const blob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
          setProgress(metadata.percent);
        });
        clearInterval(interval);
        setProgress(100);
        setResultUrl(URL.createObjectURL(blob));
        setResultName('created_archive.zip');
        setStep('complete');
        return;
      }

      // 2. Unzip & View ZIP
      if (slug === 'unzip-zip' || slug === 'view-zip') {
        const JSZip = (await import('jszip')).default;
        const zip = await JSZip.loadAsync(file!);
        clearInterval(interval);
        setProgress(100);

        if (slug === 'view-zip') {
          const fileList = await Promise.all(Object.keys(zip.files).map(async (name) => {
            const entry = zip.files[name];
            return {
              name,
              dir: entry.dir,
              size: entry.dir ? 0 : (await entry.async('uint8array')).byteLength,
            };
          }));
          setResultUrl(JSON.stringify(fileList));
          setStep('complete');
          return;
        }

        const unzippedZip = new JSZip();
        for (const [name, entry] of Object.entries(zip.files)) {
          if (!entry.dir) {
            const content = await entry.async('blob');
            unzippedZip.file(name, content);
          }
        }
        const blob = await unzippedZip.generateAsync({ type: 'blob' });
        setResultUrl(URL.createObjectURL(blob));
        setResultName('extracted_files.zip');
        setStep('complete');
        return;
      }

      // 3. Merge ZIP
      if (slug === 'merge-zip') {
        const JSZip = (await import('jszip')).default;
        const mergedZip = new JSZip();
        for (const f of files) {
          const zip = await JSZip.loadAsync(f);
          for (const [name, entry] of Object.entries(zip.files)) {
            if (!entry.dir) {
              const content = await entry.async('blob');
              mergedZip.file(name, content);
            }
          }
        }
        const blob = await mergedZip.generateAsync({ type: 'blob' }, (metadata) => {
          setProgress(metadata.percent);
        });
        clearInterval(interval);
        setProgress(100);
        setResultUrl(URL.createObjectURL(blob));
        setResultName('merged_archive.zip');
        setStep('complete');
        return;
      }

      // 4. Edit ZIP
      if (slug === 'edit-zip') {
        if (editableFiles.length === 0) {
          clearInterval(interval);
          setError('Archive is currently empty. Please add at least one file before saving.');
          setStep('upload');
          return;
        }
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();
        for (const ef of editableFiles) {
          zip.file(ef.name, ef.content);
        }
        const blob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
          setProgress(metadata.percent);
        });
        clearInterval(interval);
        setProgress(100);
        setResultUrl(URL.createObjectURL(blob));
        setResultName(file ? `${file.name.replace(/\.zip$/i, '')}_edited.zip` : 'edited_archive.zip');
        setStep('complete');
        return;
      }

      // 5. ALL Archive Converters, Protect ZIP, Unlock ZIP, Split ZIP -> WebAssembly Web Worker
      if (slug.includes('-to-') || slug === 'protect-zip' || slug === 'unlock-zip-file' || slug === 'split-zip') {
        if (!file) return;

        if ((slug === 'protect-zip' || slug === 'unlock-zip-file') && !password.trim()) {
          clearInterval(interval);
          setError(
            slug === 'protect-zip'
              ? 'Please specify an encryption password to protect your archive.'
              : 'Please enter the password required to unlock this archive.'
          );
          setStep('upload');
          return;
        }

        if (workerRef.current) {
          workerRef.current.terminate();
        }

        const worker = new Worker(new URL('../../workers/archive-converter.worker', import.meta.url), { type: 'module' });
        workerRef.current = worker;

        worker.onmessage = (event) => {
          const data = event.data;
          if (data.type === 'status') {
            setCurrentStage(data.stage);
            setProgress((prev) => Math.min(92, prev + 14));
          } else if (data.type === 'complete') {
            clearInterval(interval);
            setProgress(100);

            if (data.splitFiles && data.splitFiles.length > 0) {
              const urls = data.splitFiles.map((sp: { name: string; buffer: ArrayBuffer }) => {
                const b = new Blob([sp.buffer], { type: 'application/octet-stream' });
                return { name: sp.name, url: URL.createObjectURL(b), size: sp.buffer.byteLength };
              });
              setSplitResults(urls);
              setResultUrl(urls[0].url);
              setResultName(urls[0].name);
            } else {
              const blob = new Blob([data.outputBuffer], { type: 'application/octet-stream' });
              const url = URL.createObjectURL(blob);
              setResultUrl(url);
              setResultName(data.outputName);
              setSplitResults([]);
            }
            setStep('complete');
            worker.terminate();
            workerRef.current = null;
          } else if (data.type === 'error') {
            clearInterval(interval);
            setError(data.message || 'An error occurred during archive conversion.');
            setStep('upload');
            worker.terminate();
            workerRef.current = null;
          }
        };

        worker.onerror = (err) => {
          clearInterval(interval);
          console.error('Worker execution error:', err);
          setError('An unexpected browser processing error occurred while converting.');
          setStep('upload');
          if (workerRef.current) {
            workerRef.current.terminate();
            workerRef.current = null;
          }
        };

        const arrayBuffer = await file.arrayBuffer();
        worker.postMessage(
          {
            type: 'convert',
            inputBuffer: arrayBuffer,
            inputName: file.name,
            targetFormat: slug === 'protect-zip' || slug === 'unlock-zip-file' || slug === 'split-zip' ? 'zip' : config.toFormat.toLowerCase(),
            compressPassword: slug === 'protect-zip' ? password : undefined,
            extractPassword: slug === 'unlock-zip-file' ? password : undefined,
            splitSize: slug === 'split-zip' ? splitSize : undefined,
          },
          [arrayBuffer]
        );
        return;
      }

      // Default fallback
      clearInterval(interval);
      setProgress(100);
      setError('Unsupported operation.');
      setStep('upload');
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || 'An error occurred during processing');
      setStep('upload');
    }
  };

  const resetConverter = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
    if (resultUrl && resultUrl.startsWith('blob:')) {
      URL.revokeObjectURL(resultUrl);
    }
    splitResults.forEach((res) => {
      if (res.url.startsWith('blob:')) URL.revokeObjectURL(res.url);
    });
    setFile(null);
    setFiles([]);
    setStep('upload');
    setError(null);
    setResultUrl(null);
    setResultName('');
    setSplitResults([]);
    setPassword('');
    setIsEditingZip(false);
    setProgress(0);
    setCurrentStage('Initializing engine...');
  };

  if (!config) return null;

  const hasFiles = isMultiFile ? files.length > 0 : !!file;

  return (
    <div className="w-full py-2">
      <div className="relative max-w-5xl mx-auto w-full">
        {/* Title Section */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center whitespace-nowrap gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3 border border-gray-200 dark:border-gray-700 shadow-sm">
            {slug === 'protect-zip' ? (
              <FiLock className="h-4 w-4 text-indigo-600" />
            ) : slug === 'unlock-zip-file' ? (
              <FiUnlock className="h-4 w-4 text-indigo-600" />
            ) : slug === 'split-zip' ? (
              <FiLayers className="h-4 w-4 text-indigo-600" />
            ) : (
              <FiArchive className="h-4 w-4 text-indigo-600" />
            )}
            <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
              {config.toolName}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-3 tracking-tight">
            {config.fromFormat}{" "}
            <span className="text-indigo-600 dark:text-indigo-400">to {config.toFormat}</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        {/* Step Indicators */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-sm border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              {[
                { s: 'upload', label: tCommon('ztcUpload'), icon: FiUpload },
                { s: 'processing', label: tCommon('ztcProcess'), icon: FiArchive },
                { s: 'complete', label: tCommon('ztcDownload'), icon: FiDownload },
              ].map(({ s, label, icon: Icon }, index) => (
                <div key={s} className="flex items-center gap-3 sm:gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                    step === s
                      ? 'bg-gradient-to-br from-indigo-500 to-violet-500 border-transparent text-white shadow-md'
                      : step === 'complete' && s === 'complete'
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-transparent text-white shadow-md'
                        : index === 0 || (step === 'processing' && s === 'processing') || (step === 'complete')
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-400 dark:text-indigo-400'
                          : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600'
                  }`}>
                    {step === 'complete' && s === 'complete' ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-sm sm:text-base font-medium ${
                    step === s || (step === 'complete' && s === 'complete')
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {label}
                  </span>
                  {index < 2 && (
                    <div className={`w-6 sm:w-8 h-0.5 mx-2 sm:mx-4 ${
                      index === 0 || step === 'processing' || step === 'complete'
                        ? 'bg-indigo-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-8 h-full">
              <AnimatePresence mode="wait">
                {step === 'upload' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Drop Zone */}
                    <div className="mb-6">
                      <label className="block sm:text-sm text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {isMultiFile ? tCommon('ztcUploadFiles') : tCommon('ztcUploadFormatFile', { format: config.fromFormat })}
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
                            {isMultiFile && files.length > 0 ? (
                              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                                {tCommon('ztcFilesSelected', { count: files.length })}
                              </span>
                            ) : file ? (
                              <span className="font-medium text-indigo-600 dark:text-indigo-400 truncate max-w-xs">
                                {file.name.length > 35 ? file.name.slice(0, 35) + "..." : file.name}
                              </span>
                            ) : (
                              <>
                                <span className="font-medium text-gray-700 dark:text-gray-300">{tCommon('ztcDragDrop')}</span>{' '}
                                <span className="text-indigo-600 dark:text-indigo-400 underline">{tCommon('ztcBrowse')}</span>
                              </>
                            )}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {tCommon('ztcSupported', { format: config.fromFormat })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* File list for multi-file modes */}
                    {isMultiFile && files.length > 0 && (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {files.map((f, i) => (
                          <div key={i} className=" inline-flex items-center whitespace-nowrap justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <FiFile className="text-indigo-500" />
                              <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[200px]">{f.name}</span>
                            </div>
                            <span className="text-xs text-gray-400">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Password input for Protect ZIP and Unlock ZIP */}
                    {file && (slug === 'protect-zip' || slug === 'unlock-zip-file') && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {slug === 'protect-zip' ? 'Set AES-256 Encryption Password' : 'Enter Decryption Password'}
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={slug === 'protect-zip' ? 'Create a secure password...' : 'Enter password to unlock archive...'}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-11 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {slug === 'protect-zip' ? '🔒 Password will be permanently required to unzip these files.' : '🔓 Password will be verified locally inside your browser.'}
                        </p>
                      </motion.div>
                    )}

                    {/* Split size selector for Split ZIP */}
                    {file && slug === 'split-zip' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Select Maximum Volume Part Size
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {[
                            { label: '5 MB', val: '5m' },
                            { label: '10 MB', val: '10m' },
                            { label: '25 MB', val: '25m' },
                            { label: '50 MB', val: '50m' },
                          ].map((opt) => (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => setSplitSize(opt.val)}
                              className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                                splitSize === opt.val
                                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                                  : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ✂️ Your archive will be sliced into modular `.001`, `.002` volumes matching the selected size limit.
                        </p>
                      </motion.div>
                    )}

                    {/* Interactive File Editor for Edit ZIP */}
                    {file && slug === 'edit-zip' && isEditingZip && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white">Archive File Manager ({editableFiles.length})</h4>
                          <label className=" inline-flex items-center whitespace-nowrap gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold cursor-pointer transition-colors">
                            <FiPlus className="w-4 h-4" /> Add More Files
                            <input type="file" multiple className="hidden" onChange={handleAddFilesToEdit} />
                          </label>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl max-h-56 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50 p-2">
                          {editableFiles.map((item, idx) => (
                            <div key={idx} className=" inline-flex items-center whitespace-nowrap justify-between py-2 px-3 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">
                              <div className="flex items-center gap-2 overflow-hidden pr-2">
                                <FiFile className="text-indigo-500 w-4 h-4 flex-shrink-0" />
                                <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-xs text-gray-400">{(item.size / 1024).toFixed(1)} KB</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEditFile(idx)}
                                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded transition-colors"
                                  title="Delete file from archive"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          {editableFiles.length === 0 && (
                            <p className="text-xs text-center py-6 text-gray-400">No files remaining in this archive.</p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Error Display */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl"
                      >
                        <p className="text-sm text-amber-700 dark:text-amber-300">{error}</p>
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={handleConvert}
                        disabled={!hasFiles}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 ${
                          hasFiles
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg hover:shadow-xl cursor-pointer'
                            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                        }`}
                      >
                        <FiArchive className="w-5 h-5" />
                        {slug === 'view-zip'
                          ? tCommon('ztcViewArchive')
                          : slug === 'protect-zip'
                            ? tCommon('ztcEncryptSave')
                            : slug === 'unlock-zip-file'
                              ? tCommon('ztcDecryptUnlock')
                              : slug === 'split-zip'
                                ? tCommon('ztcSplitParts')
                                : slug === 'edit-zip'
                                  ? tCommon('ztcSaveModified')
                                  : tCommon('ztcConvertTo', { format: config.toFormat })}
                      </button>
                      {hasFiles && (
                        <button
                          onClick={resetConverter}
                          className=" inline-flex items-center whitespace-nowrap justify-center gap-2 py-4 px-6 rounded-xl font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                        >
                          <FiUpload className="w-5 h-5" />
                          {tCommon('ztcChooseDifferent')}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 space-y-6"
                  >
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="8" fill="none" />
                        <circle cx="50" cy="50" r="40" stroke="currentColor" className="text-indigo-600" strokeWidth="8" fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-indigo-600">{Math.round(progress)}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {slug.includes('-to-') || slug === 'protect-zip' || slug === 'unlock-zip-file' || slug === 'split-zip' ? currentStage : 'Processing...'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {slug === 'protect-zip' ? 'Applying AES password protection' : slug === 'unlock-zip-file' ? 'Verifying password & decrypting' : slug === 'split-zip' ? 'Generating multi-volume parts' : slug === 'edit-zip' ? 'Rebuilding archive contents' : `Converting ${config.fromFormat} to ${config.toFormat}`}
                      </p>
                      <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-2 font-medium">
                        ⚡ Processing 100% locally inside your browser via WebAssembly
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 'complete' && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 inline-flex items-center whitespace-nowrap justify-center shadow-lg">
                      <FiCheck className="w-10 h-10 text-white" />
                    </div>

                    {slug === 'view-zip' && resultUrl ? (
                      <div className="w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">ZIP Contents</h3>
                        <div className="space-y-1 max-h-60 overflow-y-auto bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                          {JSON.parse(resultUrl).map((entry: any, i: number) => (
                            <div key={i} className=" inline-flex items-center whitespace-nowrap gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600/50">
                              <FiFile className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{entry.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : slug === 'split-zip' && splitResults.length > 0 ? (
                      <div className="w-full max-w-lg space-y-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">Split Archive Complete!</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Your archive was sliced into {splitResults.length} multi-volume parts. Download each part to reassemble:
                          </p>
                        </div>
                        <div className="space-y-2.5 max-h-72 overflow-y-auto bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                          {splitResults.map((part, idx) => (
                            <div key={idx} className=" inline-flex items-center whitespace-nowrap justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                                <FiLayers className="text-indigo-600 flex-shrink-0 w-5 h-5" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{part.name}</span>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-xs text-gray-400">{(part.size / 1024 / 1024).toFixed(2)} MB</span>
                                <a
                                  href={part.url}
                                  download={part.name}
                                  className=" inline-flex items-center whitespace-nowrap gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                                >
                                  <FiDownload className="w-3.5 h-3.5" /> Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {slug === 'protect-zip'
                              ? 'Password Protection Complete!'
                              : slug === 'unlock-zip-file'
                                ? 'Archive Unlocked Successfully!'
                                : slug === 'edit-zip'
                                  ? 'Modified Archive Saved!'
                                  : 'Conversion Complete!'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Your {resultName ? resultName : `${config.toFormat} file`} is ready to download
                          </p>
                        </div>
                        {resultUrl && (
                          <a
                            href={resultUrl}
                            download={resultName || `converted.${config.toFormat.toLowerCase().replace('.', '-')}`}
                            className=" inline-flex items-center whitespace-nowrap gap-2 py-4 px-8 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <FiDownload className="w-5 h-5" />
                            Download {resultName ? resultName : config.toFormat}
                          </a>
                        )}
                      </>
                    )}

                    <button
                      onClick={resetConverter}
                      className=" inline-flex items-center whitespace-nowrap gap-2 py-3 px-6 rounded-xl font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
                    >
                      {tCommon('ztcProcessAnother')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Panel - Features */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50 p-8 h-full">
              {step === 'upload' && !hasFiles ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 inline-flex items-center whitespace-nowrap justify-center">
                    {slug === 'protect-zip' ? (
                      <FiLock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    ) : slug === 'unlock-zip-file' ? (
                      <FiUnlock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    ) : slug === 'split-zip' ? (
                      <FiLayers className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <FiArchive className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tCommon('ztcUploadToStart')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tCommon('ztcConvertedAppear')}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tCommon('ztcFeatures')}</h3>
                  {[
                    { title: tCommon('ztcLightning'), desc: tCommon('ztcLightningDesc') },
                    { title: tCommon('ztcPrivate'), desc: tCommon('ztcPrivateDesc') },
                    { title: tCommon('ztcZero'), desc: tCommon('ztcZeroDesc') },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 inline-flex items-center whitespace-nowrap justify-center flex-shrink-0">
                        <FiCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{feature.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{feature.desc}</p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 p-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300">{tCommon('ztcPrivacyGuarantee')}</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-indigo-600 dark:text-indigo-400">
                      <li>• {tCommon('ztcMaxRec')}</li>
                      <li>• {tCommon('ztcOffline')}</li>
                      <li>• {tCommon('ztcNoPass')}</li>
                      <li>• {tCommon('ztcMemWipe')}</li>
                    </ul>
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
