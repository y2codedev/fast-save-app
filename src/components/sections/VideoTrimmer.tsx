"use client";

import { Button, FileUploader } from "@/constants";
import { useRef, useState, useEffect, useCallback } from "react";
import { FiUpload, FiDownload, FiCheck, FiScissors, FiFilm, FiVideo, FiPlay, FiPause } from "react-icons/fi";
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
  const [isDraggingSeek, setIsDraggingSeek] = useState(false);
  
  const [conversionStep, setConversionStep] = useState<'upload' | 'trim' | 'complete'>('upload');
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const trimmerRef = useRef<HTMLDivElement | null>(null);

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
    setCurrentTime(0);
    setConversionStep('trim');
    // Smooth-scroll to the trimmer area after React renders it
    setTimeout(() => {
      trimmerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const onVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoDuration = e.currentTarget.duration;
    if (videoDuration > 0) {
      setDuration(videoDuration);
      setEndTime(videoDuration);
      setStartTime(0);
      setCurrentTime(0);
    }
  };

  // Video onTimeUpdate — only syncs state when NOT playing (paused / seeking).
  // During playback, the rAF loop below handles smooth 60fps updates instead.
  const handleTimeUpdate = () => {
    if (!videoRef.current || isDraggingSeek) return;
    if (!isPlaying) {
      // When paused, keep UI in sync with wherever the video is
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // 60fps rAF loop — drives both the seek bar and the trim-slider stepper
  // smoothly during playback. Only this loop sets currentTime while playing.
  useEffect(() => {
    let animId: number;
    let active = true;       // guard against stale closures

    const tick = () => {
      if (!active || !videoRef.current) return;

      const cur = videoRef.current.currentTime;

      // Stop at trim end
      if (cur >= endTime) {
        videoRef.current.pause();
        videoRef.current.currentTime = endTime;
        setCurrentTime(endTime);
        setIsPlaying(false);
        return;
      }

      // Snap forward if somehow before trim start
      if (cur < startTime) {
        videoRef.current.currentTime = startTime;
      }

      setCurrentTime(videoRef.current.currentTime);
      animId = requestAnimationFrame(tick);
    };

    if (isPlaying && !isDraggingSeek) {
      animId = requestAnimationFrame(tick);
    }

    return () => {
      active = false;
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, endTime, startTime, isDraggingSeek]);

  // Dual Slider Handlers for Trim Cut Range Selection
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val < endTime - 0.5) {
      setStartTime(val);
      if (currentTime < val) {
        setCurrentTime(val);
        if (videoRef.current) {
          videoRef.current.currentTime = val;
        }
      }
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > startTime + 0.5) {
      setEndTime(val);
      if (currentTime > val) {
        setCurrentTime(val);
        if (videoRef.current) {
          videoRef.current.currentTime = val;
        }
      }
    }
  };

  // Playback Toggle: Play from current playhead position, or reset to startTime if at/past end
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentTime >= endTime - 0.05 || currentTime < startTime) {
        videoRef.current.currentTime = startTime;
        setCurrentTime(startTime);
      }
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback error:", err);
      });
    }
  };

  // Music Player Seek Bar Handler (Relative time from 0 to trimmedLength)
  const handleSeekInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const relativeVal = Number(e.target.value);
    const targetTime = startTime + relativeVal;
    const clampedVal = Math.min(Math.max(targetTime, startTime), endTime);
    setCurrentTime(clampedVal);
    if (videoRef.current) {
      videoRef.current.currentTime = clampedVal;
    }
  };

  const handleSeekRelease = () => {
    setIsDraggingSeek(false);
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
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
    if (videoRef.current) videoRef.current.pause();
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

  // High precision time formatting for handles (m:ss.s)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00.0";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${m}:${s < 10 ? '0' : ''}${s}.${ms}`;
  };

  // Music player style time formatting (m:ss e.g. 0:18)
  const formatPlaybackTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    return () => {
      if (trimmedVideoURL) URL.revokeObjectURL(trimmedVideoURL);
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
  }, [trimmedVideoURL, videoURL]);

  // Trimmed length duration and current relative time within trim range (0 to trimmedLength)
  const trimmedLength = Math.max(0.1, endTime - startTime);
  const relativeCurrentTime = Math.min(Math.max(currentTime - startTime, 0), trimmedLength);
  const playbackProgressPercent = (relativeCurrentTime / trimmedLength) * 100;

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
            ref={trimmerRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/50 shadow-2xl scroll-mt-4"
          >
            {/* Live Video Player Container */}
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-6 shadow-inner cursor-pointer" onClick={togglePlay}>
              <video 
                ref={videoRef}
                src={videoURL}
                onLoadedMetadata={onVideoLoaded}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  if (videoRef.current) {
                    videoRef.current.currentTime = startTime;
                    setCurrentTime(startTime);
                  }
                }}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all">
                  <div className="w-16 h-16 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-xl hover:scale-110 transition-transform">
                    <FiPlay className="w-8 h-8 text-white fill-current ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Music Player Style Seek Bar Component (Spotify / YouTube style) */}
            <div className="mb-8 bg-gray-900/90 dark:bg-gray-950/90 backdrop-blur-xl rounded-2xl p-5 border border-gray-800 text-white shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={togglePlay}
                    type="button"
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
                  >
                    {isPlaying ? (
                      <FiPause className="w-6 h-6 fill-current" />
                    ) : (
                      <FiPlay className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </button>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold block flex items-center gap-2">
                      <FiVideo className="w-3.5 h-3.5" />
                      Trim Preview
                    </span>
                    <span className="text-sm text-gray-300 font-mono mt-0.5 block">
                      {formatPlaybackTime(relativeCurrentTime)} / {formatPlaybackTime(trimmedLength)}
                    </span>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-gray-400 block">Trimmed Length</span>
                  <span className="text-sm font-mono font-medium text-indigo-300">
                    {formatPlaybackTime(trimmedLength)}
                  </span>
                </div>
              </div>

              {/* Music Player Range Slider (From 0:00 to trimmedLength) */}
              <div className="relative pt-2 pb-1 px-1">
                {/* Seek Bar Track */}
                <div className="relative h-2 w-full bg-gray-700/80 rounded-full flex items-center cursor-pointer group">
                  {/* Progress Fill — no CSS transition so it tracks every rAF frame */}
                  <div 
                    className="absolute h-full bg-white rounded-full group-hover:bg-indigo-400"
                    style={{ width: `${playbackProgressPercent}%` }}
                  />
                  {/* Circular Playhead Knob — w-4 h-4 (valid Tailwind), no transition */}
                  <div 
                    className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.6)] -translate-x-1/2 -translate-y-1/2 top-1/2 group-hover:scale-125 pointer-events-none"
                    style={{ left: `${playbackProgressPercent}%` }}
                  />
                  {/* Native Range Input from 0 to trimmedLength for seamless relative scrubbing */}
                  <input 
                    type="range"
                    min={0}
                    max={trimmedLength}
                    step={0.01}
                    value={relativeCurrentTime}
                    onInput={handleSeekInput}
                    onChange={handleSeekInput}
                    onMouseDown={() => setIsDraggingSeek(true)}
                    onMouseUp={handleSeekRelease}
                    onTouchStart={() => setIsDraggingSeek(true)}
                    onTouchEnd={handleSeekRelease}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                </div>

                {/* Left & Right Labels (0:00 relative start & trimmedLength end time) */}
                <div className="flex justify-between items-center text-xs font-mono text-gray-300 mt-2 font-medium">
                  <span>{formatPlaybackTime(relativeCurrentTime)}</span>
                  <span>{formatPlaybackTime(trimmedLength)}</span>
                </div>
              </div>
            </div>

            {/* Dual Range Cut Selection Controls */}
            <div className="px-4 mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trim Selection Handles
                </span>
                <span className="text-xs text-gray-400">
                  Full Video: {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-base font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">
                  Start: {formatTime(startTime)}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  Duration: {formatTime(endTime - startTime)}
                </span>
                <span className="font-mono text-base font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-3 py-1 rounded-lg">
                  End: {formatTime(endTime)}
                </span>
              </div>
              
              <div className="relative h-12 flex items-center" ref={trackRef}>
                {/* Full Video Track */}
                <div className="absolute w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                   {/* Selected Range Highlight */}
                   <div 
                     className="absolute h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[left,right] duration-100 ease-out"
                     style={{ 
                       left: `${duration > 0 ? (startTime / duration) * 100 : 0}%`,
                       right: `${duration > 0 ? 100 - (endTime / duration) * 100 : 100}%`
                     }}
                   ></div>
                </div>

                {/* Moving Stepper Playhead Marker across full timeline */}
                {duration > 0 && (
                  <div 
                    className="absolute h-8 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.8)] z-30 pointer-events-none -translate-x-1/2 flex items-center justify-center"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="absolute -top-1 w-2.5 h-2.5 bg-indigo-500 rounded-full shadow"></div>
                    <div className="absolute -bottom-1 w-2.5 h-2.5 bg-indigo-500 rounded-full shadow"></div>
                  </div>
                )}

                {/* Dual handle inputs */}
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

                {/* Handle thumbs */}
                <div 
                  className="absolute h-8 w-4 bg-indigo-600 rounded-sm shadow-md cursor-grab active:cursor-grabbing z-10 -translate-x-1/2 flex items-center justify-center border border-indigo-400 transition-[left] duration-100 ease-out"
                  style={{ left: `${duration > 0 ? (startTime / duration) * 100 : 0}%` }}
                >
                  <div className="w-0.5 h-4 bg-white/50 rounded-full"></div>
                </div>
                
                <div 
                  className="absolute h-8 w-4 bg-violet-600 rounded-sm shadow-md cursor-grab active:cursor-grabbing z-10 -translate-x-1/2 flex items-center justify-center border border-violet-400 transition-[left] duration-100 ease-out"
                  style={{ left: `${duration > 0 ? (endTime / duration) * 100 : 100}%` }}
                >
                  <div className="w-0.5 h-4 bg-white/50 rounded-full"></div>
                </div>
              </div>

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

        {/* How to Use Section */}
        <motion.div 
          className="mt-16 mb-8 text-left max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How to trim Videos?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">1</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Upload Video</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Select or drag & drop the video you want to cut. We support MP4, MOV, WEBM and more formats natively.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">2</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Select Range</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use the timeline sliders to choose your start and end points. You can also manually enter the exact timestamps.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">3</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Trim & Download</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click 'Trim Video'. The clip will be processed instantly without any quality loss, ready for you to download!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default VideoTrimmer;

