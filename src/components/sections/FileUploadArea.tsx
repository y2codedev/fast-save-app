import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

interface FileUploadAreaProps {
    onFileUpload: (file: File) => void;
    loading: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload, loading }) => {
    return (
        <div className="mb-6">
            <label className="flex flex-col  items-center justify-center w-full sm:h-96 h-72 border-2 border-dashed dark:hover:border-indigo-600 hover:border-indigo-600 border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="flex justify-center text-6xl text-gray-400">
                        <FiUploadCloud />
                    </div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG to SVG (MAX. 5MB)</p>
                </div>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    disabled={loading}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            onFileUpload(e.target.files[0]);
                        }
                    }}
                    className="hidden"
                />
            </label>
        </div>
    );
};

export default FileUploadArea;