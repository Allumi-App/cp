'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { useLocale } from 'next-intl'
import { en, type Dictionary } from './en'
import { de } from './de'
import { usePathname, useRouter } from './navigation'
import { fetchCpContent, buildContent, type DbRows, type CpImages, type CpLinks, type CpLegalDoc } from '@/content/cp-content'
import type { SessionPackage } from '@/features/booking/booking-config'

export type Lang = 'en' | 'de'

const DICTIONARIES: Record<Lang, Dictionary> = { en, de }

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  /** Typed dictionary for the current language — DB content merged over the bundled defaults. */
  d: Dictionary
  /** Convenience resolver for dot-paths to scalar strings, e.g. t('hero.eyebrow'). */
  t: (path: string) => string
  /** Section images from the CMS (null → use the component's bundled fallback). */
  images: CpImages
  /** Footer / store / show links from the CMS (null while loading or unconfigured). */
  links: CpLinks | null
  /** Booking packages from the CMS (null → use the bundled booking-config). */
  packages: SessionPackage[] | null
  /** Dashboard-managed legal documents (null → use bundled placeholder copy). */
  legal: CpLegalDoc[] | null
  /** Visible home-section keys in dashboard drag order. */
  sectionOrder: string[]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  children,
  initialRows = null,
}: {
  children: ReactNode
  /** Content fetched server-side (mirrors allumi-website). Null → client refetch fallback. */
  initialRows?: DbRows | null
}) {
  // The active language is the URL locale (/en or /de), exactly like
  // allumi-website — next-intl owns it, so there is no localStorage state.
  const lang = useLocale() as Lang
  const router = useRouter()
  const pathname = usePathname()
  const [rows, setRows] = useState<DbRows | null>(initialRows)

  // Frontend fallback: if the server didn't supply content (fetch failed or
  // Supabase unconfigured at render time), retry on the client.
  useEffect(() => {
    if (initialRows) return
    let active = true
    fetchCpContent().then((r) => {
      if (active && r) setRows(r)
    })
    return () => {
      active = false
    }
  }, [initialRows])

  // Switching language navigates to the same path under the other locale.
  const setLang = useCallback(
    (next: Lang) => {
      router.replace(pathname, { locale: next, scroll: false })
    },
    [router, pathname],
  )

  const toggle = useCallback(() => {
    setLang(lang === 'en' ? 'de' : 'en')
  }, [lang, setLang])

  const content = useMemo(() => buildContent(DICTIONARIES[lang], rows, lang), [lang, rows])
  const { d, images, links, packages, legal, sectionOrder } = content

  const t = useCallback(
    (path: string): string => {
      const value = path.split('.').reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
          return (acc as Record<string, unknown>)[key]
        }
        return undefined
      }, d)
      return typeof value === 'string' ? value : path
    },
    [d],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, d, t, images, links, packages, legal, sectionOrder }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
