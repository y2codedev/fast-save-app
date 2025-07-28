interface StatsDisplayProps {
    compressionRatio: number
}

const StatsDisplay = ({ compressionRatio }: StatsDisplayProps) => (
    <div className="p-4 mb-8 text-center">
        <p className="text-indigo-800 dark:text-gray-300 font-semibold">
            Success! Reduced file size by <span className="text-indigo-600 dark:text-indigo-600">{compressionRatio}%</span>
        </p>
        {compressionRatio > 70 ? (
            <p className="text-green-600 dark:text-green-400 text-sm mt-1">Excellent compression!</p>
        ) : compressionRatio > 40 ? (
            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">Good compression</p>
        ) : (
            <p className="text-yellow-600 dark:text-yellow-400 text-sm mt-1">Moderate compression</p>
        )}
    </div>
)

export default StatsDisplay;