import type { Metadata } from 'next'
import { en } from '@/i18n/en'
import { de } from '@/i18n/de'
import type { Locale } from '@/i18n/routing'

// Canonical production origin. Override per-environment with NEXT_PUBLIC_SITE_URL
// (e.g. a preview deployment) — defaults to the live domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://christinapfeiffer.de'
).replace(/\/$/, '')

export const SITE_NAME = 'Christina Pfeiffer'

const DICTS = { en, de } as const

const OG_LOCALE = { en: 'en_US', de: 'de_DE' } as const

// Localized SEO copy for a locale (page titles/descriptions live in the dicts).
export function seoDict(locale: Locale) {
  return DICTS[locale].seo
}

// Absolute, locale-prefixed URL for a given path ('' === home).
export function localeUrl(locale: Locale, path = ''): string {
  const clean = path === '/' ? '' : path
  return `${SITE_URL}/${locale}${clean}`
}

// hreflang map for a path across every locale (+ x-default → English).
function languageAlternates(path = ''): Record<string, string> {
  return {
    en: localeUrl('en', path),
    de: localeUrl('de', path),
    'x-default': localeUrl('en', path),
  }
}

type BuildArgs = {
  locale: Locale
  /** Locale-agnostic path, e.g. '/faq' or '' for home. */
  path?: string
  /** Page title (template adds "| Christina Pfeiffer"). Omit for the site default. */
  title?: string
  description?: string
  /** Set false for thin/utility pages (confirmation) so they aren't indexed. */
  index?: boolean
}

// Single source of truth for per-page metadata: canonical, hreflang, Open Graph
// and Twitter cards, all locale-aware.
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  index = true,
}: BuildArgs): Metadata {
  const seo = DICTS[locale].seo
  const desc = description ?? seo.description
  const canonical = localeUrl(locale, path)
  const ogTitle = title ? `${title} | ${SITE_NAME}` : seo.defaultTitle

  return {
    // Omit when absent so the locale layout's title.default applies (an explicit
    // `title: undefined` would instead blank the tag).
    ...(title ? { title } : {}),
    description: desc,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === 'de' ? 'en' : 'de'],
      url: canonical,
      title: ogTitle,
      description: desc,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: seo.defaultTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: desc,
      images: ['/og.png'],
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
  }
}
