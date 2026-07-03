import { Link } from '@/i18n/navigation'
import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'
import { btnPrimary } from '@/lib/ui'

export function ApproachSection() {
  const { d } = useLang()
  const a = d.approach

  return (
    <section id="coaching" className="bg-cream py-12 md:py-20 lg:py-26">
      <Container>
        {/* Header row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <div className="lg:max-w-180">
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/50">
              {a.eyebrow}
            </p>
            <h2 className="pt-5 font-serif text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-dark md:text-[40px] lg:text-[46px]">
              {a.titleLine1} <span className="font-normal italic text-gold">{a.titleAccent}</span> {a.titleLine2}
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:max-w-[420px] lg:pb-1.5">
            <p className="text-base leading-[26px] text-dark/65 sm:text-[17px] sm:leading-7">{a.body}</p>
            <div className="flex items-center gap-5 sm:gap-6">
              <Link href="/coaching" className={btnPrimary}>
                {a.cta}
              </Link>
              <Link href="/faq" className="flex items-center gap-2 text-sm font-semibold text-dark/60 sm:text-[15px]">
                {a.questions} <span className="text-gold">{a.faqLink}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Three numbered columns */}
        <div className="flex flex-col gap-9 pt-12 lg:flex-row lg:gap-10 lg:pt-21">
          {a.columns.map((col) => (
            <div
              key={col.label}
              className="flex flex-1 flex-col gap-3.5 border-t border-[#2C181026] pt-6.5"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-gold">
                {col.label}
              </p>
              <h3 className="font-serif text-2xl font-bold leading-[30px] text-dark">{col.title}</h3>
              <p className="text-base leading-[26px] text-dark/65">{col.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
