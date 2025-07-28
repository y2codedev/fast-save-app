"use client";

import { FiPlay, FiPause, FiMusic } from "react-icons/fi";
import { formatTime } from "@/utils";
import { AudioLoader } from "@/constants";
import { AudioPlayerProps } from "@/constants/types";
import Image from "next/image";

export function AudioPlayer({
    audioURL,
    isPlaying,
    currentTime,
    duration,
    togglePlayback,
    handleSeek,
    albumArt,
    videoFile
}: AudioPlayerProps) {
    return (
        <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between pb-5">
                <span className="flex items-center gap-2 text-sm sm:text-base">
                    <FiMusic className="mr-2" />
                    <span>Music Player</span>
                </span>
                {isPlaying && <AudioLoader />}
            </div>

            <div className="">
                {albumArt ? (
                    <div className="relative aspect-square w-full h-96  mx-auto rounded-xl overflow-hidden">
                        <Image
                            src={albumArt}
                            alt="Album art"
                            className="w-full h-full object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white font-medium text-sm">{videoFile?.name.replace(/\.[^/.]+$/, "")}</span>
                        </div>
                    </div>
                ) : (
                    <div className="aspect-square w-full h-64 sm:h-80 mx-auto border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                        <FiMusic className="text-5xl sm:text-6xl text-gray-400 dark:text-gray-500" />
                    </div>
                )}
            </div>

            {audioURL && (
                <div className="mb-8">
                    <div className="flex items-center justify-center my-5">
                        <button
                            onClick={togglePlayback}
                            className="p-3 sm:p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition-colors duration-200 focus:outline-none "
                        >
                            {isPlaying ? (
                                <FiPause size={20} className="sm:size-6 flex-shrink-0" />
                            ) : (
                                <FiPlay size={20} className="sm:size-6 flex-shrink-0" />
                            )}
                        </button>
                    </div>

                    <div className="space-y-2">
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                            style={{
                                backgroundImage: `linear-gradient(to right, #4f46e5 ${(currentTime / (duration || 100)) * 100}%, #d1d5db ${(currentTime / (duration || 100)) * 100}%)`
                            }}
                        />
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span> {formatTime(currentTime)} </span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}