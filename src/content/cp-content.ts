import { supabase } from '@/lib/supabase'
import type { Dictionary } from '@/i18n/en'
import type { Lang } from '@/i18n/language-context'
import type { SessionPackage, PackageId } from '@/features/booking/booking-config'

type Row = Record<string, unknown>

export interface DbRows {
  sections: Row[]
  pillars: Row[]
  testimonials: Row[]
  aboutStats: Row[]
  faq: Row[]
  packages: Row[]
  social: Row[]
  store: Row[]
  show: Row[]
  ecosystem: Row[]
  legal: Row[]
}

export interface CpImages {
  about: string | null
  allumi: string | null
  show: string | null
}

export interface CpLink {
  platform: string
  title?: string
  url: string
  badge?: string | null
}

export interface CpLinks {
  social: CpLink[]
  store: CpLink[]
  show: CpLink[]
}

/** A legal document (Impressum/Datenschutz/etc.) — markdown body per language. */
export interface CpLegalDoc {
  slug: string
  title: string
  content: string
}

export interface CpContent {
  d: Dictionary
  images: CpImages
  links: CpLinks | null
  packages: SessionPackage[] | null
  /** Dashboard-managed legal documents (null → fall back to bundled copy). */
  legal: CpLegalDoc[] | null
  /** Ordered, visible home-section keys (mirrors the dashboard's drag order). */
  sectionOrder: string[]
}

/** Home sections in their default order (used as the fallback when no CMS rows). */
export const DEFAULT_SECTION_ORDER = [
  'hero',
  'approach',
  'ecosystem',
  'allumi',
  'show',
  'testimonials',
  'about',
  'final_cta',
] as const

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const arr = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []

function pick(row: Row, base: string, lang: Lang): string {
  const en = str(row[base])
  const de = str(row[`${base}_de`])
  return lang === 'de' ? de || en : en
}

/** Fetch all CP content tables in parallel. Returns null when Supabase is unconfigured. */
export async function fetchCpContent(): Promise<DbRows | null> {
  if (!supabase) return null
  try {
    const [sections, pillars, testimonials, aboutStats, faq, packages, social, store, show, ecosystem, legal] =
      await Promise.all([
        supabase.from('sections').select('*').order('display_order'),
        supabase.from('approach_pillars').select('*').order('display_order'),
        supabase.from('testimonials').select('*').order('display_order'),
        supabase.from('about_stats').select('*').order('display_order'),
        supabase.from('faq_items').select('*').eq('is_visible', true).order('display_order'),
        supabase.from('packages').select('*').eq('is_visible', true).order('display_order'),
        supabase.from('social_links').select('*').order('display_order'),
        supabase.from('store_links').select('*').order('display_order'),
        supabase.from('show_platforms').select('*').order('display_order'),
        supabase.from('ecosystem_cards').select('*').eq('is_visible', true).order('display_order'),
        supabase.from('legal_documents').select('*').order('display_order'),
      ])
    return {
      sections: sections.data ?? [],
      pillars: pillars.data ?? [],
      testimonials: testimonials.data ?? [],
      aboutStats: aboutStats.data ?? [],
      faq: faq.data ?? [],
      packages: packages.data ?? [],
      social: social.data ?? [],
      store: store.data ?? [],
      show: show.data ?? [],
      ecosystem: ecosystem.data ?? [],
      legal: legal.data ?? [],
    }
  } catch {
    return null
  }
}

const emptyImages: CpImages = { about: null, allumi: null, show: null }

