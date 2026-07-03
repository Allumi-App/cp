'use client'

import { Fragment, type ComponentType } from 'react'
import { useLang } from '@/i18n/language-context'
import { HeroSection } from './sections/hero-section'
import { ApproachSection } from './sections/approach-section'
import { AllumiSection } from './sections/allumi-section'
import { ShowSection } from './sections/show-section'
import { TestimonialsSection } from './sections/testimonials-section'
import { AboutSection } from './sections/about-section'
import { FinalCtaSection } from './sections/final-cta-section'

// Section key → component. The order the sections render in is driven by the
// dashboard (sections.display_order), so dragging to reorder reflects on the site.
const SECTIONS: Record<string, ComponentType> = {
  hero: HeroSection,
  approach: ApproachSection,
  allumi: AllumiSection,
  show: ShowSection,
  testimonials: TestimonialsSection,
  about: AboutSection,
  final_cta: FinalCtaSection,
}

export function HomePage() {
  const { sectionOrder } = useLang()
  const sections = sectionOrder.filter((key) => SECTIONS[key])
  return (
    <>
      {sections.map((key, i) => {
        const Section = SECTIONS[key]
        return (
          <Fragment key={key}>
            {/* Inset hairline between sections — aligned to content gutters,
                not full-bleed (matches allumi-website). */}
            {i > 0 && (
              <div className="px-4 md:px-10 lg:px-20">
                <div className="h-px bg-[#2C18101A]" />
              </div>
            )}
            <Section />
          </Fragment>
        )
      })}
    </>
  )
}
