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
      {/* New Logo Image */}
      <img 
        src="/images/logo.png" 
        alt="ConvertAllNow Logo"
        className={`${iconClassName} drop-shadow-sm object-contain`} 
      />

      {/* Logotype Text */}
      {showText && (
        <div className={`font-black tracking-tight ${textClassName}`}>
          <span className="text-gray-900 dark:text-white">Convert</span>
          <span className="bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] bg-clip-text text-transparent">AllNow</span>
        </div>
      )}
    </div>
  );
}
