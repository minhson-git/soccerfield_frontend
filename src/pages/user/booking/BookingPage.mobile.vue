<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import {
  BookingBottomBar,
  BookingSheet,
  DayPicker,
  FieldTypePicker,
  TimeSlotGrid,
  useBranchBooking,
} from '@/features/booking'
import { BranchHero } from '@/features/branch'
import { useShareLink } from '@/shared/composables/useShareLink'
import OverlineText from '@/shared/components/ui/OverlineText.vue'

const { t } = useI18n()
const router = useRouter()
const { branch, offers, days, fieldType, date, startTime, duration, slots, slotsLoading } =
  useBranchBooking()
const { share, copied } = useShareLink()

const sheetOpen = ref(false)

function goBack() {
  // vue-router records the previous entry; without one (opened from a shared link) go home
  if (window.history.state?.back) router.back()
  else void router.push({ name: 'home' })
}

function shareBranch() {
  if (branch.value) void share({ title: branch.value.name, url: window.location.href })
}
</script>

<!-- Immersive: the app header is hidden on mobile for this route (meta.immersiveOnMobile). -->
<template>
  <div v-if="branch" class="flex min-h-dvh flex-col">
    <BranchHero :branch="branch" :link-copied="copied" @back="goBack" @share="shareBranch" />

    <div class="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-[22px] px-4 pt-5 pb-6">
      <FieldTypePicker v-model="fieldType" :offers="offers" variant="pill" />

      <div class="flex flex-col gap-2.5">
        <OverlineText>{{ t('booking.pickDate') }}</OverlineText>
        <DayPicker v-model="date" :days="days" variant="compact" />
      </div>

      <div class="flex flex-col gap-2.5">
        <div class="flex justify-between gap-2">
          <OverlineText>{{ t('booking.startTime') }}</OverlineText>
          <span class="text-xs text-muted">{{ t('booking.perMatch', { minutes: duration }) }}</span>
        </div>
        <TimeSlotGrid
          v-model="startTime"
          :slots="slots"
          :loading="slotsLoading"
          variant="compact"
        />
      </div>
    </div>

    <BookingBottomBar @continue="sheetOpen = true" />
    <BookingSheet v-model:open="sheetOpen" />
  </div>
</template>
