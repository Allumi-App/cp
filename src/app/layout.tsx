import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import './globals.css'

// metadataBase makes every relative URL in child metadata (canonical, OG images)
// resolve to the production origin.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

// The <html>/<body> shell + fonts live in [locale]/layout.tsx so the `lang`
// attribute can follow the active locale (from the route param) without reading
// the request here — which would opt the entire tree into dynamic rendering.
// This root only carries global CSS and metadataBase.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
