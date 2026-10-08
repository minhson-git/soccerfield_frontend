<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppLogo from '@/shared/components/brand/AppLogo.vue'
import LocaleSwitcher from '@/shared/components/LocaleSwitcher.vue'

const { t } = useI18n()
</script>

<template>
  <footer id="lien-he" class="border-t border-line">
    <div
      class="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 px-4 py-9 text-sm text-muted desktop:px-6"
    >
      <AppLogo size="sm" class="text-foreground" />
      <span>{{ t('footer.contact') }}</span>
      <div class="flex items-center gap-5">
        <RouterLink :to="{ name: 'register' }" class="text-muted">{{
          t('footer.forOwners')
        }}</RouterLink>
        <LocaleSwitcher />
      </div>
    </div>
  </footer>
</template>
