import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

import { ROLE_HOME_ROUTE, useAuthStore } from '@/features/auth'

/**
 * Access control driven by route meta (`to.meta` is merged from all matched records).
 * Real authorization is enforced by the backend; this only keeps users on screens they can use.
 */
export function authGuard(to: RouteLocationNormalized): true | RouteLocationRaw {
  const auth = useAuthStore()

  if (to.meta.guestOnly && auth.role) {
    return { name: ROLE_HOME_ROUTE[auth.role] }
  }

  const allowedRoles = to.meta.roles
  if (!allowedRoles) return true

  if (!auth.role) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  return allowedRoles.includes(auth.role) ? true : { name: 'forbidden' }
}
