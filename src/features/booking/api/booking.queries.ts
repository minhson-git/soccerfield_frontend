import { useMutation, useQuery } from '@tanstack/vue-query'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'

import type { AvailabilityParams } from '../booking.types'
import { fetchAvailability, fetchExtras, holdBooking } from './booking.api'

export const bookingKeys = {
  availability: (params: AvailabilityParams) =>
    ['availability', params.branchId, params.fieldType, params.date] as const,
  extras: (branchId: number) => ['booking-extras', branchId] as const,
}

export function useAvailabilityQuery(params: MaybeRefOrGetter<AvailabilityParams | null>) {
  return useQuery({
    queryKey: computed(() => {
      const value = toValue(params)
      return value ? bookingKeys.availability(value) : ['availability', 'idle']
    }),
    queryFn: () => fetchAvailability(toValue(params)!),
    enabled: computed(() => toValue(params) !== null),
  })
}

export function useExtrasQuery(branchId: MaybeRefOrGetter<number>) {
  return useQuery({
    queryKey: computed(() => bookingKeys.extras(toValue(branchId))),
    queryFn: () => fetchExtras(toValue(branchId)),
  })
}

export function useHoldBookingMutation() {
  return useMutation({ mutationFn: holdBooking })
}
