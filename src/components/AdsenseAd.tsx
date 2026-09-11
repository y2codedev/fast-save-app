'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from '@/i18n/routing'
import { canShowAds, ADS_CLIENT_ID } from '@/lib/advertising'
import { useInView } from 'react-intersection-observer'

type Props = {
  slot?: string
  height?: string
  className?: string
}

export default function AdsenseAd({ slot, height = 'min-h-[280px]', className = '' }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px 0px' })
  const clientId = ADS_CLIENT_ID
  const pathname = usePathname()
  const allowed = canShowAds(pathname) && !!slot
  const adRef = useRef<HTMLModElement>(null)
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (allowed && inView && clientId && !isDevelopment) {
      const timer = setTimeout(() => {
        try {
          const ad = adRef.current;
          if (ad && ad.offsetWidth > 0 && !ad.hasAttribute('data-adsbygoogle-status')) {
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({});
          }
        } catch (e) {
          console.error('Error loading AdSense:', e);
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [allowed, inView, clientId, isDevelopment])

  if (!allowed) return null;

  // Always show a clean placeholder in local development
  if (isDevelopment) {
    return (
      <div className={`w-full ${height} ${className} flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-2`}>
        <span className="text-gray-500 dark:text-gray-400 font-medium text-center">Advertisement Placeholder</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center leading-tight">(Real ads will show in production via Auto Ads & AdSense)</span>
      </div>
    )
  }

  // Hide completely in production if slot or clientId is missing
  if (!clientId || !slot) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`relative w-full ${height} ${className} flex flex-col justify-center items-center bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden`}
    >
      <span className="absolute top-0 start-0 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-[10px] px-2 py-0.5 rounded-ee-lg z-10 opacity-80">
        Advertisement
      </span>
      
      {inView && (
        <div className="w-full h-full flex items-center justify-center pt-4">
          <ins
            ref={adRef}
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
