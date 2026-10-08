<script setup lang="ts">
import { Check } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

import { HOLD_MINUTES } from '../booking.constants'

const { t } = useI18n()
</script>

<template>
  <div
    role="status"
    class="flex items-start gap-3 rounded-tile bg-notice p-4 text-notice-foreground"
  >
    <Check class="size-6 flex-none text-accent" :stroke-width="2.4" aria-hidden="true" />
    <div class="flex flex-col gap-1">
      <span class="font-bold">{{ t('booking.held.title') }}</span>
      <span class="text-sm text-notice-muted">
        {{ t('booking.held.description', { minutes: HOLD_MINUTES }) }}
      </span>
    </div>
  </div>
</template>
