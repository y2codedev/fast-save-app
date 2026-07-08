'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
  slot: string
  height?: string
  className?: string
}

export default function AdsenseAd({ slot, height = 'min-h-[280px]', className = '' }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' })
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (inView && clientId && !isDevelopment) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error('Error loading AdSense:', e);
      }
    }
  }, [inView, clientId, isDevelopment])

  // Always show a clean placeholder in local development to avoid ugly iframe errors
  if (isDevelopment) {
    return (
      <div className={`w-full ${height} ${className} flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl`}>
        <span className="text-gray-500 dark:text-gray-400 font-medium">Advertisement Placeholder</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">(Real ads will show in production)</span>
      </div>
    )
  }

  // Hide completely in production if IDs are missing
  if (!clientId || !slot) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`relative w-full ${height} ${className} flex flex-col justify-center items-center bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden`}
    >
      <span className="absolute top-0 left-0 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] px-2 py-0.5 rounded-br-lg z-10 opacity-70">
        Advertisement
      </span>
      
      {inView && (
        <div className="w-full h-full flex items-center justify-center pt-4">
          <ins
            className="adsbygoogle block w-full"
            style={{ display: 'block' }}
            data-ad-client={clientId}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}
    </div>
  )
}
