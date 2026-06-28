import type { Metadata } from 'next'
import { BookingPage } from '@/features/booking/booking-page'
import { buildMetadata, seoDict } from '@/lib/seo'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const seo = seoDict(locale)
  return buildMetadata({
    locale,
    path: '/coaching',
    title: seo.coaching.title,
    description: seo.coaching.description,
  })
}

export default function Page() {
  return <BookingPage />
}
