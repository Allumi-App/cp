import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'
import { btnPrimary } from '@/lib/ui'

export function FinalCtaSection() {
  const { d } = useLang()
  const c = d.finalCta
  const [email, setEmail] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    console.debug('[newsletter] subscribe', email)
    toast.success(c.success)
    setEmail('')
  }

  return (
    <section className="border-t border-[#2C18101A] bg-cream py-12 md:py-20 lg:py-26">
      <Container>
        <div className="flex flex-col items-center text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/60">
            {c.eyebrow}
          </p>
          <h2 className="pt-5 font-serif text-[34px] font-bold leading-[1.08] tracking-[-0.025em] text-dark md:text-[48px] lg:text-[58px]">
            {c.title}
          </h2>
          <p className="max-w-[560px] pt-5 text-base leading-[26px] text-dark/70 sm:text-lg sm:leading-[30px]">{c.body}</p>

          <Link to="/coaching" className={cn(btnPrimary, 'mt-9')}>
            {c.cta}
          </Link>

          <div className="flex flex-col items-center gap-4.5 pt-10 sm:pt-14">
            <p className="text-[15px] font-medium text-dark/65">{c.newsletterNote}</p>
            <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.placeholder}
                className="h-12 w-full rounded-full border border-[#2C18102E] bg-cream px-6 text-[15px] text-dark placeholder:text-dark/45 focus:border-gold focus:outline-none sm:w-80"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-full bg-dark px-7 text-[15px] font-semibold text-cream transition-opacity hover:opacity-90"
              >
                {c.subscribe}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
