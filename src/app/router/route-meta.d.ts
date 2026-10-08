import 'vue-router'

import type { Role } from '@/features/auth'

import type { LayoutName } from '../layouts'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    /** Layout wrapping the page. Defaults to `user`. */
    layout?: LayoutName
    /** Roles allowed to open the route. Omit for public routes. */
    roles?: Role[]
    /** Redirect logged-in users away (login, register). */
    guestOnly?: boolean
    /** i18n key for the document title. */
    titleKey?: string
    /** Hide the app header/footer on mobile: the page draws its own cover (booking page). */
    immersiveOnMobile?: boolean
  }
}
