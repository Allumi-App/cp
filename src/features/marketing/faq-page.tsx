'use client'

import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { Accordion } from '@/components/ui/accordion'
import { btnPrimary } from '@/lib/ui'

export function FaqPage() {
  const { d } = useLang()
  const faq = d.faq

  return (
    <>
      {/* Header */}
      <section className="relative overflow-clip bg-cream pt-16 pb-16 lg:pt-22 lg:pb-20">
        <Container className="relative">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-dark/50">
            {faq.eyebrow}
          </p>
          <h1 className="flex flex-wrap items-baseline gap-x-4 pt-4.5 font-serif text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-dark md:text-[62px]">
            {faq.titleLine1} <span className="font-normal italic text-gold">{faq.titleAccent}</span>
          </h1>
          <p className="max-w-140 pt-4.5 text-base leading-[26px] text-dark/65 sm:text-lg sm:leading-7">{faq.subtitle}</p>
        </Container>
      </section>

      {/* List */}
      <section className="bg-cream pb-16">
        <Container>
          <div className="max-w-230">
            <Accordion items={faq.items} />
          </div>
        </Container>
      </section>

      {/* CTA card */}
      <section className="bg-cream pt-6 pb-20 lg:pb-22">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 rounded-[20px] bg-card-warm px-6 py-8 shadow-[0_1px_4px_#2C18100F,0_4px_16px_#2C18100D] md:flex-row md:items-center md:px-11 md:py-10">
            <div className="flex flex-col gap-2">
              <p className="font-serif text-[26px] font-bold leading-8 text-dark">{faq.ctaTitle}</p>
              <p className="text-base leading-6 text-dark/65">{faq.ctaBody}</p>
            </div>
            <a href="mailto:hello@christinapfeiffer.com" className={`${btnPrimary} shrink-0`}>
              {faq.ctaButton}
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
