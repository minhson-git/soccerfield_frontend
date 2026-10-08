<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth'
import LocaleSwitcher from '@/shared/components/LocaleSwitcher.vue'

const { t } = useI18n()
const auth = useAuthStore()
const router = useRouter()

async function logout() {
  await auth.logout()
  await router.push({ name: 'home' })
}
</script>

<!-- Customer-facing layout. Mobile-first: header on desktop, bottom nav on mobile (styling pending design). -->
<template>
  <header>
    <RouterLink :to="{ name: 'home' }">{{ t('app.name') }}</RouterLink>
    <nav>
      <template v-if="auth.isAuthenticated">
        <RouterLink :to="{ name: 'my-bookings' }">{{ t('pages.myBookings.title') }}</RouterLink>
        <RouterLink :to="{ name: 'profile' }">{{ t('pages.profile.title') }}</RouterLink>
        <button type="button" @click="logout">{{ t('common.logout') }}</button>
      </template>
      <RouterLink v-else :to="{ name: 'login' }">{{ t('pages.login.title') }}</RouterLink>
    </nav>
    <LocaleSwitcher />
  </header>

  <main>
    <slot />
  </main>
</template>
