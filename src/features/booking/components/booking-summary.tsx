import { Clock, ArrowRight, Loader2 } from 'lucide-react'
import { useLang } from '@/i18n/language-context'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { btnPrimary } from '@/lib/ui'
import { useBooking } from '../booking-context'

interface SummaryAction {
  label: string
  /** 'button' fires onClick; 'submit' submits the form with id=formId. */
  type?: 'button' | 'submit'
  formId?: string
  onClick?: () => void
  disabled?: boolean
  /** When true, swaps the arrow for a spinner to signal work in progress. */
  loading?: boolean
}

export function BookingSummary({ action }: { action?: SummaryAction }) {
  const { d, lang } = useLang()
  const s = d.booking.summary
  const { selectedPackage } = useBooking()

  return (
    <aside className="rounded-3xl bg-card-warm p-6 sm:p-7">
      <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/50">{s.label}</p>

      <p className="pt-3.5 font-serif text-2xl font-bold text-dark">{selectedPackage.name[lang]}</p>
      <div className="mt-1 flex items-center gap-2.5">
        <Clock className="size-4 shrink-0 text-gold" />
        <span className="text-sm text-dark/55">{s.durationLine}</span>
      </div>

      <div className="mt-6 border-t border-[#2C18101F] pt-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[15px] text-dark/70">{s.priceLabel}</span>
          <span className="font-serif text-[28px] font-bold text-dark">
            {formatPrice(selectedPackage.price, lang)}
          </span>
        </div>
        <p className="pt-1.5 text-[13px] text-dark/50">
          {s.vatLabel} {s.vatIncl}
        </p>
      </div>

      {action && (
        <button
          type={action.type ?? 'button'}
          form={action.formId}
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(btnPrimary, 'group mt-5 w-full gap-2 transition-all disabled:cursor-not-allowed disabled:opacity-60')}
        >
          {action.label}
          {action.loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      )}

      <p className="mt-4 text-center text-[13px] leading-5 text-dark/50">{s.note}</p>
    </aside>
  )
}
