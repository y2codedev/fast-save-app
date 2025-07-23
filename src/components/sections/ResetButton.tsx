import { ButtonProps } from "@/constants/types";
import React from "react";

export default function ResetButton({ onClick, isProcessing, labal }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {labal}
        </button>
    );
}
