'use client'

import { Link } from '@/i18n/navigation'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'

const LEGAL_SLUGS = ['impressum', 'datenschutz', 'agb', 'widerruf'] as const

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0" fill="currentColor">
      <path d="M24 4.322C30.413 4.322 31.172 4.35 33.694 4.463C36.038 4.566 37.303 4.959 38.147 5.287C39.263 5.719 40.069 6.244 40.903 7.078C41.747 7.922 42.263 8.719 42.694 9.834C43.022 10.678 43.416 11.953 43.519 14.287C43.631 16.819 43.659 17.578 43.659 23.981C43.659 30.394 43.631 31.153 43.519 33.675C43.416 36.019 43.022 37.284 42.694 38.128C42.263 39.244 41.737 40.05 40.903 40.884C40.059 41.728 39.263 42.244 38.147 42.675C37.303 43.003 36.028 43.397 33.694 43.5C31.163 43.612 30.403 43.641 24 43.641C17.587 43.641 16.828 43.612 14.306 43.5C11.963 43.397 10.697 43.003 9.853 42.675C8.738 42.244 7.931 41.719 7.097 40.884C6.253 40.041 5.737 39.244 5.306 38.128C4.978 37.284 4.584 36.009 4.481 33.675C4.369 31.144 4.341 30.384 4.341 23.981C4.341 17.569 4.369 16.809 4.481 14.287C4.584 11.944 4.978 10.678 5.306 9.834C5.737 8.719 6.263 7.912 7.097 7.078C7.941 6.234 8.738 5.719 9.853 5.287C10.697 4.959 11.972 4.566 14.306 4.463C16.828 4.35 17.587 4.322 24 4.322ZM24 0C17.484 0 16.669 0.028 14.109 0.141C11.559 0.253 9.806 0.666 8.287 1.256C6.703 1.875 5.362 2.691 4.031 4.031C2.691 5.362 1.875 6.703 1.256 8.278C0.666 9.806 0.253 11.55 0.141 14.1C0.028 16.669 0 17.484 0 24C0 30.516 0.028 31.331 0.141 33.891C0.253 36.441 0.666 38.194 1.256 39.712C1.875 41.297 2.691 42.638 4.031 43.969C5.362 45.3 6.703 46.125 8.278 46.734C9.806 47.325 11.55 47.737 14.1 47.85C16.659 47.962 17.475 47.991 23.991 47.991C30.506 47.991 31.322 47.962 33.881 47.85C36.431 47.737 38.184 47.325 39.703 46.734C41.278 46.125 42.619 45.3 43.95 43.969C45.281 42.638 46.106 41.297 46.716 39.722C47.306 38.194 47.719 36.45 47.831 33.9C47.944 31.341 47.972 30.525 47.972 24.009C47.972 17.494 47.944 16.678 47.831 14.119C47.719 11.569 47.306 9.816 46.716 8.297C46.125 6.703 45.309 5.362 43.969 4.031C42.638 2.7 41.297 1.875 39.722 1.266C38.194 0.675 36.45 0.263 33.9 0.15C31.331 0.028 30.516 0 24 0Z" />
      <path d="M24 11.672C17.194 11.672 11.672 17.194 11.672 24C11.672 30.806 17.194 36.328 24 36.328C30.806 36.328 36.328 30.806 36.328 24C36.328 17.194 30.806 11.672 24 11.672ZM24 31.997C19.584 31.997 16.003 28.416 16.003 24C16.003 19.584 19.584 16.003 24 16.003C28.416 16.003 31.997 19.584 31.997 24C31.997 28.416 28.416 31.997 24 31.997Z" />
      <path d="M39.694 11.184C39.694 12.778 38.4 14.062 36.816 14.062C35.222 14.062 33.938 12.769 33.938 11.184C33.938 9.591 35.231 8.306 36.816 8.306C38.4 8.306 39.694 9.6 39.694 11.184Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0" fill="currentColor">
      <path d="M40 0H8C3.58 0 0 3.58 0 8V40C0 44.42 3.58 48 8 48H40C44.42 48 48 44.42 48 40V8C48 3.58 44.42 0 40 0ZM14.241 40.903H7.116V17.991H14.241V40.903ZM10.678 14.869C8.391 14.869 6.544 13.022 6.544 10.744C6.544 8.466 8.391 6.619 10.678 6.619C12.956 6.619 14.803 8.466 14.803 10.744C14.803 13.012 12.956 14.869 10.678 14.869ZM40.903 40.903H33.788V29.766C33.788 27.113 33.741 23.691 30.084 23.691C26.381 23.691 25.819 26.587 25.819 29.578V40.903H18.712V17.991H25.538V21.122H25.631C26.578 19.322 28.903 17.419 32.362 17.419C39.572 17.419 40.903 22.163 40.903 28.331V40.903Z" />
    </svg>
  )
}

