"use client";

import { Button, FileUploader, AudioPlayer } from "@/constants";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState, useEffect } from "react";
import { FiDownload, FiUpload } from "react-icons/fi";


function VideoToAudioConverter() {
  const ffmpegRef = useRef(new FFmpeg());
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [albumArt, setAlbumArt] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  // Handle audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audioURL]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value);
      setCurrentTime(parseFloat(e.target.value));
    }
  };

  // Load FFmpeg
  const loadFFmpeg = async () => {
    setIsLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/umd";
    const ffmpeg = ffmpegRef.current;

    ffmpeg.on("log", ({ message }) => {
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
    setIsPlaying(false);

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
      await ffmpeg.writeFile("input", await fetchFile(videoFile));
      await ffmpeg.exec(["-i", "input", "-q:a", "0", "-map", "a", "output.mp3"]);

      const data = await ffmpeg.readFile("output.mp3");
      const audioBlob = new Blob([data], { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    } catch (error) {
      console.error("Conversion error:", error);
      if (messageRef.current) messageRef.current.innerHTML = `Error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-900 pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Upload & Convert Panel */}
          <div className="bg-white dark:bg-gray-800 h-fit rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="p-4 sm:p-6">
              <h2 className="text-sm sm:text-base text-gray-800 dark:text-white mb-6 flex items-center">
                <FiUpload className="mr-2" /> Upload & Convert
              </h2>

              <FileUploader videoFile={videoFile} handleFileChange={handleFileChange} />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="w-full sm:w-auto">
                  <Button
                    onClick={convertToAudio}
                    isProcessing={isLoading}
                    labal='Convert to MP3'
                  />
                </div>

                {audioURL && (
                  <a
                    href={audioURL}
                    download="converted-audio.mp3"
                    className="flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto justify-center"
                  >
                    <FiDownload className="mr-1" /> Download
                  </a>
                )}
              </div>

              <audio ref={audioRef} src={audioURL || undefined} className="hidden" />
            </div>
          </div>

          {/* Music Player Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="p-4 sm:p-6">
              <AudioPlayer
                audioURL={audioURL}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                togglePlayback={togglePlayback}
                handleSeek={handleSeek}
                albumArt={albumArt}
                videoFile={videoFile}
              />
            </div>
          </div>
        </div>

        {messageRef.current && (
          <p
            ref={messageRef}
            className="mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic"
          />
        )}

        <div className="py-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>Note: Conversion happens in your browser. Your files are never uploaded to any server.</p>
        </div>
      </div>
    </div>
  );
}

export default VideoToAudioConverter;