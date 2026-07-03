'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { FloatingGradient } from '@/components/shared/floating-gradient'
import { getLegalSections, type LegalSlug } from './legal-content'

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const { d, lang, legal } = useLang()

  // Prefer the dashboard-managed document (markdown); fall back to the bundled
  // placeholder copy when the dashboard has no content for this slug.
  const doc = legal?.find((l) => l.slug === slug && l.content.trim().length > 0) ?? null
  const sections = doc ? [] : getLegalSections(slug, lang)
  const title = doc?.title?.trim() || d.legal.tabs[slug]

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
            {title}
          </h1>
          <p className="pt-4 text-[15px] text-dark/50">{d.legal.updated}</p>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          {doc ? (
            <div
              className={[
                'flex max-w-[770px] flex-col text-base leading-[26px] text-dark/65',
                '[&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-dark',
                '[&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-[26px] [&_h2]:text-dark',
                '[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-dark',
                '[&_h1:first-child]:mt-0 [&_h2:first-child]:mt-0',
                '[&_p]:mb-3 [&_p]:max-w-180',
                '[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1',
                '[&_a]:text-gold [&_a]:underline [&_strong]:font-semibold [&_strong]:text-dark [&_em]:italic',
                '[&_hr]:my-8 [&_hr]:border-[#2C18101A]',
              ].join(' ')}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.content}</ReactMarkdown>
            </div>
          ) : (
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
          )}
        </Container>
      </section>
    </>
  )
}
