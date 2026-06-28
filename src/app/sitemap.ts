import type { MetadataRoute } from 'next'
import { LEGAL_SLUGS } from '@/features/legal/legal-content'
import { SITE_URL } from '@/lib/seo'
import { routing } from '@/i18n/routing'

// Static, indexable routes (the confirmation page is intentionally excluded —
// it is noindex). Each entry lists its hreflang siblings so Google groups the
// /en and /de variants of every page.
const PATHS = ['', '/coaching', '/faq', ...LEGAL_SLUGS.map((s) => `/legal/${s}`)]

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${SITE_URL}/${routing.defaultLocale}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/coaching' ? 0.9 : 0.6,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
      ),
    },
  }))
}
