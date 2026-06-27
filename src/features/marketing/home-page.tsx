import { HeroSection } from './sections/hero-section'
import { ApproachSection } from './sections/approach-section'
import { AllumiSection } from './sections/allumi-section'
import { ShowSection } from './sections/show-section'
import { TestimonialsSection } from './sections/testimonials-section'
import { AboutSection } from './sections/about-section'
import { FinalCtaSection } from './sections/final-cta-section'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ApproachSection />
      <AllumiSection />
      <ShowSection />
      <TestimonialsSection />
      <AboutSection />
      <FinalCtaSection />
    </>
  )
}
