"use client";

export function LyricsDisplay({ lyrics }: { lyrics: string }) {
  return (
    <div>
      <h3 className="text-sm sm:text-base text-gray-800 dark:text-white mb-3 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        Lyrics
      </h3>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 h-fit overflow-y-auto">
        <pre className="font-sans text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {lyrics}
        </pre>
      </div>
    </div>
  );
}