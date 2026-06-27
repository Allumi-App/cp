'use client'

import type { ComponentType } from 'react'
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
  return (
    <>
      {sectionOrder.map((key) => {
        const Section = SECTIONS[key]
        return Section ? <Section key={key} /> : null
      })}
    </>
  )
}
