"use client";

import { Button } from '@/constants';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleGoHome = () => {
        router.replace('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100">
                        404
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200">
                        Page Not Found
                    </h2>
                    <p className="md:text-lg text-sm text-gray-500 dark:text-gray-400">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="pt-4">
                    <Button
                        onClick={handleGoHome}
                        labal='Return to Home'
                        icon={false}
                        isProcessing={false}
                    />
                </div>
            </div>
        </div>
    );
}