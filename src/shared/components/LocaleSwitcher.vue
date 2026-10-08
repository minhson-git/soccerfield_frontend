<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { setLocale, SUPPORTED_LOCALES, type AppLocale } from '@/shared/i18n'

const { t, locale } = useI18n()

function onChange(event: Event) {
  setLocale((event.target as HTMLSelectElement).value as AppLocale)
}
</script>

<template>
  <select :value="locale" :aria-label="t('common.language')" @change="onChange">
    <option v-for="code in SUPPORTED_LOCALES" :key="code" :value="code">
      {{ code.toUpperCase() }}
    </option>
  </select>
</template>
