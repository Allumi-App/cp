import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { Toaster } from 'sonner'
import { routing, type Locale } from '@/i18n/routing'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})
import { en } from '@/i18n/en'
import { de } from '@/i18n/de'
import { fetchCpContent } from '@/content/cp-content'
import { LanguageProvider } from '@/i18n/language-context'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollManager } from '@/components/layout/scroll-manager'
import { SITE_NAME, SITE_URL, localeUrl } from '@/lib/seo'

// Prebuild both locales; everything else is ISR (dashboard edits/reorders show
// within ~1 min). The bundled i18n dictionary is the guaranteed fallback.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// Locale-aware site defaults: the title template + fallback title/description and
// base Open Graph locale. Individual pages refine canonical/OG via buildMetadata.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const seo = (locale === 'de' ? de : en).seo
  return {
    title: {
      default: seo.defaultTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description: seo.description,
    applicationName: SITE_NAME,
    alternates: {
      canonical: localeUrl(locale as Locale),
      languages: {
        en: localeUrl('en'),
        de: localeUrl('de'),
        'x-default': localeUrl('en'),
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: localeUrl(locale as Locale),
      title: seo.defaultTitle,
      description: seo.description,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: seo.defaultTitle }],
    },
    twitter: { card: 'summary_large_image', images: ['/og.png'] },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as 'en' | 'de')) notFound()

  // Enable static rendering for this locale (next-intl) — without this, reading
  // translations forces every page to render dynamically.
  setRequestLocale(locale)

  const messages = await getMessages()
  // Mirror allumi-website: fetch CMS content server-side for SSR + ISR.
  const initialRows = await fetchCpContent()

  const seo = (locale === 'de' ? de : en).seo
  const sameAs = (initialRows?.social ?? [])
    .map((s) => (typeof s.url === 'string' ? s.url : ''))
    .filter((u) => u.startsWith('http'))

  // Organization / Person / WebSite graph so Google can build a knowledge panel
  // and rich results. Emitted on every page; sameAs uses the live social links.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#christina`,
        name: 'Christina Pfeiffer',
        jobTitle: locale === 'de' ? 'Transformations-Coach' : 'Transformation Coach',
        url: localeUrl(locale as Locale),
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: SITE_NAME,
        description: seo.description,
        url: localeUrl(locale as Locale),
        image: `${SITE_URL}/og.png`,
        provider: { '@id': `${SITE_URL}/#christina` },
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'German'],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
        publisher: { '@id': `${SITE_URL}/#christina` },
      },
    ],
  }

  return (
    <html lang={locale} className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider initialRows={initialRows}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ScrollManager />
            <div className="flex min-h-screen flex-col bg-cream">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="bottom-right" richColors />
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
