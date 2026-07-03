import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'

function SpotifyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
      <circle cx="12" cy="12" r="12" fill="#1ED760" />
      <path
        d="M17.5 10.8c-3-1.8-8-2-10.8-1.1a.9.9 0 11-.5-1.7c3.3-1 8.7-.8 12.2 1.3a.9.9 0 11-.9 1.5zm-.1 2.6a.75.75 0 01-1 .25c-2.5-1.5-6.3-2-9.2-1.1a.75.75 0 11-.45-1.4c3.4-1 7.6-.5 10.4 1.3.35.2.45.7.25 1zm-1.1 2.5a.6.6 0 01-.8.2c-2.2-1.3-5-1.6-8.2-.9a.6.6 0 11-.27-1.17c3.6-.8 6.6-.45 9.1 1a.6.6 0 01.17.87z"
        fill="#2C1810"
      />
    </svg>
  )
}

function ApplePodcastsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
      <circle cx="12" cy="12" r="12" fill="#C49C40" />
      <path
        d="M12 5.5a5 5 0 015 5c0 2-1 3.4-2 4.4-.3.3-.6.7-.6 1.1l-.1.8c-.1.6-.6 1-1.2 1h-2.2c-.6 0-1.1-.4-1.2-1l-.1-.8c0-.4-.3-.8-.6-1.1-1-1-2-2.4-2-4.4a5 5 0 015-5z"
        fill="#2C1810"
      />
      <circle cx="12" cy="10.5" r="2.2" fill="#C49C40" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 24 22" className="shrink-0">
      <rect x="1" y="3" width="22" height="16" rx="5" fill="#FF0000" />
      <path d="M10 7l6 4-6 4z" fill="#FDF2F0" />
    </svg>
  )
}

const PLATFORM_ICONS = [SpotifyIcon, ApplePodcastsIcon, YoutubeIcon]

export function ShowSection() {
  const { d, images, links } = useLang()
  const s = d.show

  return (
    <section id="show" className="bg-cream py-12 md:py-20 lg:py-26">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Copy */}
          <div className="w-full lg:max-w-165">
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-gold">
              {s.eyebrow}
            </p>
            <h2 className="pt-5 font-serif text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-dark md:text-[40px] lg:text-[46px] lg:leading-[54px]">
              {s.titleLine1} <span className="font-normal italic text-gold">{s.titleAccent}</span>
            </h2>
            <p className="max-w-[540px] pt-6 text-base leading-[26px] text-dark/65 sm:text-[17px] sm:leading-7">{s.body}</p>

            <div className="flex flex-wrap items-center gap-3.5 pt-9">
              {s.platforms
                .map((platform, i) => ({
                  platform,
                  Icon: PLATFORM_ICONS[i],
                  url: links?.show.find((pl) => pl.platform === platform)?.url || '',
                }))
                .filter((p) => p.url && p.url !== '#')
                .map(({ platform, Icon, url }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-full border border-[#2C181033] px-5 py-3 text-sm font-semibold text-dark transition-colors hover:border-dark/40 sm:text-[15px]"
                  >
                    <Icon />
                    {platform}
                  </a>
                ))}
            </div>
          </div>

          {/* Right block — an uploaded image replaces the whole episode card
              (same width/shape); otherwise the decorative episode-card mock. */}
          {images.show ? <img src={images.show} alt="The Show" className="h-auto w-full shrink-0 rounded-3xl object-contain lg:w-118" /> : <div className="w-full shrink-0 rounded-3xl bg-card-warm p-7 shadow-[0_1px_4px_#2C18100F,0_4px_16px_#2C18100D] lg:w-118">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-dark/50">
              {s.latestLabel}
            </p>
            <div className="flex items-center gap-5 pt-4.5">
            
                <div className="size-26 shrink-0 rounded-2xl bg-beige" />
              <div className="flex flex-col gap-2">
                <p className="font-serif text-[21px] font-bold leading-[27px] text-dark">
                  {s.episodeTitle}
                </p>
                <p className="text-[13px] font-medium text-dark/50">{s.episodeMeta}</p>
              </div>
            </div>
            <button className="mt-5.5 flex items-center gap-3 rounded-full bg-dark px-5.5 py-3.5">
              <svg width="12" height="14" viewBox="0 0 12 14" className="shrink-0">
                <path d="M0 0l12 7L0 14z" fill="#FDF2F0" />
              </svg>
              <span className="text-[15px] font-semibold text-cream">{s.play}</span>
            </button>
          </div>}
        </div>
      </Container>
    </section>
  )
}
