import type { Metadata } from 'next'
import { BookingPage } from '@/features/booking/booking-page'

export const metadata: Metadata = { title: 'Book a session' }

export default function Page() {
  return <BookingPage />
}
