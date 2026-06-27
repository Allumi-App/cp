import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'

const AVATAR_BG = ['bg-card-rose', 'bg-gold', 'bg-dark']

export function TestimonialsSection() {
  const { d } = useLang()
  const t = d.testimonials

  return (
    <section className="border-t border-[#2C18101A] bg-cream py-12 md:py-20 lg:py-26">
      <Container>
        <div className="flex flex-col items-center gap-4.5 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/50">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-dark md:text-[40px] lg:text-[46px]">
            {t.titleLine1} <span className="font-normal italic text-gold">{t.titleAccent}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6 pt-12 lg:flex-row lg:gap-8 lg:pt-16">
          {t.items.map((item, i) => (
            <figure
              key={item.name}
              className="flex flex-1 flex-col rounded-3xl bg-card-warm px-6 py-8 shadow-[0_1px_4px_#2C18100F,0_4px_16px_#2C18100D] sm:px-8.5 sm:py-9.5"
            >
              <span className="font-serif text-[44px] leading-[30px] text-gold">“</span>
              <blockquote className="grow pt-3.5 font-serif text-[19px] leading-[31px] text-dark/85">
                {item.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3.5 pt-7.5">
                <span
                  className={`flex size-11 items-center justify-center rounded-full font-serif text-[17px] font-bold text-cream ${AVATAR_BG[i]}`}
                >
                  {item.name.charAt(0)}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-dark">{item.name}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.04em] text-gold">
                    {item.tag}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
