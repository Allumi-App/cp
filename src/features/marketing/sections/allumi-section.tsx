import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0">
      <path
        d="M16.5 1.5c.1 1-.3 2-1 2.8-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 1-2.7.7-.8 1.9-1.3 2.8-1.4zM19 17c-.5 1.1-.7 1.6-1.3 2.6-.9 1.4-2.1 3.1-3.6 3.1-1.3 0-1.7-.9-3.5-.8-1.8 0-2.2.8-3.5.8-1.5 0-2.7-1.6-3.6-3C1 16.5.7 12.2 2.3 9.9c1-1.6 2.7-2.6 4.3-2.6 1.6 0 2.6.9 3.9.9 1.3 0 2-.9 3.9-.9 1.4 0 2.9.8 3.9 2.1-3.4 1.9-2.9 6.8.8 7.6z"
        fill="#FDF2F0"
      />
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 22 24" className="shrink-0">
      <path d="M2 2.5v19l11-9.5z" fill="#C49C40" />
      <path d="M2 2.5l11 9.5 4.5-3.9z" fill="#F4C3C6" />
      <path d="M2 21.5l11-9.5 4.5 3.9z" fill="#C87B82" />
      <path d="M17.5 8.1l3 2c.9.6.9 1.8 0 2.4l-3 2L13 12z" fill="#E5D5CD" />
    </svg>
  )
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" className={className}>
      <path d="M0 0l14 8L0 16z" fill="currentColor" />
    </svg>
  )
}

export function AllumiSection() {
  const { d, images, links } = useLang()
  const a = d.allumi
  const p = a.phone
  // Render store buttons in dashboard display_order (links.store is already ordered).
  const STORE_META = {
    ios: { Icon: AppleIcon, pre: a.appStorePre, name: a.appStoreName },
    android: { Icon: GooglePlayIcon, pre: a.googlePlayPre, name: a.googlePlayName },
  }
  const stores = (links?.store ?? [])
    .map((s) => ({
      platform: s.platform,
      url: s.url,
      meta: STORE_META[s.platform as keyof typeof STORE_META],
    }))
    .filter((s) => s.url && s.url !== '#' && s.meta)

  return (
    <section id="allumi" className="bg-cream py-12 md:py-20 lg:py-26">
      <Container>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Copy */}
          <div className="w-full lg:max-w-155">
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/50">
              {a.eyebrow}
            </p>
            <h2 className="pt-5 font-serif text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-dark md:text-[40px] lg:text-[46px] lg:leading-[54px]">
              {a.titleLine1} <span className="font-normal italic text-gold">{a.titleAccent}</span>
            </h2>
            <p className="max-w-[520px] pt-6 text-base leading-[26px] text-dark/65 sm:text-[17px] sm:leading-7">{a.body}</p>

            <div className="flex items-center gap-3 pt-9 sm:gap-4">
              {stores.map(({ platform, url, meta }) => {
                if (!meta) return null
                const Icon = meta.Icon
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-[14px] bg-dark px-4 py-2.5 sm:gap-3 sm:px-[22px] sm:py-[13px]"
                  >
                    <Icon />
                    <span className="flex flex-col">
                      <span className="text-[9px] font-medium tracking-[0.04em] text-cream/70 sm:text-[10px]">
                        {meta.pre}
                      </span>
                      <span className="text-[15px] font-semibold leading-[20px] text-cream sm:text-[17px] sm:leading-[22px]">
                        {meta.name}
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>

            <a href="https://allumi.me" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-dark sm:text-[15px]">
              {a.link} <span className="text-gold">→</span>
            </a>
          </div>

          {/* Phone — uploaded image, else the bundled mock as fallback */}
          {images.allumi ? (
            <img
              src={images.allumi}
              alt="ALLUMI app"
              className="h-[560px] w-[280px] shrink-0 rounded-[46px] object-cover shadow-2xl sm:h-[680px] sm:w-[340px]"
            />
          ) : (
            <div className="h-[560px] w-[280px] shrink-0 rounded-[46px] bg-dark p-3 shadow-2xl sm:h-[680px] sm:w-[340px]">
              <div className="flex h-full w-full flex-col overflow-clip rounded-[34px] bg-cream px-6 py-7.5">
                <p className="font-serif text-lg font-bold leading-[22px] tracking-[0.18em] text-dark">
                  ALLUMI
                </p>
                <p className="pt-1.5 text-[13px] leading-5 text-dark/55">{p.greeting}</p>

                {/* Journey card */}
                <div
                  className="relative top-6 flex flex-col gap-1.5 rounded-[22px] p-[22px]"
                  style={{ background: 'linear-gradient(150deg, #F5DAC8 0%, #C87B82 100%)' }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-dark/55">
                    {p.todayLabel}
                  </p>
                  <p className="pt-1.5 font-serif text-[22px] font-bold leading-[27px] text-dark">
                    {p.journeyTitle}
                  </p>
                  <p className="font-serif text-[15px] italic leading-[18px] text-dark/80">
                    {p.journeySub}
                  </p>
                  <p className="pt-2.5 text-xs font-medium text-dark/60">{p.journeyMeta}</p>
                </div>

                {/* Play card */}
                <div className="relative top-12 flex items-center gap-3.5 rounded-[18px] bg-white p-3.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold">
                    <PlayGlyph className="text-white" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold text-dark">{p.cardTitle}</span>
                    <span className="text-[11px] text-dark/50">{p.cardSub}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
