'use client'

import { Link } from '@/i18n/navigation'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { FloatingGradient } from '@/components/shared/floating-gradient'
import { cn } from '@/lib/utils'
import { LEGAL_SLUGS, getLegalSections, type LegalSlug } from './legal-content'

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const { d, lang } = useLang()
  const sections = getLegalSections(slug, lang)

  return (
    <>
      {/* Header */}
      <section className="relative overflow-clip bg-cream px-0 pb-9 pt-16 lg:pt-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
            <FloatingGradient variant="small" />
          </div>
        </div>
        <Container className="relative">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-dark/50">
            {d.legal.eyebrow}
          </p>
          <h1 className="pt-4 font-serif text-[44px] font-bold tracking-[-0.03em] text-dark md:text-[62px]">
            {d.legal.tabs[slug]}
          </h1>
          <p className="pt-4 text-[15px] text-dark/50">{d.legal.updated}</p>
        </Container>
      </section>

      {/* Tabs */}
      <div className="sticky top-20 z-30 border-b border-[#2C18101F] bg-cream lg:top-24">
        <Container className="flex items-center gap-8 overflow-x-auto">
          {LEGAL_SLUGS.map((s) => (
            <Link
              key={s}
              href={`/legal/${s}`}
              className={cn(
                'shrink-0 border-b-2 pb-3.5 pt-4 text-base transition-colors',
                s === slug
                  ? 'border-gold font-semibold text-dark'
                  : 'border-transparent font-medium text-dark/45 hover:text-dark',
              )}
            >
              {d.legal.tabs[s]}
            </Link>
          ))}
        </Container>
      </div>

      {/* Body */}
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <div className="flex max-w-[770px] flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="font-serif text-xl font-bold leading-[26px] text-dark">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-1">
                  {section.lines.map((line, i) => (
                    <p key={i} className="max-w-180 text-base leading-[26px] text-dark/65">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
