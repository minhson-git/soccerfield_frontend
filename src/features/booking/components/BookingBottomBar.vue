<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppButton from '@/shared/components/ui/AppButton.vue'

import { useBranchBooking } from '../composables/useBranchBooking'

const emit = defineEmits<{ continue: [] }>()

const { t } = useI18n()
const { labels, selectedSlot } = useBranchBooking()
</script>

<!-- Mobile sticky bar: current selection, price and the next step. -->
<template>
  <div
    class="sticky bottom-0 z-10 flex items-center gap-3.5 border-t border-line bg-panel px-4 pt-3.5 pb-[max(1.375rem,env(safe-area-inset-bottom))] short:pt-2 short:pb-2"
  >
    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
      <span class="truncate text-xs text-muted">{{ labels.short }}</span>
      <span class="font-display text-[30px] leading-none font-extrabold" aria-live="polite">
        {{ labels.total }}
      </span>
    </div>
    <AppButton
      size="lg"
      class="min-h-[52px] px-[26px]"
      :disabled="!selectedSlot"
      @click="emit('continue')"
    >
      {{ t('booking.bookNow') }}
    </AppButton>
  </div>
</template>
