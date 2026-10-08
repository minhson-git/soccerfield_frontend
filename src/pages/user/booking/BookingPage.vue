<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useProvideBranchBooking } from '@/features/booking'
import { useDevice } from '@/shared/composables/useDevice'

import BookingPageDesktop from './BookingPage.desktop.vue'
import BookingPageMobile from './BookingPage.mobile.vue'

const route = useRoute()
const { t } = useI18n()
const { isDesktop } = useDevice()

const branchId = computed(() => Number(route.params.branchId))
// State lives here (and in the URL), so rotating a tablet across the breakpoint keeps the selection
const { branchQuery, branch } = useProvideBranchBooking(branchId)
const isLoading = branchQuery.isPending
</script>

<!-- Level 3: mobile and desktop share state, only the layout differs. -->
<template>
  <div
    v-if="isLoading"
    class="flex flex-1 items-center justify-center p-10 text-muted"
    aria-busy="true"
  >
    {{ t('common.loading') }}
  </div>

  <div v-else-if="!branch" class="flex flex-1 flex-col items-center justify-center gap-4 p-10">
    <h1 class="m-0 font-display text-4xl font-extrabold uppercase">{{ t('branch.notFound') }}</h1>
    <RouterLink :to="{ name: 'home' }" class="text-ink">{{ t('common.backHome') }}</RouterLink>
  </div>

  <BookingPageDesktop v-else-if="isDesktop" />
  <BookingPageMobile v-else />
</template>
