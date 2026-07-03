'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import { toast } from 'sonner'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useBooking, type CustomerDetails } from './booking-context'
import { PackageSelector } from './components/package-selector'
import { DetailsForm, DETAILS_FORM_ID } from './components/details-form'
import { BookingSummary } from './components/booking-summary'
import { submitBookingRequest } from './submit-booking'

function StepBadge({ n, tone }: { n: number; tone: 'gold' | 'dark' }) {
  return (
    <span
      className={cn(
        'flex size-8 items-center justify-center rounded-full text-sm font-semibold',
        tone === 'gold' ? 'bg-gold text-white' : 'bg-dark text-cream',
      )}
    >
      {n}
    </span>
  )
}

export function BookingPage() {
  const { d, lang } = useLang()
  const b = d.booking
  const router = useRouter()
  const { packageId, customer, selectedPackage, setPackage, setCustomer, markSubmitted, submitted, reset } =
    useBooking()
  const [submitting, setSubmitting] = useState(false)

  // If the user returns to book again after a completed request, start fresh
  // (the confirmation page keeps its own data until then). Runs once on mount.
  useEffect(() => {
    if (submitted) reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (values: CustomerDetails) => {
    setSubmitting(true)
    setCustomer(values)
    try {
      await submitBookingRequest({
        packageSlug: packageId,
        packageName: selectedPackage.name[lang],
        packagePrice: formatPrice(selectedPackage.price, lang),
        customer: values,
        lang,
      })
      markSubmitted()
      toast.success(b.toastSuccess)
      router.push('/coaching/confirmation')
    } catch {
      toast.error(b.toastError)
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Header */}
      <div className="border-b border-[#2C18101A]">
        <Container className="py-10 md:py-12 lg:py-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-dark/50">
            {b.eyebrow}
          </p>
          <h1 className="pt-2 font-serif text-[34px] font-bold tracking-[-0.03em] text-dark sm:text-[44px] md:text-[58px]">
            {b.titleLine1} <span className="font-normal italic text-gold">{b.titleAccent}</span>
          </h1>
          <p className="max-w-150 pt-4 text-base leading-[26px] text-dark/65 sm:text-lg sm:leading-7">{b.subtitle}</p>
        </Container>
      </div>

      {/* Body */}
      <Container className="py-10 md:py-14 lg:py-20">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="min-w-0">
            {/* Step 1 — package */}
            <div className="flex items-center gap-3">
              <StepBadge n={1} tone="gold" />
              <h2 className="font-serif text-2xl font-bold text-dark md:text-[28px]">{b.step1}</h2>
            </div>
            <div className="pt-6">
              <PackageSelector selected={packageId} onSelect={setPackage} />
            </div>

            {/* Step 2 — details */}
            <div className="flex items-center gap-3 pt-10 sm:pt-14">
              <StepBadge n={2} tone="dark" />
              <h2 className="font-serif text-2xl font-bold text-dark md:text-[28px]">{b.step2}</h2>
            </div>
            <div className="pt-6">
              <DetailsForm defaultValues={customer} onSubmit={onSubmit} />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28">
            <BookingSummary
              action={{
                label: submitting ? b.form.submitting : b.summary.send,
                type: 'submit',
                formId: DETAILS_FORM_ID,
                disabled: submitting,
                loading: submitting,
              }}
            />
          </div>
        </div>
      </Container>
    </>
  )
}
