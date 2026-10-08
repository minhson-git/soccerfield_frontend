<script setup lang="ts">
import { useI18n } from 'vue-i18n'

withDefaults(defineProps<{ size?: 'md' | 'sm' }>(), { size: 'md' })

const { t } = useI18n()
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg
      v-if="size === 'md'"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      class="text-ink"
      aria-hidden="true"
    >
      <rect x="2" y="6" width="30" height="22" rx="2" />
      <line x1="17" y1="6" x2="17" y2="28" />
      <circle cx="17" cy="17" r="4.5" />
    </svg>
    <span
      class="font-display font-extrabold tracking-[0.04em] uppercase"
      :class="size === 'md' ? 'text-[26px]' : 'text-[22px]'"
    >
      {{ t('app.name') }}
    </span>
  </span>
</template>
