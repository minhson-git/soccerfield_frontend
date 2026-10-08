import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useRoute, useRouter, type LocationQueryRaw } from 'vue-router'

import { isFieldType, type FieldType } from '@/features/field'

import { BOOKING_DAYS_AHEAD, DEFAULT_DURATION, DURATION_OPTIONS } from '../booking.constants'
import { getUpcomingDays, isTime, toDateParam } from '../utils/booking-time'

const PREFERRED_FIELD_TYPE: FieldType = 'SEVEN_A_SIDE'

/**
 * The customer's selection, kept in the URL query (`?type=&date=&slot=&dur=&extras=`) so it
 * survives reloads and device rotation (mobile ↔ desktop variant) and can be shared as a link.
 * Invalid or missing values fall back to defaults.
 */
export function useBookingDraft(options: { fieldTypes: MaybeRefOrGetter<FieldType[]> }) {
  const route = useRoute()
  const router = useRouter()

  const days = getUpcomingDays(new Date(), BOOKING_DAYS_AHEAD)
  const dayParams = days.map(toDateParam)

  function queryValue(key: string): string | undefined {
    const value = route.query[key]
    return typeof value === 'string' ? value : undefined
  }

  // Batch updates made in the same tick so one doesn't overwrite another
  let pending: LocationQueryRaw | null = null
  function update(patch: LocationQueryRaw) {
    if (pending) {
      Object.assign(pending, patch)
      return
    }
    pending = { ...patch }
    queueMicrotask(() => {
      const query = { ...route.query, ...pending }
      pending = null
      void router.replace({ query, hash: route.hash })
    })
  }

  const fieldType = computed<FieldType | null>({
    get() {
      const types = toValue(options.fieldTypes)
      const value = queryValue('type')
      if (isFieldType(value) && types.includes(value)) return value
      return types.includes(PREFERRED_FIELD_TYPE) ? PREFERRED_FIELD_TYPE : (types[0] ?? null)
    },
    set: (value) => update({ type: value ?? undefined }),
  })

  const date = computed<string>({
    get() {
      const value = queryValue('date')
      return value && dayParams.includes(value) ? value : dayParams[0]!
    },
    set: (value) => update({ date: value }),
  })

  const startTime = computed<string | null>({
    get() {
      const value = queryValue('slot')
      return isTime(value) ? value : null
    },
    set: (value) => update({ slot: value ?? undefined }),
  })

  const duration = computed<number>({
    get() {
      const value = Number(queryValue('dur'))
      return (DURATION_OPTIONS as readonly number[]).includes(value) ? value : DEFAULT_DURATION
    },
    set: (value) => update({ dur: String(value) }),
  })

  const extraIds = computed<number[]>({
    get() {
      return (queryValue('extras') ?? '')
        .split(',')
        .map(Number)
        .filter((id) => Number.isInteger(id) && id > 0)
    },
    set: (value) => update({ extras: value.length > 0 ? value.join(',') : undefined }),
  })

  return { days, fieldType, date, startTime, duration, extraIds }
}
