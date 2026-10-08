<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/features/auth'
import AppLogo from '@/shared/components/brand/AppLogo.vue'
import ThemeToggle from '@/shared/components/ThemeToggle.vue'
import AppButton from '@/shared/components/ui/AppButton.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const isBookingPage = computed(() => route.name === 'branch-booking')

const NAV_ITEMS = [
  { labelKey: 'nav.book', hash: '#tim-san' },
  { labelKey: 'nav.nearby', hash: '#san-gan-ban' },
  { labelKey: 'nav.howItWorks', hash: '#cach-dat' },
  { labelKey: 'nav.contact', hash: '#lien-he' },
] as const

async function logout() {
  await auth.logout()
  await router.push({ name: 'home' })
}
</script>

<!-- Responsive (level 1): section links collapse below the desktop breakpoint. -->
<template>
  <header class="border-b border-line">
    <div
      class="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-3 desktop:px-6 desktop:py-[18px]"
    >
      <RouterLink :to="{ name: 'home' }" class="text-foreground no-underline">
        <AppLogo />
      </RouterLink>

      <nav :aria-label="t('nav.main')" class="hidden items-center gap-7 desktop:flex">
        <RouterLink
          v-for="item in NAV_ITEMS"
          :key="item.hash"
          :to="{ name: 'home', hash: item.hash }"
          :aria-current="item.hash === '#tim-san' && isBookingPage ? 'page' : undefined"
          class="text-[15px] font-medium text-foreground no-underline hover:text-ink aria-[current=page]:border-b-2 aria-[current=page]:border-ink aria-[current=page]:pb-1 aria-[current=page]:font-bold aria-[current=page]:text-ink"
        >
          {{ t(item.labelKey) }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2.5">
        <ThemeToggle />
        <template v-if="auth.isAuthenticated">
          <AppButton as-child variant="outline">
            <RouterLink :to="{ name: 'my-bookings' }">{{ t('nav.myBookings') }}</RouterLink>
          </AppButton>
          <AppButton variant="outline" class="hidden sm:inline-flex" @click="logout">
            {{ t('common.logout') }}
          </AppButton>
        </template>
        <AppButton v-else as-child variant="outline">
          <RouterLink :to="{ name: 'login' }">{{ t('nav.login') }}</RouterLink>
        </AppButton>
        <AppButton v-if="!isBookingPage" as-child class="hidden sm:inline-flex">
          <RouterLink :to="{ name: 'home', hash: '#san-gan-ban' }">{{
            t('nav.bookNow')
          }}</RouterLink>
        </AppButton>
      </div>
    </div>
  </header>
</template>
