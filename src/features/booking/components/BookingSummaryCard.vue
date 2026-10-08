<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useBranchBooking } from '../composables/useBranchBooking'
import CheckoutButton from './CheckoutButton.vue'
import ExtrasPicker from './ExtrasPicker.vue'
import HoldNotice from './HoldNotice.vue'

const { t } = useI18n()
const { labels, extras, extraIds, step, isSubmitting, submit } = useBranchBooking()
</script>

<!-- Desktop "Phiếu đặt sân" (inverted card on the right). -->
<template>
  <aside class="flex flex-col gap-5 rounded-panel bg-inverse p-7 text-inverse-foreground">
    <h3 class="m-0 font-display text-[32px] font-extrabold uppercase">
      {{ t('booking.summaryTitle') }}
    </h3>

    <dl class="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-[15px]">
      <dt class="text-inverse-muted">{{ t('booking.summary.field') }}</dt>
      <dd class="m-0 text-right font-semibold">{{ labels.fieldType }}</dd>
      <dt class="text-inverse-muted">{{ t('booking.summary.date') }}</dt>
      <dd class="m-0 text-right font-semibold">{{ labels.date }}</dd>
      <dt class="text-inverse-muted">{{ t('booking.summary.time') }}</dt>
      <dd class="m-0 text-right font-semibold">{{ labels.time }}</dd>
      <dt class="text-inverse-muted">{{ t('booking.summary.rate') }}</dt>
      <dd class="m-0 text-right font-semibold">{{ labels.rate }}</dd>
    </dl>

    <div class="border-t border-dashed border-inverse-line pt-[18px]">
      <ExtrasPicker v-model="extraIds" :extras="extras" tone="inverse" />
    </div>

    <div
      class="flex items-baseline justify-between gap-3 border-t border-dashed border-inverse-line pt-[18px]"
    >
      <span class="text-[15px] font-semibold">{{ t('booking.subtotal') }}</span>
      <span class="font-display text-[44px] leading-none font-extrabold" aria-live="polite">
        {{ labels.total }}
      </span>
    </div>

    <HoldNotice v-if="step === 'pay'" />
    <CheckoutButton :step="step" :loading="isSubmitting" variant="inverse" @submit="submit" />
    <p class="m-0 text-center text-[13px] text-inverse-muted">{{ t('booking.freeCancel') }}</p>
  </aside>
</template>
