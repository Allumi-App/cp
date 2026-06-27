import type { Metadata } from 'next'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Christina Pfeiffer — Transformation Coaching',
    template: '%s | Christina Pfeiffer',
  },
  description:
    'Transformation coaching with Christina Pfeiffer — 1:1 sessions, the ALLUMI app, and The Show.',
}

// The locale segment ([locale]) owns the visible shell (providers, navbar,
// footer). This root only renders the document and loads fonts, mirroring
// allumi-website's structure.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${inter.variable} ${libreBaskerville.variable}`}>
      <body>{children}</body>
    </html>
  )
}
