<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useAuthStore, type Role } from '@/features/auth'
import LocaleSwitcher from '@/shared/components/LocaleSwitcher.vue'

interface NavItem {
  name: string
  labelKey: string
}

const NAV_BY_ROLE: Partial<Record<Role, NavItem[]>> = {
  OWNER: [
    { name: 'owner-dashboard', labelKey: 'pages.ownerDashboard.title' },
    { name: 'owner-branches', labelKey: 'pages.ownerBranches.title' },
    { name: 'owner-fields', labelKey: 'pages.ownerFields.title' },
    { name: 'owner-bookings', labelKey: 'pages.ownerBookings.title' },
  ],
  ADMIN: [
    { name: 'admin-dashboard', labelKey: 'pages.adminDashboard.title' },
    { name: 'admin-users', labelKey: 'pages.adminUsers.title' },
    { name: 'admin-branches', labelKey: 'pages.adminBranches.title' },
    { name: 'admin-bookings', labelKey: 'pages.adminBookings.title' },
  ],
}

const { t } = useI18n()
const auth = useAuthStore()
const router = useRouter()

const navItems = computed(() => (auth.role ? (NAV_BY_ROLE[auth.role] ?? []) : []))

async function logout() {
  await auth.logout()
  await router.push({ name: 'login' })
}
</script>

<!-- Shared by owner and admin. Sidebar on desktop, drawer on mobile (styling pending design). -->
<template>
  <aside>
    <strong>{{ t('app.name') }}</strong>
    <span v-if="auth.role">{{ t(`roles.${auth.role}`) }}</span>
    <nav>
      <RouterLink v-for="item in navItems" :key="item.name" :to="{ name: item.name }">
        {{ t(item.labelKey) }}
      </RouterLink>
    </nav>
    <LocaleSwitcher />
    <button type="button" @click="logout">{{ t('common.logout') }}</button>
  </aside>

  <main>
    <slot />
  </main>
</template>
