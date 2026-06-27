import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Toaster } from 'sonner'
import { routing } from '@/i18n/routing'
import { fetchCpContent } from '@/content/cp-content'
import { LanguageProvider } from '@/i18n/language-context'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ScrollManager } from '@/components/layout/scroll-manager'

// Prebuild both locales; everything else is ISR (dashboard edits/reorders show
// within ~1 min). The bundled i18n dictionary is the guaranteed fallback.
export const revalidate = 60

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
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

  const messages = await getMessages()
  // Mirror allumi-website: fetch CMS content server-side for SSR + ISR.
  const initialRows = await fetchCpContent()

  return (
    <NextIntlClientProvider messages={messages}>
      <LanguageProvider initialRows={initialRows}>
        <ScrollManager />
        <div className="flex min-h-screen flex-col bg-cream">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="bottom-right" richColors />
      </LanguageProvider>
    </NextIntlClientProvider>
  )
}
