'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
  slot: string
  height?: string 
  className?: string
}

export default function AdsenseAd({ slot, height = 'h-[280px]', className = '' }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID

  useEffect(() => {
    if (inView) {
      try {
        //@ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('Adsense error', e)
      }
    }
  }, [inView])

  return (
    <div
      ref={ref}
      className={`w-full ${height} ${className} flex justify-center items-center bg-gray-100 dark:bg-gray-800`}
    >
      {inView && (
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  )
}