/** Merge DB rows over the bundled dictionary for the given language. */
export function buildContent(local: Dictionary, rows: DbRows | null, lang: Lang): CpContent {
  if (!rows)
    return {
      d: local,
      images: emptyImages,
      links: null,
      packages: null,
      legal: null,
      sectionOrder: [...DEFAULT_SECTION_ORDER],
    }

  const d: Dictionary = structuredClone(local)
  const S: Record<string, Row> = Object.fromEntries(
    rows.sections.map((s) => [str(s.section_key), s]),
  )
  const set = (obj: Record<string, unknown>, key: string, value: string) => {
    if (value) obj[key] = value
  }

  // hero
  if (S.hero) {
    const s = S.hero
    set(d.hero, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.hero, 'titleLine1', pick(s, 'title', lang))
    set(d.hero, 'titleAccent', pick(s, 'title_accent', lang))
    set(d.hero, 'subtitle', pick(s, 'subtitle', lang))
    set(d.hero, 'ctaPrimary', pick(s, 'cta_primary', lang))
    set(d.hero, 'ctaSecondary', pick(s, 'cta_secondary', lang))
    set(d.hero, 'trust', pick(s, 'trust', lang))
  }

  // approach (+ pillars)
  if (S.approach) {
    const s = S.approach
    set(d.approach, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.approach, 'titleLine1', pick(s, 'title', lang))
    set(d.approach, 'titleAccent', pick(s, 'title_accent', lang))
    set(d.approach, 'titleLine2', pick(s, 'title_suffix', lang))
    set(d.approach, 'body', pick(s, 'subtitle', lang))
    set(d.approach, 'intro', pick(s, 'body', lang))
    set(d.approach, 'cta', pick(s, 'cta_primary', lang))
  }
  if (rows.pillars.length) {
    d.approach.columns = rows.pillars.map((p) => ({
      label: pick(p, 'label', lang),
      title: pick(p, 'title', lang),
      body: pick(p, 'body', lang),
    }))
  }

  // ecosystem (header + product cards)
  if (S.ecosystem) {
    const s = S.ecosystem
    set(d.ecosystem, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.ecosystem, 'titleLine1', pick(s, 'title', lang))
    set(d.ecosystem, 'titleAccent', pick(s, 'title_accent', lang))
    set(d.ecosystem, 'body', pick(s, 'subtitle', lang))
  }
  if (rows.ecosystem.length) {
    d.ecosystem.cards = rows.ecosystem.map((c) => ({
      product: str(c.product),
      title: pick(c, 'title', lang),
      description: pick(c, 'description', lang),
      cta: pick(c, 'cta_label', lang),
      url: str(c.url),
    }))
  }

  // allumi
  if (S.allumi) {
    const s = S.allumi
    set(d.allumi, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.allumi, 'titleLine1', pick(s, 'title', lang))
    set(d.allumi, 'titleAccent', pick(s, 'title_accent', lang))
    set(d.allumi, 'body', pick(s, 'subtitle', lang))
    set(d.allumi, 'link', pick(s, 'cta_secondary', lang))
  }

  // show (+ platform names)
  if (S.show) {
    const s = S.show
    set(d.show, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.show, 'titleLine1', pick(s, 'title', lang))
    set(d.show, 'titleAccent', pick(s, 'title_accent', lang))
    set(d.show, 'body', pick(s, 'subtitle', lang))
  }
  if (rows.show.length) {
    d.show.platforms = rows.show.map((p) => str(p.platform))
  }

  // testimonials
  if (S.testimonials) {
    const s = S.testimonials
    set(d.testimonials, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.testimonials, 'titleLine1', pick(s, 'title', lang))
    set(d.testimonials, 'titleAccent', pick(s, 'title_accent', lang))
  }
  if (rows.testimonials.length) {
    d.testimonials.items = rows.testimonials.map((t) => ({
      quote: pick(t, 'quote', lang),
      name: str(t.name),
      tag: pick(t, 'tag', lang),
    }))
  }

  // about (+ stats)
  if (S.about) {
    const s = S.about
    set(d.about, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.about, 'titleLine1', pick(s, 'title', lang))
    set(d.about, 'titleAccent', pick(s, 'title_accent', lang))
    set(d.about, 'badge', pick(s, 'trust', lang))
    const paras = [pick(s, 'subtitle', lang), pick(s, 'body', lang)].filter(Boolean)
    if (paras.length) d.about.paragraphs = paras
  }
  if (rows.aboutStats.length) {
    d.about.stats = rows.aboutStats.map((st) => ({ value: str(st.value), label: pick(st, 'label', lang) }))
  }

  // final CTA
  if (S.final_cta) {
    const s = S.final_cta
    set(d.finalCta, 'eyebrow', pick(s, 'eyebrow', lang))
    set(d.finalCta, 'title', pick(s, 'title', lang))
    set(d.finalCta, 'body', pick(s, 'subtitle', lang))
    set(d.finalCta, 'cta', pick(s, 'cta_primary', lang))
    set(d.finalCta, 'newsletterNote', pick(s, 'cta_secondary', lang))
  }

  // footer
  if (S.footer) {
    const s = S.footer
    set(d.footer, 'tagline', pick(s, 'subtitle', lang))
    set(d.footer, 'copyright', pick(s, 'body', lang))
  }

  // faq
  if (rows.faq.length) {
    d.faq.items = rows.faq.map((f) => ({ q: pick(f, 'question', lang), a: pick(f, 'answer', lang) }))
  }

  const images: CpImages = {
    about: (S.about?.image_url as string) || null,
    allumi: (S.allumi?.image_url as string) || null,
    show: (S.show?.image_url as string) || null,
  }

  const links: CpLinks = {
    social: rows.social.map((r) => ({ platform: str(r.platform), title: str(r.title), url: str(r.url) })),
    store: rows.store.map((r) => ({ platform: str(r.platform), url: str(r.url), badge: (r.badge_image_url as string) || null })),
    show: rows.show.map((r) => ({ platform: str(r.platform), url: str(r.url) })),
  }

  // Legal documents — dashboard markdown per language (empty bodies fall through
  // to the bundled placeholder copy at render time).
  const legal: CpLegalDoc[] = rows.legal.map((r) => ({
    slug: str(r.slug),
    title: pick(r, 'title', lang),
    content: pick(r, 'content', lang),
  }))

  // Visible home sections in dashboard order; footer is rendered separately.
  const homeKeys = new Set(DEFAULT_SECTION_ORDER as readonly string[])
  const orderedSections = rows.sections
    .filter((s) => homeKeys.has(str(s.section_key)) && s.is_visible !== false)
    .slice()
    .sort((a, b) => Number(a.display_order ?? 0) - Number(b.display_order ?? 0))
    .map((s) => str(s.section_key))
  const sectionOrder = orderedSections.length ? orderedSections : [...DEFAULT_SECTION_ORDER]

  const packages: SessionPackage[] | null = rows.packages.length
    ? rows.packages.map((p) => ({
        id: str(p.slug) as PackageId,
        sessionCount: Number(p.session_count) || 1,
        price: Number(p.price_cents) || 0,
        currency: 'EUR' as const,
        duration: Number(p.duration) || 60,
        segment: { en: str(p.segment), de: str(p.segment_de) || str(p.segment) },
        name: { en: str(p.name), de: str(p.name_de) || str(p.name) },
        description: { en: str(p.description), de: str(p.description_de) || str(p.description) },
        included: { en: arr(p.included), de: arr(p.included_de).length ? arr(p.included_de) : arr(p.included) },
      }))
    : null

  return { d, images, links, packages, legal, sectionOrder }
}
