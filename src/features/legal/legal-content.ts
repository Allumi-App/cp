import type { Lang } from '@/i18n/language-context'

export type LegalSlug = 'impressum' | 'datenschutz' | 'agb' | 'widerruf'

export const LEGAL_SLUGS: LegalSlug[] = ['impressum', 'datenschutz', 'agb', 'widerruf']

export interface LegalSection {
  heading: string
  lines: string[]
}

/**
 * Placeholder legal copy mirroring the Paper "Legal template" artboard. The
 * Paper design itself notes the final wording (Impressum, Datenschutz, AGB,
 * Widerruf) is to be provided by Christina's Steuerberater / lawyer before
 * launch — these sections are structural placeholders only, provided in both
 * English and German so each language shows readable copy.
 */
const CONTENT_DE: Record<LegalSlug, LegalSection[]> = {
  impressum: [
    {
      heading: 'Angaben gemäß § 5 DDG',
      lines: ['Christina Pfeiffer', '[Straße & Hausnummer]', '[PLZ] [Ort]', 'Deutschland'],
    },
    {
      heading: 'Kontakt',
      lines: ['Telefon: [+49 … ]', 'E-Mail: hello@christinapfeiffer.com'],
    },
    {
      heading: 'Umsatzsteuer-ID',
      lines: [
        'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [DE …]. Hinweis: Sofern die Kleinunternehmerregelung nach § 19 UStG gilt, wird keine Umsatzsteuer ausgewiesen — finale Angabe durch die Steuerberatung.',
      ],
    },
    {
      heading: 'Redaktionell verantwortlich',
      lines: ['Christina Pfeiffer, Anschrift wie oben.'],
    },
    {
      heading: 'EU-Streitschlichtung',
      lines: [
        'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Unsere E-Mail-Adresse finden Sie oben im Impressum.',
      ],
    },
    {
      heading: 'Verbraucherstreitbeilegung',
      lines: [
        'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      ],
    },
  ],
  datenschutz: [
    {
      heading: 'Datenschutz auf einen Blick',
      lines: [
        'Der Schutz deiner persönlichen Daten ist mir ein wichtiges Anliegen. Diese Erklärung informiert über die Verarbeitung personenbezogener Daten auf dieser Website.',
      ],
    },
    {
      heading: 'Verantwortliche Stelle',
      lines: ['Christina Pfeiffer', '[Anschrift wie im Impressum]', 'E-Mail: hello@christinapfeiffer.com'],
    },
    {
      heading: 'Buchungsanfragen',
      lines: [
        'Bei einer Buchungsanfrage werden Name, E-Mail-Adresse und freiwillige Angaben zum Anliegen verarbeitet, um deine Sitzung zu organisieren. Eine Weitergabe an Dritte erfolgt nicht.',
      ],
    },
  ],
  agb: [
    {
      heading: 'Geltungsbereich',
      lines: ['Diese Bedingungen gelten für alle Coaching-Leistungen von Christina Pfeiffer.'],
    },
    {
      heading: 'Leistungen',
      lines: [
        'Coaching ist eine Begleitung zur persönlichen Entwicklung und ersetzt keine medizinische oder therapeutische Behandlung.',
      ],
    },
    {
      heading: 'Termine & Zahlung',
      lines: [
        'Termine werden nach Anfrage per E-Mail bestätigt. Zahlungsdetails werden nach der Bestätigung mitgeteilt.',
      ],
    },
  ],
  widerruf: [
    {
      heading: 'Widerrufsrecht',
      lines: [
        'Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
      ],
    },
    {
      heading: 'Folgen des Widerrufs',
      lines: [
        'Im Falle eines wirksamen Widerrufs werden bereits geleistete Zahlungen unverzüglich zurückerstattet.',
      ],
    },
  ],
}

const CONTENT_EN: Record<LegalSlug, LegalSection[]> = {
  impressum: [
    {
      heading: 'Information pursuant to § 5 DDG',
      lines: ['Christina Pfeiffer', '[Street & number]', '[Postal code] [City]', 'Germany'],
    },
    {
      heading: 'Contact',
      lines: ['Phone: [+49 … ]', 'Email: hello@christinapfeiffer.com'],
    },
    {
      heading: 'VAT ID',
      lines: [
        'VAT identification number pursuant to § 27a of the German VAT Act: [DE …]. Note: where the small-business regulation under § 19 UStG applies, no VAT is shown — final details to be confirmed by the tax advisor.',
      ],
    },
    {
      heading: 'Editorially responsible',
      lines: ['Christina Pfeiffer, address as above.'],
    },
    {
      heading: 'EU dispute resolution',
      lines: [
        'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr. Our email address can be found above in the imprint.',
      ],
    },
    {
      heading: 'Consumer dispute resolution',
      lines: [
        'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
      ],
    },
  ],
  datenschutz: [
    {
      heading: 'Privacy at a glance',
      lines: [
        'Protecting your personal data is important to me. This statement explains how personal data is processed on this website.',
      ],
    },
    {
      heading: 'Controller',
      lines: ['Christina Pfeiffer', '[Address as in the imprint]', 'Email: hello@christinapfeiffer.com'],
    },
    {
      heading: 'Booking requests',
      lines: [
        'When you send a booking request, your name, email address and any voluntary details about your concern are processed to organise your session. Your data is not shared with third parties.',
      ],
    },
  ],
  agb: [
    {
      heading: 'Scope',
      lines: ['These terms apply to all coaching services provided by Christina Pfeiffer.'],
    },
    {
      heading: 'Services',
      lines: [
        'Coaching is a form of support for personal development and does not replace any medical or therapeutic treatment.',
      ],
    },
    {
      heading: 'Appointments & payment',
      lines: [
        'Appointments are confirmed by email after a request. Payment details are communicated after confirmation.',
      ],
    },
  ],
  widerruf: [
    {
      heading: 'Right of withdrawal',
      lines: [
        'You have the right to withdraw from this contract within fourteen days without giving any reason.',
      ],
    },
    {
      heading: 'Consequences of withdrawal',
      lines: [
        'In the event of a valid withdrawal, payments already made will be refunded without undue delay.',
      ],
    },
  ],
}

export function isLegalSlug(value: string | undefined): value is LegalSlug {
  return !!value && (LEGAL_SLUGS as string[]).includes(value)
}

export function getLegalSections(slug: LegalSlug, lang: Lang): LegalSection[] {
  return (lang === 'de' ? CONTENT_DE : CONTENT_EN)[slug]
}
