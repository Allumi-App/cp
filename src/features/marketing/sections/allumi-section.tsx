import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'

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
  // Store badges are managed in the dashboard (store_links.badge_image_url) and
  // rendered in dashboard display_order. Only show links with a real URL + badge.
  const stores = (links?.store ?? []).filter((s) => s.url && s.url !== '#' && s.badge)

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

            {stores.length > 0 && (
              <div className="flex items-center gap-3 pt-9 sm:gap-4">
                {stores.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 transition-opacity hover:opacity-90"
                  >
                    <img
                      src={s.badge as string}
                      alt={`${s.platform} store badge`}
                      className="h-11 w-auto object-contain sm:h-13"
                    />
                  </a>
                ))}
              </div>
            )}

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
