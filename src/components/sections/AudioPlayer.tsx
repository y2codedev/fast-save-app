"use client";

import { FiMusic, FiDownload } from "react-icons/fi";
import { AudioPlayerProps } from "@/constants/types";
import Image from "next/image";

export function AudioPlayer({
    albumArt,
    videoFile,
    audioURL
}: AudioPlayerProps) {
    return (
        <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between pb-5">
                <span className="flex items-center gap-2 text-sm sm:text-base">
                    <FiMusic className="mr-2" />
                    <span>Music Player</span>
                </span>
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
                    <div className="aspect-square w-full h-64 sm:h-72 mx-auto border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                        <FiMusic className="text-5xl sm:text-6xl text-gray-400 dark:text-gray-500" />
                    </div>
                )}
            </div>
            {audioURL && (
                <div className="flex items-center mt-5 justify-end">
                    <a
                        href={audioURL}
                        download="converted-audio.mp3"
                        className="flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto justify-center"
                    >
                        <FiDownload className="mr-1" /> Download
                    </a>
                </div>
            )}
        </div>
    );
}