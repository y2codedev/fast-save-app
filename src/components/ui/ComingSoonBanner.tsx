'use client';

import { Clock } from 'lucide-react';

const ComingSoonBanner = () => {
    return (
        <div className="w-full z-50 bg-indigo-600 text-white py-4  flex items-center justify-center">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold text-sm">This feature is coming soon — stay tuned!</span>
        </div>
    );
};

export default ComingSoonBanner;