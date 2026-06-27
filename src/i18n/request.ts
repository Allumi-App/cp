import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// The CP site renders copy from its own typed dictionaries (en.ts/de.ts) merged
// with CMS rows, so next-intl only supplies the active locale. Messages are kept
// minimal to satisfy the provider.
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as 'en' | 'de')) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