export function Footer() {
  const { d, lang, setLang, links } = useLang()

  const exploreHrefs = ['/#coaching', '/#allumi', '/#show', '/#about']
  const showUrl = (platform: string) => links?.show.find((s) => s.platform === platform)?.url || ''
  // Social links are dashboard-driven: render them in display_order, mapping each
  // platform to its icon. (Christina sets the real URLs in the dashboard.)
  const SOCIAL_ICONS = { instagram: InstagramIcon, linkedin: LinkedinIcon }
  const socials = (links?.social ?? [])
    .map((s) => ({
      platform: s.platform,
      label: s.title || s.platform,
      url: s.url,
      Icon: SOCIAL_ICONS[s.platform as keyof typeof SOCIAL_ICONS],
    }))
    .filter((s) => Boolean(s.Icon))

  return (
    <footer className="bg-footer-bg">
      <Container className="flex flex-col pt-16 pb-20">
        <div className="flex flex-col justify-between gap-12 pb-12 lg:flex-row lg:items-start">
          {/* Brand */}
          <div className="flex max-w-xs flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <p className="font-serif text-[26px] font-bold tracking-[-0.02em] text-white">
                Christina <span className="text-gold">Pfeiffer</span>
              </p>
              <p className="text-sm leading-[22px] text-footer-faint">{d.footer.tagline}</p>
            </div>
            {socials.length > 0 && (
              <div className="flex flex-col gap-2.5">
                <p className="text-base font-bold text-footer-text">{d.footer.follow}</p>
                <div className="flex flex-col gap-3">
                  {socials.map(({ platform, label, url, Icon }) => {
                    const isReal = Boolean(url && url !== '#')
                    return (
                      <a
                        key={platform}
                        href={isReal ? url : '#'}
                        {...(isReal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="flex items-center gap-2.5 text-[15px] text-footer-muted transition-colors hover:text-footer-text"
                      >
                        <Icon /> {label}
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12 lg:gap-20">
            <FooterCol
              heading={d.footer.explore}
              items={d.footer.exploreLinks.map((label, i) => ({ label, to: exploreHrefs[i] }))}
            />
            <FooterCol
              heading={d.footer.listen}
              items={d.footer.listenLinks.map((label) => ({
                label,
                to: label === 'allumi.me' ? 'https://allumi.me' : showUrl(label),
                external: true,
              }))}
            />
            <FooterCol
              heading={d.footer.legal}
              items={LEGAL_SLUGS.map((slug) => ({
                label: d.legal.tabs[slug],
                to: `/legal/${slug}`,
              }))}
            />
          </div>
        </div>

        <div className="flex flex-col pt-12">
          <div className="h-px w-full bg-footer-divider" />
          <div className="flex items-center justify-between pt-5">
            <p className="text-[13px] text-footer-copy">{d.footer.copyright}</p>
            <button
              onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
              className="flex items-center gap-2"
              aria-label="Toggle language"
            >
              <span className={lang === 'en' ? 'text-[13px] font-semibold tracking-[0.04em] text-footer-text' : 'text-[13px] font-medium tracking-[0.04em] text-footer-faint'}>
                EN
              </span>
              <span className="h-2.5 w-px bg-[#FFFFFF40]" />
              <span className={lang === 'de' ? 'text-[13px] font-semibold tracking-[0.04em] text-footer-text' : 'text-[13px] font-medium tracking-[0.04em] text-footer-faint'}>
                DE
              </span>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterCol({
  heading,
  items,
}: {
  heading: string
  items: { label: string; to: string; external?: boolean }[]
}) {
  // Hide links that aren't populated yet (empty or "#") so no dead links show.
  const visible = items.filter((item) => item.to && item.to !== '#')
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-base font-bold text-footer-text">{heading}</p>
      {visible.map((item) =>
        item.external ? (
          <a key={item.label} href={item.to} target="_blank" rel="noopener noreferrer" className="text-[15px] leading-[22px] text-footer-muted transition-colors hover:text-footer-text">
            {item.label}
          </a>
        ) : (
          <Link key={item.label} href={item.to} className="text-[15px] leading-[22px] text-footer-muted transition-colors hover:text-footer-text">
            {item.label}
          </Link>
        ),
      )}
    </div>
  )
}
