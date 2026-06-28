import type { Metadata } from 'next'
import { FaqPage } from '@/features/marketing/faq-page'
import { buildMetadata, seoDict } from '@/lib/seo'
import { en } from '@/i18n/en'
import { de } from '@/i18n/de'
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
    path: '/faq',
    title: seo.faq.title,
    description: seo.faq.description,
  })
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const items = (locale === 'de' ? de : en).faq.items

  // FAQPage structured data → eligible for FAQ rich results in search.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqPage />
    </>
  )
}
