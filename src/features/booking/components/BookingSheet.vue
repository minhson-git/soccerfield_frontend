<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppSheet from '@/shared/components/ui/AppSheet.vue'
import OverlineText from '@/shared/components/ui/OverlineText.vue'

import { useBranchBooking } from '../composables/useBranchBooking'
import CheckoutButton from './CheckoutButton.vue'
import DurationPicker from './DurationPicker.vue'
import ExtrasPicker from './ExtrasPicker.vue'
import HoldNotice from './HoldNotice.vue'

const open = defineModel<boolean>('open', { required: true })

const { t } = useI18n()
const { labels, duration, extras, extraIds, step, isSubmitting, submit } = useBranchBooking()
</script>

<!-- Mobile: duration and extras live here (the design's mobile screen fixes 90 min). -->
<template>
  <AppSheet v-model:open="open" :title="t('booking.sheetTitle')" :description="labels.short">
    <div class="flex flex-col gap-6 pt-1">
      <div class="flex flex-col gap-2.5">
        <OverlineText>{{ t('booking.duration') }}</OverlineText>
        <DurationPicker v-model="duration" />
        <p class="m-0 text-sm text-muted">{{ labels.time }}</p>
      </div>
      <ExtrasPicker v-model="extraIds" :extras="extras" />
    </div>

    <template #footer>
      <div class="flex flex-col gap-3">
        <div class="flex items-baseline justify-between gap-3">
          <span class="text-[15px] font-semibold">{{ t('booking.subtotal') }}</span>
          <span class="font-display text-[34px] leading-none font-extrabold" aria-live="polite">
            {{ labels.total }}
          </span>
        </div>
        <HoldNotice v-if="step === 'pay'" />
        <CheckoutButton :step="step" :loading="isSubmitting" variant="accent" @submit="submit" />
        <p class="m-0 text-center text-[13px] text-muted">{{ t('booking.freeCancel') }}</p>
      </div>
    </template>
  </AppSheet>
</template>
