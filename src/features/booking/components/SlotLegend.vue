<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <ul class="m-0 flex list-none flex-wrap gap-[18px] p-0 text-sm text-muted">
    <li class="inline-flex items-center gap-2">
      <span class="size-3.5 rounded border border-line-strong bg-surface" aria-hidden="true" />
      {{ t('booking.legend.free') }}
    </li>
    <li class="inline-flex items-center gap-2">
      <span class="size-3.5 rounded border border-dashed border-booked-line" aria-hidden="true" />
      {{ t('booking.legend.booked') }}
    </li>
    <li class="inline-flex items-center gap-2">
      <span class="size-3.5 rounded bg-selected" aria-hidden="true" />
      {{ t('booking.legend.selected') }}
    </li>
  </ul>
</template>
