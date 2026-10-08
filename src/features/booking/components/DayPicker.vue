<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ChoiceButton from '@/shared/components/ui/ChoiceButton.vue'

import { useDayLabel } from '../composables/useDayLabel'
import { toDateParam } from '../utils/booking-time'

withDefaults(
  defineProps<{
    days: Date[]
    /** `full`: 7-column desktop grid with month; `compact`: scrollable mobile row */
    variant?: 'full' | 'compact'
  }>(),
  { variant: 'full' },
)
/** yyyy-MM-dd */
const model = defineModel<string>({ required: true })

const { t } = useI18n()
const { weekday, month } = useDayLabel()
</script>

<template>
  <div
    role="group"
    :aria-label="t('booking.date')"
    :class="
      variant === 'full'
        ? 'grid grid-cols-[repeat(7,minmax(64px,1fr))] gap-2 overflow-x-auto'
        : '-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5'
    "
  >
    <ChoiceButton
      v-for="day in days"
      :key="toDateParam(day)"
      :pressed="model === toDateParam(day)"
      :tone="variant === 'compact' ? 'panel' : 'surface'"
      :class="[
        'flex flex-col items-center justify-center gap-0.5 rounded-tile',
        variant === 'full' ? 'min-h-20 px-1.5 py-3' : 'min-h-[72px] w-[58px] flex-none',
      ]"
      @click="model = toDateParam(day)"
    >
      <span class="font-semibold" :class="variant === 'full' ? 'text-[13px]' : 'text-xs'">
        {{ weekday(day, { short: variant === 'compact' }) }}
      </span>
      <span
        class="font-display leading-none font-bold"
        :class="variant === 'full' ? 'text-[30px]' : 'text-[26px]'"
      >
        {{ day.getDate() }}
      </span>
      <span v-if="variant === 'full'" class="text-xs opacity-85">{{ month(day) }}</span>
    </ChoiceButton>
  </div>
</template>
