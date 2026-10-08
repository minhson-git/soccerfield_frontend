<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <h1>{{ t('pages.notFound.title') }}</h1>
  <RouterLink :to="{ name: 'home' }">{{ t('common.backHome') }}</RouterLink>
</template>
