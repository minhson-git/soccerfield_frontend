<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/shared/components/ui/AppButton.vue'

import type { CheckoutStep } from '../booking.types'

const props = defineProps<{
  step: CheckoutStep
  loading: boolean
  variant: 'accent' | 'inverse'
}>()
const emit = defineEmits<{ submit: [] }>()

const { t } = useI18n()

const LABEL_KEYS = {
  'pick-slot': 'booking.cta.pickSlot',
  'slot-unavailable': 'booking.cta.unavailable',
  hold: 'booking.cta.hold',
  pay: 'booking.cta.pay',
} as const satisfies Record<CheckoutStep, string>
</script>

<template>
  <AppButton
    :variant="props.variant"
    size="lg"
    class="w-full"
    :disabled="props.loading || props.step === 'pick-slot' || props.step === 'slot-unavailable'"
    :aria-busy="props.loading"
    @click="emit('submit')"
  >
    {{ props.loading ? t('common.processing') : t(LABEL_KEYS[props.step]) }}
  </AppButton>
</template>
