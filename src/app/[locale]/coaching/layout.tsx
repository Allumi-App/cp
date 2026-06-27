'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { BookingProvider } from '@/features/booking/booking-context'

export default function CoachingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <BookingProvider>
      <div className="bg-cream">{children}</div>
    </BookingProvider>
  )
}
