<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import {
  BookingSummaryCard,
  DayPicker,
  DurationPicker,
  FieldTypePicker,
  SlotLegend,
  TimeSlotGrid,
  useBranchBooking,
} from '@/features/booking'
import { BranchInfoHeader } from '@/features/branch'
import OverlineText from '@/shared/components/ui/OverlineText.vue'

const { t } = useI18n()
const { branch, offers, days, fieldType, date, startTime, duration, slots, slotsLoading } =
  useBranchBooking()
</script>

<template>
  <div v-if="branch" class="mx-auto w-full max-w-[1240px] px-6">
    <section class="flex flex-col gap-6 pt-7">
      <nav :aria-label="t('nav.breadcrumb')">
        <ol class="m-0 flex list-none flex-wrap gap-2 p-0 text-sm text-muted">
          <li>
            <RouterLink :to="{ name: 'home' }" class="text-muted">{{ t('nav.home') }}</RouterLink>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <RouterLink :to="{ name: 'home', hash: '#san-gan-ban' }" class="text-muted">
              {{ t('nav.nearby') }}
            </RouterLink>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" class="font-semibold text-foreground">{{ branch.name }}</li>
        </ol>
      </nav>
      <BranchInfoHeader :branch="branch" />
    </section>

    <section class="pt-10 pb-24" aria-labelledby="schedule-title">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2
          id="schedule-title"
          class="m-0 font-display text-[40px] leading-none font-extrabold uppercase"
        >
          {{ t('booking.scheduleTitle') }}
        </h2>
        <SlotLegend />
      </div>

      <div class="flex flex-wrap items-start gap-6">
        <div
          class="flex min-w-0 flex-[999_1_560px] flex-col gap-7 rounded-panel border border-line bg-panel p-7"
        >
          <div class="flex flex-col gap-3">
            <OverlineText>{{ t('booking.stepFieldType') }}</OverlineText>
            <FieldTypePicker v-model="fieldType" :offers="offers" />
          </div>

          <div class="flex flex-col gap-3">
            <OverlineText>{{ t('booking.stepDate') }}</OverlineText>
            <DayPicker v-model="date" :days="days" />
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-wrap justify-between gap-2">
              <OverlineText>{{ t('booking.stepStartTime') }}</OverlineText>
              <span class="text-[13px] text-muted">{{
                t('booking.peakHint', { time: '17:00' })
              }}</span>
            </div>
            <TimeSlotGrid v-model="startTime" :slots="slots" :loading="slotsLoading" />
          </div>

          <div class="flex flex-col gap-3">
            <OverlineText>{{ t('booking.stepDuration') }}</OverlineText>
            <DurationPicker v-model="duration" />
          </div>
        </div>

        <BookingSummaryCard class="sticky top-6 min-w-0 flex-[1_1_340px]" />
      </div>
    </section>
  </div>
</template>
