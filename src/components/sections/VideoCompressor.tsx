"use client";

import { Button, FileUploader } from "@/constants";
import { useRef, useState, useEffect } from "react";
import { FiUpload, FiVideo, FiDownload, FiCheck, FiMinimize, FiFilm, FiScissors } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

function VideoCompressor() {
  const t = useTranslations('VideoCompressor');
  const ffmpegRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedVideoURL, setCompressedVideoURL] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [conversionStep, setConversionStep] = useState<'upload' | 'convert' | 'complete'>('upload');
  const [compressionLevel, setCompressionLevel] = useState<'light' | 'balanced' | 'strong'>('balanced');
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const loadingPromiseRef = useRef<Promise<void> | null>(null);

  const loadFFmpeg = async () => {
    if (loaded) return;
    if (loadingPromiseRef.current) {
      return loadingPromiseRef.current;
    }

    loadingPromiseRef.current = (async () => {
      try {
        const { FFmpeg } = await import("@ffmpeg/ffmpeg");
        const { toBlobURL } = await import("@ffmpeg/util");

        if (!ffmpegRef.current) {
          ffmpegRef.current = new FFmpeg();
        }
        const ffmpeg = ffmpegRef.current;

        ffmpeg.on("log", ({ message }: { message: string }) => {
          if (messageRef.current && !/frame=\s*\d+|fps=\s*\d+|bitrate=\s*|size=\s*|q=\s*\d+/i.test(message)) {
            messageRef.current.innerHTML = message;
          }
        });

        ffmpeg.on("progress", ({ progress }: { progress: number }) => {
          setProgress(Math.round(progress * 100));
        });

        const baseURLs = [
          "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd",
          "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd"
        ];

        let loadedSuccessfully = false;
        let lastErr: any = null;

        for (const baseURL of baseURLs) {
          try {
            if (messageRef.current) {
              messageRef.current.innerHTML = "🔒 100% Private — Processing locally in your browser...";
            }
            await ffmpeg.load({
              coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
              wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
            });
            loadedSuccessfully = true;
            break;
          } catch (err) {
            console.warn(`Failed to load FFmpeg from ${baseURL}:`, err);
            lastErr = err;
          }
        }

        if (!loadedSuccessfully) {
          throw lastErr || new Error("Failed to load video processor from CDNs");
        }

        if (messageRef.current) {
          messageRef.current.innerHTML = "🔒 100% Private — Local processor ready!";
        }
        setLoaded(true);
      } catch (error) {
        console.error("FFmpeg load error:", error);
        if (messageRef.current) {
          messageRef.current.innerHTML = `Error loading processor: ${error instanceof Error ? error.message : String(error)}`;
        }
        throw error;
      } finally {
        loadingPromiseRef.current = null;
      }
    })();

    return loadingPromiseRef.current;
  };

  const handleFileChange = (file: File) => {
    setVideoFile(file);
    setCompressedVideoURL(null);
    setProgress(0);
    setCompressedSize(null);
    setConversionStep('convert');

    // Extract duration to calculate original bitrate
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';
    videoElement.onloadedmetadata = () => {
      setDuration(videoElement.duration);
      URL.revokeObjectURL(videoElement.src);
    };
    videoElement.src = URL.createObjectURL(file);
  };

  useEffect(() => {
    if (conversionStep === 'convert' && !loaded) {
      loadFFmpeg().catch((err) => console.error("Background FFmpeg load error:", err));
    }
  }, [conversionStep, loaded]);

  const compressVideo = async () => {
    if (!videoFile) return;
    if (!loaded) await loadFFmpeg();

    const ffmpeg = ffmpegRef.current;
    setIsLoading(true);
    setProgress(0);
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      await ffmpeg.writeFile("input.mp4", await fetchFile(videoFile));

      let ffmpegArgs = ["-i", "input.mp4"];

      if (duration && duration > 0) {
        const originalBitrate = (videoFile.size * 8) / duration; // bps
        let targetRatio = 0.5;
        if (compressionLevel === 'light') targetRatio = 0.7;
        if (compressionLevel === 'strong') targetRatio = 0.3;

        const targetTotalBitrate = originalBitrate * targetRatio;
        const audioBitrate = Math.min(128000, targetTotalBitrate * 0.2); // max 128k audio
        const videoBitrate = targetTotalBitrate - audioBitrate;

        ffmpegArgs.push(
          "-vcodec", "libx264",
          "-preset", "ultrafast",
          "-b:v", `${Math.round(videoBitrate)}`,
          "-maxrate", `${Math.round(videoBitrate * 1.5)}`, // Allows minor spikes
          "-bufsize", `${Math.round(videoBitrate * 2)}`,
          "-acodec", "aac",
          "-b:a", `${Math.round(audioBitrate)}`,
          "output.mp4"
        );
      } else {
        // Fallback if duration extraction fails
        ffmpegArgs.push(
          "-vcodec", "libx264",
          "-preset", "ultrafast",
          "-crf", "32",
          "-vf", "scale='min(1280,iw)':-2",
          "-acodec", "aac",
          "-b:a", "128k",
          "output.mp4"
        );
      }

      await ffmpeg.exec(ffmpegArgs);

      const data: any = await ffmpeg.readFile("output.mp4");
      const videoBlob = new Blob([data], { type: "video/mp4" });
      setCompressedSize(videoBlob.size);
      const url = URL.createObjectURL(videoBlob);
      setCompressedVideoURL(url);
      setConversionStep('complete');
    } catch (error) {
      console.error("Compression error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const resetConverter = () => {
    if (compressedVideoURL) {
      URL.revokeObjectURL(compressedVideoURL);
    }
    setVideoFile(null);
    setCompressedVideoURL(null);
    setCompressedSize(null);
    setProgress(0);
    setConversionStep('upload');
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (compressedVideoURL) URL.revokeObjectURL(compressedVideoURL);
      try {
        if (ffmpegRef.current) ffmpegRef.current.terminate();
      } catch (e) {}
    };
  }, [compressedVideoURL]);

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
            <FiMinimize className="h-5 w-5 text-indigo-600" />
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
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-700/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {[
                { step: 'upload', label: t('step1'), icon: FiUpload },
                { step: 'convert', label: t('step2'), icon: FiMinimize },
                { step: 'complete', label: t('step3'), icon: FiDownload },
              ].map(({ step, label, icon: Icon }, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${conversionStep === step
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : conversionStep === 'complete' && step === 'complete'
                        ? 'bg-green-500 border-green-500 text-white'
                        : index === 0 || (conversionStep === 'convert' && step === 'convert') || (conversionStep === 'complete')
                          ? 'bg-indigo-100 border-indigo-600 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-400 dark:text-indigo-400'
                          : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600'
                    }`}>
                    {conversionStep === 'complete' && step === 'complete' ? (
                      <FiCheck className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`font-medium ${conversionStep === step || (conversionStep === 'complete' && step === 'complete')
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-500 dark:text-gray-400'
                    }`}>
                    {label}
                  </span>
                  {index < 2 && (
                    <div className={`w-8 h-0.5 mx-4 ${index === 0 || conversionStep === 'convert' || conversionStep === 'complete'
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
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl shadow-lg">
                  {conversionStep === 'complete' ? (
                    <FiCheck className="h-6 w-6 text-white" />
                  ) : conversionStep === 'convert' ? (
                    <FiMinimize className="h-6 w-6 text-white" />
                  ) : (
                    <FiUpload className="h-6 w-6 text-white" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {conversionStep === 'complete'
                    ? t('statusComplete')
                    : conversionStep === 'convert'
                      ? t('statusReady')
                      : t('statusUpload')}
                </h2>
              </div>

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
                      videoFile={videoFile}
                      handleFileChange={handleFileChange}
                      title={t('uploadTitle')}
                      subtitle={t('uploadSubtitle')}
                      dropText={t('uploadDropText')}
                      browseText={t('uploadBrowseText')}
                    />
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <p>{t('supportedFormats')}</p>
                    </div>
                  </motion.div>
                )}

                {conversionStep === 'convert' && videoFile && (
                  <motion.div
                    key="convert"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {!loaded ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <div className="text-center">
                          <p className="text-gray-900 dark:text-white font-medium text-lg">
                            Setting up local secure processor...
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            (This one-time download ensures your files never leave your device)
                          </p>
                        </div>
                        <p ref={messageRef} className="text-xs font-mono text-indigo-500 text-center animate-pulse"></p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <FiVideo className="h-5 w-5 text-indigo-600" />
                            <div>
                              <p className="font-medium text-indigo-800 dark:text-indigo-200">
                                {t('originalFile')}
                              </p>
                              <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                                {videoFile.name} ({formatSize(videoFile.size)})
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                          <p className="font-semibold text-gray-900 dark:text-white mb-3">{t('targetCompression')}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { id: 'light', label: t('lightLabel'), desc: t('lightDesc') },
                              { id: 'balanced', label: t('balancedLabel'), desc: t('balancedDesc') },
                              { id: 'strong', label: t('strongLabel'), desc: t('strongDesc') },
                            ].map(level => (
                              <button
                                key={level.id}
                                onClick={() => setCompressionLevel(level.id as any)}
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-300 ${compressionLevel === level.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                              >
                                <span className="font-bold text-sm">{level.label}</span>
                                <span className="text-xs mt-1 opacity-80">{level.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {isLoading && progress > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                              <span>{t('compressingStatus')}</span>
                              <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div
                                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <p ref={messageRef} className="text-center text-sm text-indigo-500 font-mono line-clamp-2"></p>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={compressVideo}
                            disabled={isLoading}
                            className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 border border-transparent cursor-pointer text-sm font-medium rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 transition-all duration-300"
                          >
                            {isLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Compressing...
                              </>
                            ) : (
                              t('compressBtn')
                            )}
                          </button>

                          <button
                            onClick={resetConverter}
                            disabled={isLoading}
                            className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 border border-transparent bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-[8px] text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiUpload className="w-4 h-4" />
                            {t('chooseDiffBtn')}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {conversionStep === 'complete' && compressedVideoURL && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <FiCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div className="w-full">
                          <p className="font-medium text-green-800 dark:text-green-200 mb-2">
                            {t('successTitle')}
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-2 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-green-100 dark:border-green-900/50">
                            <div>
                              <p className="text-xs text-green-600 dark:text-green-400">{t('originalSize')}</p>
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{formatSize(videoFile!.size)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-green-600 dark:text-green-400">{t('newSize')}</p>
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{compressedSize ? formatSize(compressedSize) : t('unknown')}</p>
                            </div>
                          </div>
                          {compressedSize && (
                            <p className={`text-sm mt-3 font-medium ${compressedSize > videoFile!.size ? 'text-orange-600 dark:text-orange-400' : 'text-green-700 dark:text-green-300'}`}>
                              {compressedSize > videoFile!.size
                                ? `${t('sizeIncreased')} ${Math.round((compressedSize / videoFile!.size - 1) * 100)}%`
                                : `${t('sizeSaved')} ${Math.round((1 - compressedSize / videoFile!.size) * 100)}%`
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={compressedVideoURL}
                        download={`compressed_${videoFile?.name}`}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <FiDownload className="h-5 w-5" />
                        {t('saveBtn')}
                      </a>
                      <button
                        onClick={resetConverter}
                        className="flex-1 inline-flex items-center whitespace-nowrap justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                      >
                        {t('compressNewBtn')}
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
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 p-8 h-full inline-flex items-center whitespace-nowrap justify-center min-h-[400px]">
              {compressedVideoURL ? (
                <video
                  src={compressedVideoURL}
                  controls
                  className="max-w-full h-auto max-h-[500px] rounded-lg shadow-lg bg-black"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <FiVideo className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">{t('previewPlaceholder1')}<br />{t('previewPlaceholder2')}</p>
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
                <h4 className="font-semibold text-gray-900 dark:text-white">{t('howTo1Title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('howTo1Desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className=" inline-flex items-center whitespace-nowrap justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{t('howTo2Title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('howTo2Desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className=" inline-flex items-center whitespace-nowrap justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{t('howTo3Title')}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('howTo3Desc')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VideoCompressor;
