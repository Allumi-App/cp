import { Check } from 'lucide-react'
import { useLang } from '@/i18n/language-context'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { PACKAGES, type PackageId, type SessionPackage } from '../booking-config'

export function PackageSelector({
  selected,
  onSelect,
}: {
  selected: PackageId
  onSelect: (id: PackageId) => void
}) {
  const { lang, packages } = useLang()
  const list = packages && packages.length ? packages : PACKAGES
  const pkg = (list.find((p) => p.id === selected) ?? list[0]) as SessionPackage

  return (
    <div className="flex flex-col gap-6">
      {/* Segmented control — stacks full-width on mobile so long labels never overflow */}
      <div className="flex w-full flex-col gap-1.5 rounded-[20px] bg-card-warm/70 p-1.5 sm:inline-flex sm:w-auto sm:flex-row sm:flex-wrap sm:gap-1 sm:self-start sm:rounded-full">
        {list.map((p) => {
          const active = p.id === selected
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={cn(
                'w-full rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:w-auto sm:py-2.5 sm:text-[15px]',
                active ? 'bg-dark text-cream' : 'text-dark/55 hover:text-dark',
              )}
            >
              {p.segment[lang]}
            </button>
          )
        })}
      </div>

      {/* Detail card — re-keys on selection so it fades/slides in on each switch */}
      <div
        key={selected}
        className="rounded-3xl bg-white p-5 shadow-[0_1px_4px_#2C18100F,0_4px_16px_#2C18100D] animate-[pkg-in_.28s_ease-out] sm:p-7 lg:p-8.5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <h3 className="font-serif text-[22px] font-bold text-dark sm:text-[26px]">{pkg.name[lang]}</h3>
          <div className="sm:text-right">
            <p className="font-serif text-3xl font-bold text-dark sm:text-4xl">{formatPrice(pkg.price, lang)}</p>
            <p className="pt-1 text-xs text-dark/45">
              {lang === 'de' ? 'inkl. MwSt. · pro Sitzung' : 'incl. VAT · per session'}
            </p>
          </div>
        </div>

        <p className="max-w-[480px] pt-3 text-base leading-[26px] text-dark/60">
          {pkg.description[lang]}
        </p>

        <div className="mt-6 border-t border-[#2C18101A] pt-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/50">
            {lang === 'de' ? 'Was enthalten ist' : "What's included"}
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {pkg.included[lang].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <Check className="size-3 text-gold" />
                </span>
                <span className="text-[15px] text-dark/75">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
