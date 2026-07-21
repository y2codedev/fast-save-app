"use client";

import { Button, FileUploader, AudioPlayer, AdsenseAd } from "@/constants";
import { useRef, useState } from "react";
import { FiUpload, FiMusic, FiDownload, FiVideo, FiCheck, FiMinimize, FiScissors, FiFilm } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function VideoToAudioConverter() {
  const adsenseSlotId = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID as string;
  const ffmpegRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [albumArt, setAlbumArt] = useState<string | null>(null);
  const [conversionStep, setConversionStep] = useState<'upload' | 'convert' | 'complete'>('upload');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  // Load FFmpeg
  const loadFFmpeg = async () => {
    setIsLoading(true);
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { toBlobURL } = await import("@ffmpeg/util");
    
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }: { message: string }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
    });

    setLoaded(true);
    setIsLoading(false);
  };

  // Handle file change
  const handleFileChange = (file: File) => {
    setVideoFile(file);
    setAudioURL(null);
    setConversionStep('convert');

    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      video.currentTime = 1;
    };

    video.onseeked = () => {
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setAlbumArt(canvas.toDataURL('image/jpeg'));
      }
    };
  };

  // Convert video to audio
  const convertToAudio = async () => {
    if (!videoFile) return;
    if (!loaded) await loadFFmpeg();

    const ffmpeg = ffmpegRef.current;
    setIsLoading(true);
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      await ffmpeg.writeFile("input", await fetchFile(videoFile));
      await ffmpeg.exec(["-i", "input", "-q:a", "0", "-map", "a", "output.mp3"]);

      const data: any = await ffmpeg.readFile("output.mp3");
      const audioBlob = new Blob([data], { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      setConversionStep('complete');
    } catch (error) {
      console.error("Conversion error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
    }
  };

  const resetConverter = () => {
    setVideoFile(null);
    setAudioURL(null);
    setAlbumArt(null);
    setConversionStep('upload');
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8">

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200 dark:border-gray-700">
            <FiMusic className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Video to MP3 Converter
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            Extract Audio from
            <span className="block text-indigo-600 dark:text-indigo-400">Any Video</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Convert videos to high-quality MP3 files instantly. Supports all major video formats with crystal clear audio extraction.
          </p>
        </motion.div>

        {/* Conversion Steps Indicator */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/50">
           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {[
                { step: 'upload', label: 'Upload Video', icon: FiUpload },
                { step: 'convert', label: 'Convert', icon: FiMusic },
                { step: 'complete', label: 'Download', icon: FiDownload },
              ].map(({ step, label, icon: Icon }, index) => (
                <div key={step} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    conversionStep === step 
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

        {/* Main Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upload & Convert Panel */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl shadow-lg">
                  {conversionStep === 'complete' ? (
                    <FiCheck className="h-6 w-6 text-white" />
                  ) : conversionStep === 'convert' ? (
                    <FiVideo className="h-6 w-6 text-white" />
                  ) : (
                    <FiUpload className="h-6 w-6 text-white" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {conversionStep === 'complete' 
                    ? 'Audio Ready' 
                    : conversionStep === 'convert' 
                    ? 'Ready to Convert' 
                    : 'Upload & Convert'}
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
                    <FileUploader videoFile={videoFile} handleFileChange={handleFileChange} />
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <p>Supported formats: MP4, AVI, MOV, WEBM, and more</p>
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
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 w-full">
                      <div className="flex items-start sm:items-center gap-3">
                        <FiVideo className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5 sm:mt-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-green-800 dark:text-green-200">
                            File Ready for Conversion
                          </p>
                          <div className="text-sm text-green-700 dark:text-green-300 mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-1 min-w-0">
                            <span className="truncate block" title={videoFile.name}>{videoFile.name}</span>
                            <span className="flex-shrink-0 whitespace-nowrap opacity-80">({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={convertToAudio}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-transparent cursor-pointer text-sm font-medium rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 transition-all duration-300"
                      >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Converting...
                            </>
                        ) : (
                            "Convert to MP3"
                        )}
                      </button>

                      <button
                        onClick={resetConverter}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-transparent bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-[8px] text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiUpload className="w-4 h-4" />
                        Choose Different File
                      </button>
                    </div>
                  </motion.div>
                )}

                {conversionStep === 'complete' && audioURL && (
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
                            Conversion Complete!
                          </p>
                          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                            Your audio is ready for download
                          </p>
                        </div>
                      </div>
                    </div>



                    <div className="flex gap-3">
                      <a
                        href={audioURL}
                        download={`${videoFile?.name.replace(/\.[^/.]+$/, "")}.mp3`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <FiDownload className="h-5 w-5" />
                        Download MP3
                      </a>
                      <button
                        onClick={resetConverter}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                      >
                        Convert Another
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Music Player Panel */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700/50 p-8 h-full">
              <AudioPlayer
                audioURL={audioURL}
                albumArt={albumArt}
                videoFile={videoFile}
              />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            {
              icon: FiDownload,
              title: "High Quality",
              description: "Extract audio in 320kbps MP3 quality with no loss in sound clarity"
            },
            {
              icon: FiMusic,
              title: "All Formats",
              description: "Supports MP4, AVI, MOV, WEBM, and 20+ other video formats"
            },
            {
              icon: FiCheck,
              title: "Instant Processing",
              description: "Fast conversion with our optimized audio extraction engine"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Ad Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className='mx-auto max-w-4xl'>
            <AdsenseAd height="min-h-[100px] md:h-[280px]" slot={adsenseSlotId} className="rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50" />
          </div>
        </motion.div>

        {/* Try Other Features */}
        <motion.div 
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Try Other Video Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/video-compressor" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiMinimize className="w-4 h-4" />
              Video Compressor
            </Link>
            <Link 
              href="/video-to-gif" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiFilm className="w-4 h-4" />
              Video to GIF
            </Link>
            <Link 
              href="/video-trimmer" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiScissors className="w-4 h-4" />
              Video Trimmer
            </Link>
            <Link 
              href="/audio-trimmer" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiScissors className="w-4 h-4" />
              Audio Trimmer
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VideoToAudioConverter;