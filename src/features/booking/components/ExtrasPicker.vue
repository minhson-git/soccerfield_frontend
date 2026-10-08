<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { formatCurrency } from '@/shared/utils/format'

import type { BookingExtra } from '../booking.types'

withDefaults(
  defineProps<{
    extras: BookingExtra[]
    /** `inverse` inside the dark summary card */
    tone?: 'default' | 'inverse'
  }>(),
  { tone: 'default' },
)
const model = defineModel<number[]>({ required: true })

const { t, locale } = useI18n()
</script>

<template>
  <fieldset class="m-0 flex min-w-0 flex-col gap-1 border-0 p-0">
    <legend
      class="mb-2 p-0 text-[13px] font-semibold tracking-[0.06em] uppercase"
      :class="tone === 'inverse' ? 'text-inverse-muted' : 'text-muted'"
    >
      {{ t('booking.extras') }}
    </legend>
    <label
      v-for="extra in extras"
      :key="extra.id"
      class="flex min-h-11 cursor-pointer items-center gap-3"
    >
      <input
        v-model="model"
        type="checkbox"
        :value="extra.id"
        class="size-5 shrink-0"
        :class="tone === 'inverse' ? 'accent-inverse-cta' : 'accent-ink'"
      />
      <span class="flex-1 text-[15px]">{{ extra.name }}</span>
      <span class="text-[15px] font-semibold">{{ formatCurrency(extra.price, locale) }}</span>
    </label>
  </fieldset>
</template>
