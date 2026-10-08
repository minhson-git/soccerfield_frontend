<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import ChoiceButton from '@/shared/components/ui/ChoiceButton.vue'

import { DURATION_OPTIONS } from '../booking.constants'

withDefaults(defineProps<{ tone?: 'surface' | 'panel' }>(), { tone: 'surface' })
const model = defineModel<number>({ required: true })

const { t } = useI18n()
</script>

<template>
  <div role="group" :aria-label="t('booking.duration')" class="flex flex-wrap gap-2">
    <ChoiceButton
      v-for="minutes in DURATION_OPTIONS"
      :key="minutes"
      :pressed="model === minutes"
      :tone="tone"
      class="min-h-11 rounded-full px-[22px] text-[15px] font-semibold"
      @click="model = minutes"
    >
      {{ t('booking.minutes', { count: minutes }) }}
    </ChoiceButton>
  </div>
</template>
