import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { storage } from '@/shared/utils/storage'

import * as authApi from '../api/auth.api'
import { ROLES, type AuthSession, type Role } from '../auth.types'

const STORAGE_KEY = 'auth_session'

function loadSession(): AuthSession | null {
  const raw = storage.get(STORAGE_KEY)
  if (!raw) return null
  try {
    const session = JSON.parse(raw) as AuthSession
    return ROLES.includes(session.role) ? session : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const session = ref<AuthSession | null>(loadSession())

  const isAuthenticated = computed(() => session.value !== null)
  const role = computed<Role | null>(() => session.value?.role ?? null)
  const userId = computed(() => session.value?.userId ?? null)
  const accessToken = computed(() => session.value?.accessToken ?? null)

  function setSession(next: AuthSession) {
    session.value = next
    storage.set(STORAGE_KEY, JSON.stringify(next))
  }

  function clearSession() {
    session.value = null
    storage.remove(STORAGE_KEY)
  }

  /** Returns the new access token, or null (and clears the session) when refresh fails. */
  async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = session.value?.refreshToken
    if (!refreshToken) return null
    try {
      const next = await authApi.refresh(refreshToken)
      setSession(next)
      return next.accessToken
    } catch {
      clearSession()
      return null
    }
  }

  async function logout() {
    const refreshToken = session.value?.refreshToken
    try {
      if (refreshToken) await authApi.logout(refreshToken)
    } finally {
      clearSession()
    }
  }

  return {
    isAuthenticated,
    role,
    userId,
    accessToken,
    setSession,
    clearSession,
    refreshAccessToken,
    logout,
  }
})
