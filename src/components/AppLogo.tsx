import React from 'react';

interface AppLogoProps {
  className?: string;
  showText?: boolean;
  textClassName?: string;
  iconClassName?: string;
}

export default function AppLogo({ 
  className = "flex items-center gap-3", 
  showText = true, 
  textClassName = "text-xl md:text-2xl",
  iconClassName = "w-10 h-10 md:w-12 md:h-12"
}: AppLogoProps) {
  return (
    <div className={className}>
      {/* Premium Vector SVG Logo */}
      <svg 
        viewBox="0 0 100 100" 
        className={`${iconClassName} drop-shadow-md`} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Gradient */}
        <rect width="100" height="100" rx="22" fill="url(#bg-gradient)"/>
        
        {/* Dynamic Speed Lines */}
        <path d="M 18 36 L 28 36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 24 44 L 38 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 16 52 L 26 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 22 60 L 32 60" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 28 68 L 38 68" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* The slanted bold 'F' */}
        <path d="M 36 74 L 46 28 L 74 28 L 70 41 L 55 41 L 52 52 L 67 52 L 63 64 L 49 64 L 46 74 Z" 
              fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
        
        {/* Premium Sparkle */}
        <path d="M 75 20 Q 82 20 82 12 Q 82 20 89 20 Q 82 20 82 28 Q 82 20 75 20 Z" fill="white"/>

        {/* --- Tool Category Indicators --- */}
        
        {/* Image Tool (Purple) */}
        <rect x="16" y="80" width="14" height="14" rx="3" fill="#8B5CF6"/>
        <path d="M 18 91 L 22 85 L 24.5 88 L 27 83 L 29 91 Z" fill="white"/>
        <circle cx="26" cy="84" r="1.5" fill="white"/>
        
        {/* Video Tool (Orange) */}
        <rect x="34" y="80" width="14" height="14" rx="3" fill="#F97316"/>
        <path d="M 39 83 L 39 91 L 44 87 Z" fill="white"/>
        
        {/* PDF Tool (Green) */}
        <rect x="52" y="80" width="14" height="14" rx="3" fill="#10B981"/>
        <path d="M 55.5 84 L 62.5 84 M 55.5 87 L 62.5 87 M 55.5 90 L 59.5 90" 
              stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        
        {/* Social Tool (Blue) */}
        <rect x="70" y="80" width="14" height="14" rx="3" fill="#3B82F6"/>
        <path d="M 74 87 L 79 84 M 74 87 L 79 90" stroke="white" strokeWidth="1.2" />
        <circle cx="74" cy="87" r="1.5" fill="white" />
        <circle cx="79" cy="84" r="1.5" fill="white" />
        <circle cx="79" cy="90" r="1.5" fill="white" />

        <defs>
          <linearGradient id="bg-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6C5CE7"/>
            <stop offset="1" stopColor="#4A90E2"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Logotype Text */}
      {showText && (
        <div className={`font-black tracking-tight ${textClassName}`}>
          <span className="text-gray-900 dark:text-white">Fast</span>
          <span className="bg-gradient-to-r from-[#6C5CE7] to-[#4A90E2] bg-clip-text text-transparent">Save</span>
        </div>
      )}
    </div>
  );
}
