import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Skip Next internals, the API, and any file with an extension (icon.png,
  // favicon.ico, sitemap.xml, …) so static assets aren't locale-redirected.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
