import { createInjectionState } from '@vueuse/core'
import { isToday } from 'date-fns'
import { computed, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useBranchQuery } from '@/features/branch'
import { FIELD_TYPE_PLAYERS } from '@/features/field'
import { formatCurrency } from '@/shared/utils/format'

import { useAvailabilityQuery, useExtrasQuery } from '../api/booking.queries'
import type { AvailabilityParams, CheckoutStep } from '../booking.types'
import { calculateExtrasPrice, calculateFieldPrice } from '../utils/booking-pricing'
import { addMinutesToTime, parseDateParam } from '../utils/booking-time'
import { useBookingDraft } from './useBookingDraft'
import { useDayLabel } from './useDayLabel'
import { useHoldBooking } from './useHoldBooking'

/**
 * Everything the booking page needs, computed once in `BookingPage.vue` and shared by its
 * mobile and desktop variants, so both always show the same selection and price.
 */
const [useProvideBranchBooking, useInjectedBranchBooking] = createInjectionState(
  (branchId: MaybeRefOrGetter<number>) => {
    const { t, locale } = useI18n()
    const router = useRouter()
    const dayLabel = useDayLabel()

    const branchQuery = useBranchQuery(branchId)
    const branch = computed(() => branchQuery.data.value)
    const offers = computed(() => branch.value?.offers ?? [])

    const draft = useBookingDraft({ fieldTypes: () => offers.value.map((o) => o.fieldType) })

    const availabilityParams = computed<AvailabilityParams | null>(() =>
      draft.fieldType.value
        ? { branchId: toValue(branchId), fieldType: draft.fieldType.value, date: draft.date.value }
        : null,
    )
    const availabilityQuery = useAvailabilityQuery(availabilityParams)
    const extrasQuery = useExtrasQuery(branchId)

    const slots = computed(() => availabilityQuery.data.value ?? [])
    const extras = computed(() => extrasQuery.data.value ?? [])

    const selectedSlot = computed(
      () => slots.value.find((s) => s.startTime === draft.startTime.value && s.available) ?? null,
    )
    const fieldPrice = computed(() =>
      selectedSlot.value
        ? calculateFieldPrice(slots.value, selectedSlot.value.startTime, draft.duration.value)
        : null,
    )
    const total = computed(() =>
      fieldPrice.value === null
        ? null
        : fieldPrice.value + calculateExtrasPrice(extras.value, draft.extraIds.value),
    )

    const holdBooking = useHoldBooking()
    // A new selection drops the previous hold
    watch(
      [
        draft.fieldType,
        draft.date,
        draft.startTime,
        draft.duration,
        () => draft.extraIds.value.join(),
      ],
      () => holdBooking.reset(),
    )

    const step = computed<CheckoutStep>(() => {
      if (!selectedSlot.value) return 'pick-slot'
      if (fieldPrice.value === null) return 'slot-unavailable'
      return holdBooking.result.value ? 'pay' : 'hold'
    })

    function submit() {
      if (step.value === 'hold' && availabilityParams.value && selectedSlot.value) {
        holdBooking.hold({
          ...availabilityParams.value,
          startTime: selectedSlot.value.startTime,
          durationMinutes: draft.duration.value,
          extraIds: draft.extraIds.value,
        })
      } else if (step.value === 'pay' && holdBooking.result.value) {
        // TODO: start VNPay/MoMo checkout once the backend provides the payment URL
        void router.push({
          name: 'payment-result',
          query: { bookingId: holdBooking.result.value.id },
        })
      }
    }

    const selectedDate = computed(() => parseDateParam(draft.date.value) ?? new Date())
    const selectedOffer = computed(() =>
      offers.value.find((o) => o.fieldType === draft.fieldType.value),
    )

    /** Ready-to-render texts for the summary card and the mobile bottom bar */
    const labels = computed(() => {
      const fieldType = draft.fieldType.value
      const fieldTypeName = fieldType ? t(`field.type.${fieldType}`) : '—'
      const slot = selectedSlot.value
      const date = selectedDate.value
      const dateText = isToday(date)
        ? `${t('booking.today')}, ${dayLabel.dayMonth(date)}`
        : `${dayLabel.weekday(date)}, ${dayLabel.dayMonth(date)}`

      return {
        fieldType: fieldType
          ? `${fieldTypeName} · ${t('field.players', { count: FIELD_TYPE_PLAYERS[fieldType] })}`
          : '—',
        date: dateText,
        time: slot
          ? `${slot.startTime} – ${addMinutesToTime(slot.startTime, draft.duration.value)}`
          : t('booking.noSlotYet'),
        rate: slot
          ? t('booking.perHour', { price: formatCurrency(slot.hourlyRate, locale.value) })
          : '—',
        total: total.value === null ? '—' : formatCurrency(total.value, locale.value),
        short: slot
          ? `${fieldTypeName} · ${dayLabel.dayMonth(date)} · ${slot.startTime}`
          : t('booking.noSlotYet'),
      }
    })

    return {
      branchQuery,
      branch,
      offers,
      selectedOffer,
      ...draft,
      slots,
      slotsLoading: computed(() => availabilityQuery.isFetching.value && slots.value.length === 0),
      extras,
      selectedSlot,
      total,
      step,
      isSubmitting: holdBooking.isPending,
      labels,
      submit,
    }
  },
)

export { useProvideBranchBooking }

export function useBranchBooking() {
  const state = useInjectedBranchBooking()
  if (!state) {
    throw new Error(
      'useBranchBooking() must be used below a component that called useProvideBranchBooking()',
    )
  }
  return state
}
