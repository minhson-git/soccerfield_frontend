<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { setLocale, SUPPORTED_LOCALES, type AppLocale } from '@/shared/i18n'

const { t, locale } = useI18n()

function onChange(event: Event) {
  setLocale((event.target as HTMLSelectElement).value as AppLocale)
}
</script>

<template>
  <select
    :value="locale"
    :aria-label="t('common.language')"
    class="min-h-11 rounded-full border border-line-strong bg-transparent px-3 text-sm font-semibold text-foreground"
    @change="onChange"
  >
    <option v-for="code in SUPPORTED_LOCALES" :key="code" :value="code" class="text-forest">
      {{ code.toUpperCase() }}
    </option>
  </select>
</template>
