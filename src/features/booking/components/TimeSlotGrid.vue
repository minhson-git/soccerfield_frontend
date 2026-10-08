<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { cn } from '@/shared/lib/cn'
import { formatPriceShort } from '@/shared/utils/format'

import type { TimeSlot } from '../booking.types'

const props = withDefaults(
  defineProps<{
    slots: TimeSlot[]
    loading?: boolean
    /** `comfortable`: desktop auto-fill grid; `compact`: 4 columns on phones, more when wider */
    variant?: 'comfortable' | 'compact'
  }>(),
  { loading: false, variant: 'comfortable' },
)
/** Selected start time, HH:mm */
const model = defineModel<string | null>({ required: true })

const { t, locale } = useI18n()

const gridClass =
  props.variant === 'comfortable'
    ? 'grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-2'
    : 'grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8'
const sizeClass = props.variant === 'comfortable' ? 'min-h-16 px-1.5 py-2.5' : 'min-h-14'

function slotClass(slot: TimeSlot): string {
  if (!slot.available) {
    return 'cursor-not-allowed border-dashed border-booked-line bg-transparent text-booked-foreground'
  }
  if (model.value === slot.startTime) {
    return 'border-selected bg-selected text-selected-foreground'
  }
  return cn(
    'border-line-strong text-foreground hover:border-ink',
    props.variant === 'compact' ? 'bg-panel' : 'bg-surface',
  )
}
</script>

<template>
  <div v-if="loading" :class="gridClass" aria-busy="true" :aria-label="t('common.loading')">
    <div v-for="n in 12" :key="n" :class="[sizeClass, 'animate-pulse rounded-xl bg-surface']" />
  </div>

  <p v-else-if="slots.length === 0" class="m-0 text-sm text-muted">{{ t('booking.noSlots') }}</p>

  <div v-else role="group" :aria-label="t('booking.startTime')" :class="gridClass">
    <button
      v-for="slot in slots"
      :key="slot.startTime"
      type="button"
      :disabled="!slot.available"
      :aria-pressed="slot.available ? model === slot.startTime : undefined"
      :class="
        cn(
          'flex flex-col items-center justify-center gap-px rounded-xl border transition-colors',
          sizeClass,
          slotClass(slot),
        )
      "
      @click="model = slot.startTime"
    >
      <span
        class="font-display leading-none font-bold"
        :class="[
          variant === 'comfortable' ? 'text-2xl' : 'text-xl',
          { 'line-through': !slot.available },
        ]"
      >
        {{ slot.startTime }}
      </span>
      <span class="font-semibold" :class="variant === 'comfortable' ? 'text-xs' : 'text-[11px]'">
        {{ slot.available ? formatPriceShort(slot.hourlyRate, locale) : t('booking.booked') }}
      </span>
    </button>
  </div>
</template>
