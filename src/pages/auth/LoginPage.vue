<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { LoginForm } from '@/features/auth'

const { t } = useI18n()
</script>

<template>
  <h1 class="m-0 font-display text-5xl leading-none font-extrabold uppercase">
    {{ t('pages.login.title') }}
  </h1>
  <LoginForm />
</template>
