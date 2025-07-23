"use client";

import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { useCallback } from "react";

interface FileUploaderProps {
  videoFile: File | null;
  handleFileChange: (file: File) => void;
}

export function FileUploader({ videoFile, handleFileChange }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]); 
    }
  }, [handleFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'video/*': [] },
    maxSize: 100 * 1024 * 1024, 
  });

  return (
    <div className="mb-6">
      <label className="block sm:text-sm text-xs font-medium text-gray-700 dark:text-gray-300 mb-3">
        Select Video File
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-colors duration-200 cursor-pointer
          ${isDragActive ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10" : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50"}`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <FiUpload className="text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400" />
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {videoFile ? (
              <span className="font-medium text-indigo-600 dark:text-indigo-400 truncate max-w-xs">
                {videoFile.name.length > 35 ? videoFile.name.slice(0, 35) + "..." : videoFile.name}
              </span>
            ) : (
              <>
                <span className="font-medium text-gray-700 dark:text-gray-300">Drag & drop files or</span>{' '}
                <span className="text-indigo-600 dark:text-indigo-400 underline">browse</span>
              </>
            )}
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            MP4, WebM, AVI, MOV (Max 100MB)
          </p>
        </div>
      </div>
    </div>
  );
}
