import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { btnDark } from '@/lib/ui'

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg width="9" height="11" viewBox="0 0 14 16" className={className}>
      <path d="M0 0l14 8L0 16z" fill="currentColor" />
    </svg>
  )
}

/** Compact dark iPhone frame that hosts the app / podcast screens. */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[300px] w-[150px] rounded-[30px] bg-dark p-2 shadow-xl">
      <div className="flex h-full w-full flex-col overflow-clip rounded-[24px] bg-cream">
        {children}
      </div>
    </div>
  )
}

function AppMock() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-3.5 py-4">
        <p className="font-serif text-[11px] font-bold tracking-[0.18em] text-dark">ALLUMI</p>
        <p className="pt-1 text-[8px] leading-3 text-dark/55">Good morning, Christina</p>
        <div
          className="mt-3 flex flex-col gap-0.5 rounded-[14px] p-3"
          style={{ background: 'linear-gradient(150deg, #F5DAC8 0%, #C87B82 100%)' }}
        >
          <p className="text-[7px] font-semibold uppercase tracking-[0.15em] text-dark/55">
            Today&apos;s journey
          </p>
          <p className="pt-0.5 font-serif text-[12px] font-bold leading-[15px] text-dark">
            Love &amp; Relationships
          </p>
          <p className="text-[9px] italic leading-3 text-dark/80">Your open heart.</p>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-[12px] bg-white p-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold">
            <PlayGlyph className="text-white" />
          </span>
          <span className="flex flex-col">
            <span className="text-[8px] font-semibold text-dark">Morning Reset</span>
            <span className="text-[7px] text-dark/50">Breathwork · 8 min</span>
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}

function PodcastMock() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col items-center px-3.5 py-4">
        <p className="self-start text-[7px] font-semibold uppercase tracking-[0.15em] text-dark/50">
          Now playing
        </p>
        <div
          className="mt-3 size-[92px] shrink-0 rounded-[16px]"
          style={{ background: 'linear-gradient(150deg, #F4C3C6 0%, #C87B82 100%)' }}
        />
        <p className="mt-3 text-center font-serif text-[11px] font-bold leading-[14px] text-dark">
          The Christina Pfeiffer Show
        </p>
        <p className="mt-0.5 text-[8px] text-dark/50">Episode 24 · 15 min</p>
        <div className="mt-3 h-0.5 w-full rounded-full bg-dark/15">
          <div className="h-full w-1/3 rounded-full bg-gold" />
        </div>
        <span className="mt-3 flex size-8 items-center justify-center rounded-full bg-dark">
          <PlayGlyph className="text-cream" />
        </span>
      </div>
    </PhoneFrame>
  )
}

/** Standing book cover, title driven by the card so it stays in sync. */
function BookMock({ title }: { title: string }) {
  return (
    <div className="relative h-[240px] w-[168px] rotate-[-2deg] rounded-l-[3px] rounded-r-[6px] shadow-2xl"
      style={{ background: 'linear-gradient(135deg, #C87B82 0%, #2C1810 100%)' }}
    >
      <div className="absolute inset-y-0 left-0 w-2 rounded-l-[3px] bg-black/25" />
      <div className="flex h-full flex-col justify-between p-4 pl-5">
        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-cream/70">A memoir</p>
        <div>
          <p className="font-serif text-[20px] font-bold leading-[22px] text-cream">{title}</p>
          <p className="mt-2 text-[9px] tracking-wide text-cream/70">Christina Pfeiffer</p>
        </div>
      </div>
    </div>
  )
}

function Mock({ product, title }: { product: string; title: string }) {
  if (product === 'show') return <PodcastMock />
  if (product === 'book') return <BookMock title={title} />
  return <AppMock />
}

export function EcosystemSection() {
  const { d } = useLang()
  const e = d.ecosystem

  return (
    <section id="ecosystem" className="bg-cream py-12 md:py-20 lg:py-26">
      <Container>
        <div className="max-w-165">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/50">
            {e.eyebrow}
          </p>
          <h2 className="pt-5 font-serif text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-dark md:text-[40px] lg:text-[46px] lg:leading-[54px]">
            {e.titleLine1} <span className="font-normal italic text-gold">{e.titleAccent}</span>
          </h2>
          <p className="max-w-[540px] pt-6 text-base leading-[26px] text-dark/65 sm:text-[17px] sm:leading-7">
            {e.body}
          </p>
        </div>

        <div className="grid gap-6 pt-12 sm:gap-8 lg:grid-cols-3 lg:pt-16">
          {e.cards.map((card) => {
            const real = Boolean(card.url && card.url !== '#')
            return (
              <div
                key={card.product}
                className="flex flex-col items-center rounded-3xl bg-card-warm p-7 text-center shadow-[0_1px_4px_#2C18100F,0_4px_16px_#2C18100D]"
              >
                <div className="flex h-[300px] items-center justify-center">
                  <Mock product={card.product} title={card.title} />
                </div>
                <h3 className="pt-7 font-serif text-2xl font-bold leading-[30px] text-dark">
                  {card.title}
                </h3>
                <p className="max-w-[320px] pt-3 text-base leading-[26px] text-dark/65">
                  {card.description}
                </p>
                {real ? (
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 ${btnDark}`}
                  >
                    {card.cta}
                  </a>
                ) : (
                  <span className={`mt-7 ${btnDark} cursor-default opacity-60`}>{card.cta}</span>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
