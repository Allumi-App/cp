import type { Metadata } from 'next'
import { HomePage } from '@/features/marketing/home-page'
import { buildMetadata, seoDict } from '@/lib/seo'
import type { Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({ locale, path: '', description: seoDict(locale).home.description })
}

export default function Page() {
  return <HomePage />
}
