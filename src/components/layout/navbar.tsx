'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Menu, X } from 'lucide-react'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'

/** Plain "EN | DE" toggle, matching allumi-website's LanguageToggle. */
function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
      className="flex items-center gap-1.5 text-[15px] font-medium leading-[18px] tracking-[-0.01em] text-dark transition-opacity hover:opacity-70"
      aria-label="Toggle language"
    >
      <span className={lang === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
      <span className="opacity-30">|</span>
      <span className={lang === 'de' ? 'opacity-100' : 'opacity-40'}>DE</span>
    </button>
  )
}

export function Navbar() {
  const { d } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { hash: '#coaching', label: d.nav.coaching },
    { hash: '#allumi', label: d.nav.allumi },
    { hash: '#show', label: d.nav.show },
    { hash: '#about', label: d.nav.about },
  ]

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <Container className="flex h-20 items-center justify-between lg:h-[110px]">
        <Link href="/" className="font-serif text-[22px] font-bold tracking-[-0.02em] text-dark">
          Christina <span className="text-gold">Pfeiffer</span>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          <LangToggle />
          {links.map((link) => (
            <Link
              key={link.hash}
              href={`/${link.hash}`}
              className="text-[15px] font-normal leading-[18px] tracking-[-0.01em] text-dark transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/coaching"
            className="flex h-13 items-center justify-center rounded-[28px] bg-gold px-6 text-[15px] font-semibold leading-[18px] text-white transition-opacity hover:opacity-90"
          >
            {d.nav.book}
          </Link>
        </div>

        <button
          className="flex size-10 items-center justify-center text-dark lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 pb-4">
            {links.map((link) => (
              <Link
                key={link.hash}
                href={`/${link.hash}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-normal text-dark"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between px-3">
              <LangToggle />
              <Link
                href="/coaching"
                onClick={() => setMobileOpen(false)}
                className="flex h-12 items-center justify-center rounded-[28px] bg-gold px-6 text-[15px] font-semibold text-white"
              >
                {d.nav.book}
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
