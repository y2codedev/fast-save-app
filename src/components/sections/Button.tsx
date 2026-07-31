"use client";

import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { ButtonProps } from "@/constants/types";
import { Loader } from "@/constants";

function Button({ onClick, isProcessing = false, label, icon }: ButtonProps) {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={isProcessing}
            className={`inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 border border-transparent cursor-pointer text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${isProcessing ? "opacity-75 cursor-not-allowed" : ""}`}
        >
            {isProcessing ? (
                <div className="flex items-center gap-2">
                    <Loader />
                    Please Wait...
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    {icon && <ArrowDownTrayIcon className="h-5 w-5" />}
                    {label}
                </div>
            )}
        </button>
    );
}

export default Button;