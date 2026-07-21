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
        <div className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 p-3 rounded-xl shadow-lg">
                    <FiMusic className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Audio Preview
                </h2>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-6">
                {albumArt ? (
                    <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                        <Image
                            src={albumArt}
                            alt="Album art"
                            className="w-full h-full object-cover"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 overflow-hidden">
                            <span className="text-white font-bold text-lg truncate block w-full drop-shadow-md" title={videoFile?.name}>
                                {videoFile?.name.replace(/\.[^/.]+$/, "")}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="aspect-square w-full max-w-sm mx-auto border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                        <FiMusic className="text-6xl mb-4 opacity-50" />
                        <p className="text-sm font-medium">No preview available</p>
                    </div>
                )}

                {audioURL && (
                    <div className="w-full max-w-sm mx-auto mt-2">
                        <audio 
                            controls 
                            src={audioURL} 
                            className="w-full h-12 rounded-full shadow-md bg-white dark:bg-gray-800"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}