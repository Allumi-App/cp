import { redirect } from '@/i18n/navigation'
import { LegalPage } from '@/features/legal/legal-page'
import { LEGAL_SLUGS, isLegalSlug } from '@/features/legal/legal-content'

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  if (isLegalSlug(slug)) return <LegalPage slug={slug} />
  return redirect({ href: `/legal/${LEGAL_SLUGS[0]}`, locale })
}
