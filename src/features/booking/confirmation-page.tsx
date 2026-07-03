'use client'

import { useEffect } from 'react'
import { useRouter } from '@/i18n/navigation'
import { Check, Clock, Mail } from 'lucide-react'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { useBooking } from './booking-context'

export function ConfirmationPage() {
  const { d, lang } = useLang()
  const c = d.booking.confirmation
  const { selectedPackage, customer, submitted } = useBooking()
  const router = useRouter()

  // Deep-link guard: confirmation only after a submitted request.
  useEffect(() => {
    if (!submitted) router.replace('/coaching')
  }, [submitted, router])

  if (!submitted) {
    return null
  }

  return (
    <>
      {/* Hero */}
      <div className="border-b border-[#2C18101A]">
        <Container className="flex flex-col items-center py-16 text-center lg:py-20">
          <span className="flex size-16 items-center justify-center rounded-full bg-gold text-cream">
            <Check className="size-8" />
          </span>
          <p className="pt-7 text-[13px] font-semibold uppercase tracking-[0.2em] text-dark/50">
            {c.eyebrow}
          </p>
          <h1 className="pt-3 font-serif text-[44px] font-bold tracking-[-0.02em] text-dark md:text-[58px]">
            {c.titleLine1} <span className="font-normal italic text-gold">{c.titleAccent}</span>
          </h1>
          <p className="max-w-xl pt-4 text-lg leading-[30px] text-dark/60">{c.body}</p>

          {/* Recap card */}
          <div className="mt-10 w-full max-w-xl rounded-3xl bg-white p-7 text-left shadow-[0_1px_4px_#2C18100F,0_4px_16px_#2C18100D]">
            <p className="font-serif text-[22px] font-bold text-dark">{selectedPackage.name[lang]}</p>
            <div className="mt-5 flex flex-col gap-2.5 border-t border-[#2C18101A] pt-5">
              <div className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-gold" />
                <span className="text-[15px] text-dark/70">{d.booking.summary.durationLine}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-gold" />
                <span className="text-[15px] font-semibold text-dark">{customer.email}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* What happens next */}
      <Container className="py-16 lg:py-20">
        <h2 className="text-center font-serif text-[28px] font-bold text-dark md:text-[34px]">
          {c.whatNext}
        </h2>
        <div className="grid gap-10 pt-12 md:grid-cols-3">
          {c.steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-gold/15 text-sm font-semibold text-gold">
                {i + 1}
              </span>
              <h3 className="font-serif text-xl font-bold text-dark">{step.title}</h3>
              <p className="text-base leading-[26px] text-dark/60">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
