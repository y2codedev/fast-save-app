"use client";

import { Button, FileUploader } from "@/constants";
import { useRef, useState, useEffect, useCallback } from "react";
import { FiUpload, FiDownload, FiCheck, FiScissors, FiFilm, FiVideo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

function VideoTrimmer() {
  const ffmpegRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trimmedVideoURL, setTrimmedVideoURL] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(100);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [conversionStep, setConversionStep] = useState<'upload' | 'trim' | 'complete'>('upload');
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

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

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoURL(url);
    setTrimmedVideoURL(null);
    setStartTime(0);
    setConversionStep('trim');
  };

  const onVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoDuration = e.currentTarget.duration;
    if (videoDuration > 0) {
      setDuration(videoDuration);
      setEndTime(videoDuration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (isPlaying) {
        if (videoRef.current.currentTime >= endTime) {
          videoRef.current.currentTime = startTime;
        }
      }
    }
  };

  // Dual Slider Handlers
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val < endTime - 0.5) { // Ensure at least 0.5s gap
      setStartTime(val);
      if (videoRef.current) {
        videoRef.current.currentTime = val;
        setCurrentTime(val);
      }
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > startTime + 0.5) {
      setEndTime(val);
    }
  };

  const trimVideo = async () => {
    if (!videoFile) return;
    if (startTime >= endTime) {
       alert("Start time must be before end time");
       return;
    }
    if (!loaded) await loadFFmpeg();

    const ffmpeg = ffmpegRef.current;
    setIsLoading(true);
    if(videoRef.current) videoRef.current.pause();
    setIsPlaying(false);
    
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      await ffmpeg.writeFile("input.mp4", await fetchFile(videoFile));
      
      // Fast trim without re-encoding using -c copy
      await ffmpeg.exec([
        "-i", "input.mp4", 
        "-ss", startTime.toString(), 
        "-to", endTime.toString(), 
        "-c", "copy", 
        "output.mp4"
      ]);

      const data: any = await ffmpeg.readFile("output.mp4");
      const videoBlob = new Blob([data], { type: "video/mp4" });
      const url = URL.createObjectURL(videoBlob);
      setTrimmedVideoURL(url);
      setConversionStep('complete');
    } catch (error) {
      console.error("Trim error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
    }
  };

  const resetConverter = () => {
    if (trimmedVideoURL) URL.revokeObjectURL(trimmedVideoURL);
    if (videoURL) URL.revokeObjectURL(videoURL);
    setVideoFile(null);
    setVideoURL(null);
    setTrimmedVideoURL(null);
    setConversionStep('upload');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${m}:${s < 10 ? '0' : ''}${s}.${ms}`;
  };

  useEffect(() => {
    return () => {
      if (trimmedVideoURL) URL.revokeObjectURL(trimmedVideoURL);
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
  }, [trimmedVideoURL, videoURL]);

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
            <FiScissors className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pro Video Trimmer
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            Cut & Trim Videos
            <span className="block text-indigo-600 dark:text-indigo-400">Visually & Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Drag the handles to select the perfect moment. No upload wait times, everything happens in your browser.
          </p>
        </motion.div>

        {/* Trimmer UI - Only shows when file is loaded */}
        {conversionStep === 'trim' && videoURL ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/50"
          >
            {/* Live Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-8 shadow-inner">
              <video 
                ref={videoRef}
                src={videoURL}
                onLoadedMetadata={onVideoLoaded}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={() => {
                  if (videoRef.current) {
                    if (isPlaying) videoRef.current.pause();
                    else videoRef.current.play();
                  }
                }}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Premium Dual Range Slider */}
            <div className="px-4 mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-lg font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">
                  {formatTime(startTime)}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  Duration: {formatTime(endTime - startTime)}
                </span>
                <span className="font-mono text-lg font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-3 py-1 rounded-lg">
                  {formatTime(endTime)}
                </span>
              </div>
              
              <div className="relative h-12 flex items-center" ref={trackRef}>
                {/* Background Track */}
                <div className="absolute w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                   {/* Active Selection Highlight */}
                   <div 
                     className="absolute h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                     style={{ 
                       left: `${duration > 0 ? (startTime / duration) * 100 : 0}%`,
                       right: `${duration > 0 ? 100 - (endTime / duration) * 100 : 100}%`
                     }}
                   ></div>
                </div>

                {/* Moving Playhead Vertical Line */}
                {duration > 0 && (
                  <div 
                    className="absolute h-8 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.8)] z-30 pointer-events-none transform -translate-x-1/2 flex items-center justify-center transition-all duration-75"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  >
                    {/* Playhead Dot */}
                    <div className="absolute -top-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_4px_rgba(0,0,0,0.5)]"></div>
                    <div className="absolute -bottom-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_4px_rgba(0,0,0,0.5)]"></div>
                  </div>
                )}

                {/* Invisible Inputs for native slider logic */}
                <input 
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={startTime}
                  onChange={handleStartChange}
                  className="absolute w-full h-4 appearance-none pointer-events-none opacity-0 z-20"
                  style={{ WebkitAppearance: 'none' }}
                />
                <input 
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={endTime}
                  onChange={handleEndChange}
                  className="absolute w-full h-4 appearance-none pointer-events-none opacity-0 z-20"
                  style={{ WebkitAppearance: 'none' }}
                />

                {/* Custom Thumbs */}
                <div 
                  className="absolute h-8 w-4 bg-indigo-600 rounded-sm shadow-md cursor-grab active:cursor-grabbing z-10 transform -translate-x-1/2 flex items-center justify-center border border-indigo-400"
                  style={{ left: `${duration > 0 ? (startTime / duration) * 100 : 0}%` }}
                >
                  <div className="w-0.5 h-4 bg-white/50 rounded-full"></div>
                </div>
                
                <div 
                  className="absolute h-8 w-4 bg-violet-600 rounded-sm shadow-md cursor-grab active:cursor-grabbing z-10 transform -translate-x-1/2 flex items-center justify-center border border-violet-400"
                  style={{ left: `${duration > 0 ? (endTime / duration) * 100 : 100}%` }}
                >
                  <div className="w-0.5 h-4 bg-white/50 rounded-full"></div>
                </div>
              </div>

              {/* Instructions */}
              <style jsx>{`
                input[type=range]::-webkit-slider-thumb {
                  pointer-events: auto;
                  width: 20px;
                  height: 40px;
                  border-radius: 0;
                  -webkit-appearance: none;
                  background: transparent;
                }
                input[type=range]::-moz-range-thumb {
                  pointer-events: auto;
                  width: 20px;
                  height: 40px;
                  border-radius: 0;
                  background: transparent;
                  border: none;
                }
              `}</style>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
              <button
                onClick={resetConverter}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              
              <p ref={messageRef} className="text-sm text-indigo-500 font-mono line-clamp-1 flex-1 text-center px-4"></p>

              <Button
                onClick={trimVideo}
                isProcessing={isLoading}
                label={isLoading ? "Processing..." : "Cut Video Now"}
                className="w-full sm:w-auto px-8"
              />
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-12">
            <AnimatePresence mode="wait">
              {conversionStep === 'upload' && (
                <motion.div 
                  className="relative max-w-2xl mx-auto w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 p-8 h-full">
                    <FileUploader videoFile={videoFile} handleFileChange={handleFileChange} />
                  </div>
                </motion.div>
              )}

              {conversionStep === 'complete' && trimmedVideoURL && (
                <motion.div
                  key="complete"
                  className="max-w-2xl mx-auto w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 p-8">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-8 text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
                        Trim Successful!
                      </h3>
                      <p className="text-green-700 dark:text-green-300">
                        Your cut video is ready. We saved exactly what you selected.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={trimmedVideoURL}
                        download={`trimmed_${videoFile?.name}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                      >
                        <FiDownload className="h-6 w-6" />
                        Download Video
                      </a>
                      <button
                        onClick={resetConverter}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-4 px-6 rounded-xl transition-all duration-300 text-lg"
                      >
                        Trim Another
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Try Other Features */}
        <motion.div 
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Explore Other Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/video-to-gif" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiFilm className="w-4 h-4" />
              Video to GIF Maker
            </Link>
            <Link 
              href="/video-compressor" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiVideo className="w-4 h-4" />
              Video Compressor
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VideoTrimmer;
