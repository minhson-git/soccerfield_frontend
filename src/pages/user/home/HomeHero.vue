<script setup lang="ts">
import { Clock } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

import PitchIllustration from '@/shared/components/brand/PitchIllustration.vue'

const { t } = useI18n()

// TODO: comes from the API ("nearest free slot near you") once it exists
const nearestSlot = {
  branchId: 1,
  query: { type: 'SEVEN_A_SIDE', slot: '19:00' },
  time: '19:00',
  fieldType: 'SEVEN_A_SIDE',
} as const
</script>

<template>
  <section id="top" class="mx-auto w-full max-w-[1240px] px-4 py-12 desktop:px-6 desktop:py-[72px]">
    <div class="flex flex-wrap items-center gap-14">
      <div class="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
        <span
          class="inline-flex items-center gap-2 self-start rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] font-semibold tracking-[0.06em] text-muted uppercase"
        >
          <span class="size-2 rounded-full bg-ink" aria-hidden="true" />
          {{ t('home.badge') }}
        </span>
        <h1
          class="m-0 font-display text-[clamp(3.5rem,9vw,6.5rem)] leading-[0.9] font-extrabold tracking-[-0.01em] uppercase"
        >
          {{ t('home.titleLine1') }}<br />{{ t('home.titleLine2') }}<br />
          <span class="text-ink">{{ t('home.titleLine3') }}</span>
        </h1>
        <p class="m-0 max-w-[480px] text-lg leading-relaxed text-muted">{{ t('home.intro') }}</p>
      </div>

      <div class="relative min-w-0 flex-[1_1_420px]">
        <PitchIllustration :label="t('home.pitchAlt')" />
        <RouterLink
          :to="{
            name: 'branch-booking',
            params: { branchId: nearestSlot.branchId },
            query: nearestSlot.query,
          }"
          class="relative mx-3 -mt-7 flex items-center gap-4 rounded-2xl bg-inverse px-5 py-4 text-inverse-foreground no-underline shadow-[0_18px_40px_rgba(11,22,16,0.25)] desktop:absolute desktop:-bottom-7 desktop:-left-5 desktop:m-0"
        >
          <span
            class="flex size-12 flex-none items-center justify-center rounded-xl bg-inverse-cta text-inverse-cta-foreground"
          >
            <Clock class="size-6" aria-hidden="true" />
          </span>
          <span class="flex flex-col gap-0.5">
            <span class="text-[13px] font-medium text-inverse-muted">{{
              t('home.nearestSlot')
            }}</span>
            <span class="font-display text-2xl font-bold">
              {{
                t('home.nearestSlotValue', {
                  time: nearestSlot.time,
                  field: t(`field.type.${nearestSlot.fieldType}`),
                })
              }}
            </span>
          </span>
        </RouterLink>
      </div>
    </div>

    <slot />
  </section>
</template>
