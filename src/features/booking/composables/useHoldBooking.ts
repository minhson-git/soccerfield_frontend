import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth'

import { useHoldBookingMutation } from '../api/booking.queries'
import type { HoldBookingRequest } from '../booking.types'

/** Holds the slot, or sends guests to login and back to this exact selection. */
export function useHoldBooking() {
  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const mutation = useHoldBookingMutation()

  function hold(request: HoldBookingRequest) {
    if (!auth.isAuthenticated) {
      void router.push({ name: 'login', query: { redirect: route.fullPath } })
      return
    }
    mutation.mutate(request)
  }

  return {
    hold,
    result: mutation.data,
    isPending: mutation.isPending,
    reset: mutation.reset,
  }
}
