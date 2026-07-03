import { useLang } from '@/i18n/language-context'
import { Container } from '@/components/ui/container'

function PersonSilhouette() {
  return (
    <svg width="320" height="380" viewBox="0 0 320 380" className="shrink-0" style={{ opacity: 0.45 }}>
      <circle cx="160" cy="128" r="84" fill="#C49C40" />
      <path d="M22 380c0-84 62-142 138-142s138 58 138 142" fill="#C49C40" />
    </svg>
  )
}

function MedalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
      <circle cx="8" cy="6.5" r="4.5" fill="none" stroke="#C49C40" strokeWidth="1.6" />
      <path d="M5.5 10l-1 5 3.5-2 3.5 2-1-5" fill="none" stroke="#C49C40" strokeWidth="1.6" />
    </svg>
  )
}

export function AboutSection() {
  const { d, images } = useLang()
  const a = d.about

  return (
    <section id="about" className="bg-cream py-12 md:py-20 lg:py-26">
      <Container>
        <div className="flex flex-col items-center gap-10 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-12">
          {/* Photo */}
          <div
            className="relative flex aspect-square w-full max-w-[420px] shrink-0 items-end justify-center overflow-clip rounded-[26px] lg:w-[527px] lg:max-w-none"
            style={{ background: 'linear-gradient(155deg, #E9DED6 0%, #F2ECE7 100%)' }}
          >
            {images.about ? (
              <img src={images.about} alt="Christina Pfeiffer" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <PersonSilhouette />
            )}
            <div className="absolute left-7 top-7 flex items-center gap-2.5 rounded-full bg-cream/90 px-4.5 py-2.5">
              <MedalIcon />
              <span className="text-[13px] font-semibold text-dark">{a.badge}</span>
            </div>
          </div>

          {/* Copy */}
          <div className="w-full lg:max-w-150">
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-dark/50">
              {a.eyebrow}
            </p>
            <h2 className="pt-5 font-serif text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-dark md:text-[40px] lg:text-[46px]">
              {a.titleLine1} <span className="font-normal italic text-gold">{a.titleAccent}</span>
            </h2>
            <div className="flex max-w-135 flex-col gap-4.5 pt-6.5">
              {a.paragraphs.map((para, i) => (
                <p key={i} className="text-base leading-[26px] text-dark/65 sm:text-[17px] sm:leading-[29px]">
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-8 pt-9 lg:gap-12">
              {a.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex w-[calc(50%-1rem)] flex-col gap-1.5 border-t border-[#2C181026] pt-5.5 sm:w-[150px]"
                >
                  <p className="font-serif text-3xl font-bold leading-[34px] text-dark">
                    {stat.value}
                  </p>
                  <p className="text-[13px] font-medium text-dark/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
