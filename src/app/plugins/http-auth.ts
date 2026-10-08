import type { Pinia } from 'pinia'

import { useAuthStore } from '@/features/auth'
import { configureHttpAuth } from '@/shared/api/http'

import { router } from '../router'
import { queryClient } from './vue-query'

/** Connects the http client in `shared` to the auth store, keeping `shared` feature-agnostic. */
export function setupHttpAuth(pinia: Pinia): void {
  const auth = useAuthStore(pinia)

  configureHttpAuth({
    getAccessToken: () => auth.accessToken,
    refreshAccessToken: () => auth.refreshAccessToken(),
    onAuthFailure: () => {
      auth.clearSession()
      queryClient.clear()
      const current = router.currentRoute.value
      if (current.name !== 'login') {
        void router.push({ name: 'login', query: { redirect: current.fullPath } })
      }
    },
  })
}
