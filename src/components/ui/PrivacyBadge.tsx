import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface PrivacyBadgeProps {
  className?: string;
  text?: string;
}

export default function PrivacyBadge({ 
  className = '',
  text = 'Your file is processed locally in your browser and never uploaded to our servers.' 
}: PrivacyBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 ${className}`}>
      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span><strong className="font-semibold">Private by design:</strong> {text}</span>
    </div>
  );
}
