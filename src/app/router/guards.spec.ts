import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'

import { useAuthStore, type Role } from '@/features/auth'

import { authGuard } from './guards'

function routeWith(meta: RouteMeta, fullPath = '/target'): RouteLocationNormalized {
  return { meta, fullPath } as RouteLocationNormalized
}

function loginAs(role: Role) {
  useAuthStore().setSession({
    accessToken: 'a',
    refreshToken: 'r',
    tokenType: 'Bearer',
    expiresIn: 900,
    role,
    userId: 1,
  })
}

describe('authGuard', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('lets anyone open public routes', () => {
    expect(authGuard(routeWith({}))).toBe(true)
  })

  it('sends guests to login with a redirect back', () => {
    expect(authGuard(routeWith({ roles: ['OWNER'] }, '/owner/fields'))).toEqual({
      name: 'login',
      query: { redirect: '/owner/fields' },
    })
  })

  it('blocks users whose role is not allowed', () => {
    loginAs('CUSTOMER')
    expect(authGuard(routeWith({ roles: ['ADMIN'] }))).toEqual({ name: 'forbidden' })
  })

  it('allows users with a matching role', () => {
    loginAs('OWNER')
    expect(authGuard(routeWith({ roles: ['OWNER'] }))).toBe(true)
  })

  it('sends logged-in users away from guest-only pages', () => {
    loginAs('ADMIN')
    expect(authGuard(routeWith({ guestOnly: true }))).toEqual({ name: 'admin-dashboard' })
  })
})
