import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Locale-aware navigation helpers — these keep the active /en or /de prefix on
// every internal link and programmatic navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
