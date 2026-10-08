import { useMutation } from '@tanstack/vue-query'
import { useRoute, useRouter } from 'vue-router'

import { login } from '../api/auth.api'
import { ROLE_HOME_ROUTE } from '../auth.constants'
import { useAuthStore } from '../stores/auth.store'

export function useLogin() {
  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  return useMutation({
    mutationFn: login,
    onSuccess: async (session) => {
      auth.setSession(session)
      const redirect = route.query.redirect
      // Only same-origin paths, to avoid open redirects
      if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
        await router.replace(redirect)
      } else {
        await router.replace({ name: ROLE_HOME_ROUTE[session.role] })
      }
    },
  })
}
