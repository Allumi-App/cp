import type { Metadata } from 'next'
import { redirect } from '@/i18n/navigation'
import { LegalPage } from '@/features/legal/legal-page'
import { LEGAL_SLUGS, isLegalSlug } from '@/features/legal/legal-content'
import { buildMetadata, seoDict } from '@/lib/seo'
import { en } from '@/i18n/en'
import { de } from '@/i18n/de'
import type { Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const seo = seoDict(locale)
  const tabs = (locale === 'de' ? de : en).legal.tabs
  const title = isLegalSlug(slug) ? tabs[slug] : seo.legal.title
  return buildMetadata({
    locale,
    path: `/legal/${isLegalSlug(slug) ? slug : LEGAL_SLUGS[0]}`,
    title,
    description: seo.legal.description,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  if (isLegalSlug(slug)) return <LegalPage slug={slug} />
  return redirect({ href: `/legal/${LEGAL_SLUGS[0]}`, locale })
}
