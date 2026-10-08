import type { Role } from './auth.types'

/** Route name each role lands on after login. */
export const ROLE_HOME_ROUTE: Record<Role, string> = {
  CUSTOMER: 'home',
  OWNER: 'owner-dashboard',
  ADMIN: 'admin-dashboard',
}
