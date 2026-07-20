"use client";

import { Button, FileUploader } from "@/constants";
import { useRef, useState, useEffect } from "react";
import { FiDownload, FiCheck, FiScissors, FiMusic, FiMic } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

function AudioTrimmer() {
  const ffmpegRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trimmedAudioURL, setTrimmedAudioURL] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [conversionStep, setConversionStep] = useState<'upload' | 'trim' | 'complete'>('upload');
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
    setAudioFile(file);
    setAudioURL(url);
    setTrimmedAudioURL(null);
    setStartTime(0);
    setConversionStep('trim');
  };

  const onAudioLoaded = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audioDuration = e.currentTarget.duration;
    if (audioDuration > 0) {
      setDuration(audioDuration);
      setEndTime(audioDuration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && isPlaying) {
      if (audioRef.current.currentTime >= endTime) {
        audioRef.current.currentTime = startTime;
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val < endTime - 0.1) {
      setStartTime(val);
      if (audioRef.current) {
        audioRef.current.currentTime = val;
      }
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > startTime + 0.1) {
      setEndTime(val);
      if (audioRef.current) {
        audioRef.current.currentTime = val;
      }
    }
  };

  const trimAudio = async () => {
    if (!audioFile) return;
    if (startTime >= endTime) {
       alert("Start time must be before end time");
       return;
    }
    if (!loaded) await loadFFmpeg();

    const ffmpeg = ffmpegRef.current;
    setIsLoading(true);
    if(audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    
    try {
      const { fetchFile } = await import("@ffmpeg/util");
      
      const fileExt = audioFile.name.split('.').pop()?.toLowerCase() || 'mp3';
      const inputName = `input.${fileExt}`;
      const outputName = `output.${fileExt}`;
      
      await ffmpeg.writeFile(inputName, await fetchFile(audioFile));
      
      await ffmpeg.exec([
        "-i", inputName, 
        "-ss", startTime.toString(), 
        "-to", endTime.toString(), 
        "-c", "copy", 
        outputName
      ]);

      const data: any = await ffmpeg.readFile(outputName);
      const audioBlob = new Blob([data], { type: audioFile.type || "audio/mpeg" });
      const url = URL.createObjectURL(audioBlob);
      setTrimmedAudioURL(url);
      setConversionStep('complete');
    } catch (error) {
      console.error("Trim error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
    }
  };

  const resetConverter = () => {
    if (trimmedAudioURL) URL.revokeObjectURL(trimmedAudioURL);
    if (audioURL) URL.revokeObjectURL(audioURL);
    setAudioFile(null);
    setAudioURL(null);
    setTrimmedAudioURL(null);
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
      if (trimmedAudioURL) URL.revokeObjectURL(trimmedAudioURL);
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [trimmedAudioURL, audioURL]);

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
              Pro Audio Trimmer
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-violet-600 dark:from-white dark:via-indigo-200 dark:to-violet-400 bg-clip-text text-transparent mb-6">
            Cut & Trim Audio
            <span className="block text-indigo-600 dark:text-indigo-400">Make Ringtones Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Drag the handles to select the perfect moment of your song. No upload wait times, everything happens in your browser.
          </p>
        </motion.div>

        {conversionStep === 'trim' && audioURL ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-gray-700/50"
          >
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 mb-8 text-center flex flex-col items-center justify-center min-h-[160px]">
              <FiMusic className="h-12 w-12 text-indigo-500 mb-4" />
              <audio 
                ref={audioRef}
                src={audioURL}
                onLoadedMetadata={onAudioLoaded}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
                className="w-full max-w-md mx-auto"
              />
              <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mt-4 line-clamp-1 max-w-sm">
                {audioFile?.name}
              </p>
            </div>

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
              
              <div className="relative h-16 flex items-center" ref={trackRef}>
                {/* Background Track indicating a waveform ideally, simple block for now */}
                <div className="absolute w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center text-gray-400 text-xs">
                   <div 
                     className="absolute h-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-80"
                     style={{ 
                       left: `${(startTime / duration) * 100}%`,
                       right: `${100 - (endTime / duration) * 100}%`
                     }}
                   ></div>
                </div>

                <input 
                  type="range"
                  min={0}
                  max={duration}
                  step={0.01}
                  value={startTime}
                  onChange={handleStartChange}
                  className="absolute w-full h-8 appearance-none pointer-events-none opacity-0 z-20"
                />
                <input 
                  type="range"
                  min={0}
                  max={duration}
                  step={0.01}
                  value={endTime}
                  onChange={handleEndChange}
                  className="absolute w-full h-8 appearance-none pointer-events-none opacity-0 z-20"
                />

                <div 
                  className="absolute h-12 w-4 bg-indigo-600 rounded-sm shadow-md cursor-grab active:cursor-grabbing z-10 transform -translate-x-1/2 flex items-center justify-center border border-indigo-400"
                  style={{ left: `${(startTime / duration) * 100}%` }}
                >
                  <div className="w-0.5 h-6 bg-white/50 rounded-full"></div>
                </div>
                
                <div 
                  className="absolute h-12 w-4 bg-violet-600 rounded-sm shadow-md cursor-grab active:cursor-grabbing z-10 transform -translate-x-1/2 flex items-center justify-center border border-violet-400"
                  style={{ left: `${(endTime / duration) * 100}%` }}
                >
                  <div className="w-0.5 h-6 bg-white/50 rounded-full"></div>
                </div>
              </div>

              <style jsx>{`
                input[type=range]::-webkit-slider-thumb {
                  pointer-events: auto;
                  width: 20px;
                  height: 48px;
                  border-radius: 0;
                  -webkit-appearance: none;
                  background: transparent;
                }
                input[type=range]::-moz-range-thumb {
                  pointer-events: auto;
                  width: 20px;
                  height: 48px;
                  border-radius: 0;
                  background: transparent;
                  border: none;
                }
              `}</style>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-6">
              <button
                onClick={resetConverter}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              
              <p ref={messageRef} className="text-sm text-indigo-500 font-mono line-clamp-1 flex-1 text-center px-4"></p>

              <Button
                onClick={trimAudio}
                isProcessing={isLoading}
                label={isLoading ? "Processing..." : "Cut Audio Now"}
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
                    <FileUploader 
                      videoFile={audioFile} 
                      handleFileChange={handleFileChange} 
                      accept={{ 'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'] }}
                      title="Select Audio File"
                      subtitle="MP3, WAV, OGG, M4A (Max 100MB)"
                    />
                  </div>
                </motion.div>
              )}

              {conversionStep === 'complete' && trimmedAudioURL && (
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
                      <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-4">
                        Trim Successful!
                      </h3>
                      <audio controls src={trimmedAudioURL} className="w-full mx-auto max-w-md" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={trimmedAudioURL}
                        download={`trimmed_${audioFile?.name}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-lg"
                      >
                        <FiDownload className="h-6 w-6" />
                        Download Audio
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

        <motion.div 
          className="text-center mt-12 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Explore Other Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/video-trimmer" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiScissors className="w-4 h-4" />
              Video Trimmer
            </Link>
            <Link 
              href="/audio" 
              className="px-6 py-3 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 hover:text-indigo-600 transition-all font-medium flex items-center gap-2 shadow-sm"
            >
              <FiMic className="w-4 h-4" />
              Extract Audio from Video
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AudioTrimmer;
