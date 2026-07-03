import { Link } from '@/i18n/navigation'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { FloatingGradient } from '@/components/shared/floating-gradient'
import { btnPrimary } from '@/lib/ui'

export function HeroSection() {
  const { d } = useLang()
  const hero = d.hero

  return (
    <section className="relative flex items-center overflow-clip bg-cream py-16 md:py-24 lg:min-h-[88vh] lg:py-28">
      {/* Signature rose blob — floats across the whole hero (matches allumi-website) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatingGradient variant="large" />
      </div>

      <Container className="relative">
        <div className="flex max-w-4xl flex-col items-start">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-dark/50">
            {hero.eyebrow}
          </p>

          <h1 className="pt-7 font-serif font-bold tracking-[-0.03em] text-dark">
            <span className="block text-[44px] leading-[1.06] md:text-[64px] lg:text-[96px] lg:leading-[1.05]">
              {hero.titleLine1}
            </span>
            <span className="block text-[44px] font-normal italic leading-[1.06] tracking-[-0.02em] text-gold md:text-[64px] lg:text-[96px] lg:leading-[1.05]">
              {hero.titleAccent}
            </span>
          </h1>

          <p className="max-w-[560px] pt-6 text-base leading-[26px] text-dark/65 sm:pt-7 sm:text-[21px] sm:leading-[33px]">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-8 sm:gap-6 sm:pt-9">
            <Link href="/coaching" className={btnPrimary}>
              {hero.ctaPrimary}
            </Link>
            <a href="#coaching" className="flex items-center gap-2 text-sm font-semibold text-dark sm:gap-2.5 sm:text-base">
              {hero.ctaSecondary}
              <span className="text-gold">→</span>
            </a>
          </div>

          <p className="pt-9 text-sm font-medium tracking-[0.01em] text-dark/50">{hero.trust}</p>
        </div>
      </Container>
    </section>
  )
}
