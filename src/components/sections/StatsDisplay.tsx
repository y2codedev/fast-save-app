import bytesToSize from "@/utils/bytes-to-size";

interface StatsDisplayProps {
    compressionRatio: number;
    originalSize?: number;
    compressedSize?: number;
}

const StatsDisplay = ({ compressionRatio, originalSize, compressedSize }: StatsDisplayProps) => (
    <div className="p-4 mb-8 text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto shadow-sm">
        {compressionRatio >= 0 ? (
            <p className="text-indigo-800 dark:text-gray-300 font-semibold text-lg">
                Success! Reduced file size by <span className="text-indigo-600 font-bold">{compressionRatio}%</span>
            </p>
        ) : (
            <p className="text-orange-800 dark:text-orange-300 font-semibold text-lg">
                File size increased by <span className="text-orange-600 font-bold">{Math.abs(compressionRatio)}%</span>
            </p>
        )}
        
        {originalSize && compressedSize && (
            <div className="flex items-center justify-center gap-4 mt-3 text-sm font-medium">
                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-md text-gray-600 dark:text-gray-300">
                    {bytesToSize(originalSize)}
                </span>
                <span className="text-gray-400">→</span>
                <span className="bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-md text-green-700 dark:text-green-400">
                    {bytesToSize(compressedSize)}
                </span>
            </div>
        )}

        {compressionRatio > 70 ? (
            <p className="text-green-600 dark:text-green-400 text-sm mt-3 font-medium">Excellent compression!</p>
        ) : compressionRatio > 40 ? (
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-3 font-medium">Good compression</p>
        ) : compressionRatio >= 0 ? (
            <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-3 font-medium">Moderate compression</p>
        ) : (
            <p className="text-orange-600 dark:text-orange-400 text-sm mt-3 font-medium">Image size increased due to resizing or format changes</p>
        )}
    </div>
)

export default StatsDisplay;