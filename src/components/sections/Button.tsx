"use client";

import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { ButtonProps } from "@/constants/types";
import { Loader } from "@/constants";

function Button({ onClick, isProcessing = false, labal, icon }: ButtonProps) {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={isProcessing}
            className="inline-flex items-center px-2 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-[8px] text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isProcessing ? (
                <div className="flex items-center gap-2">
                    <Loader />
                    Processing...
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    {icon && <ArrowDownTrayIcon className="h-5 w-5" />}
                    {labal}
                </div>
            )}
        </button>
    );
}

export default Button;
