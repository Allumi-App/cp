import type { Metadata } from 'next'
import { ConfirmationPage } from '@/features/booking/confirmation-page'
import { buildMetadata, seoDict } from '@/lib/seo'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const seo = seoDict(locale)
  // Utility page — noindex so it never competes with the booking page in search.
  return buildMetadata({
    locale,
    path: '/coaching/confirmation',
    title: seo.confirmation.title,
    description: seo.confirmation.description,
    index: false,
  })
}

export default function Page() {
  return <ConfirmationPage />
}
