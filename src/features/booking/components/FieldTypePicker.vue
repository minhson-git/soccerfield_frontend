<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { BranchFieldOffer } from '@/features/branch'
import { FIELD_TYPE_PLAYERS, type FieldType } from '@/features/field'
import ChoiceButton from '@/shared/components/ui/ChoiceButton.vue'

withDefaults(
  defineProps<{
    offers: BranchFieldOffer[]
    /** `card`: desktop tiles with details; `pill`: compact mobile pills */
    variant?: 'card' | 'pill'
  }>(),
  { variant: 'card' },
)
const model = defineModel<FieldType | null>({ required: true })

const { t } = useI18n()
</script>

<template>
  <div
    role="group"
    :aria-label="t('booking.fieldType')"
    :class="variant === 'card' ? 'grid grid-cols-3 gap-2.5' : 'flex gap-2'"
  >
    <ChoiceButton
      v-for="offer in offers"
      :key="offer.fieldType"
      :pressed="model === offer.fieldType"
      :tone="variant === 'pill' ? 'panel' : 'surface'"
      :class="
        variant === 'card'
          ? 'flex min-h-18 flex-col items-start gap-0.5 rounded-tile px-4 py-3.5 text-left'
          : 'min-h-11 flex-1 rounded-full text-[15px] font-bold'
      "
      @click="model = offer.fieldType"
    >
      <template v-if="variant === 'card'">
        <span class="font-display text-[26px] leading-none font-bold">
          {{ t(`field.type.${offer.fieldType}`) }}
        </span>
        <span class="text-[13px] font-medium opacity-85">
          {{ t('field.players', { count: FIELD_TYPE_PLAYERS[offer.fieldType] }) }} ·
          {{ t(`field.surface.${offer.surface}`) }}
        </span>
      </template>
      <template v-else>{{ t(`field.type.${offer.fieldType}`) }}</template>
    </ChoiceButton>
  </div>
</template>
