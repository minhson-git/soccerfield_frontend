<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

import AppButton from '@/shared/components/ui/AppButton.vue'

const { t } = useI18n()

const STEPS = [
  { number: '01', titleKey: 'home.step1Title', textKey: 'home.step1Text' },
  { number: '02', titleKey: 'home.step2Title', textKey: 'home.step2Text' },
  { number: '03', titleKey: 'home.step3Title', textKey: 'home.step3Text' },
] as const
</script>

<template>
  <section
    id="cach-dat"
    class="mx-auto w-full max-w-[1240px] scroll-mt-4 px-4 py-16 desktop:px-6 desktop:py-[88px]"
  >
    <h2
      class="m-0 mb-9 font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none font-extrabold uppercase"
    >
      {{ t('home.stepsTitle') }}
    </h2>
    <ol class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 p-0">
      <li
        v-for="step in STEPS"
        :key="step.number"
        class="flex flex-col gap-2.5 border-t-2 border-ink pt-5"
      >
        <span class="font-display text-5xl leading-none font-extrabold text-ink" aria-hidden="true">
          {{ step.number }}
        </span>
        <h3 class="m-0 text-xl font-bold">{{ t(step.titleKey) }}</h3>
        <p class="m-0 leading-relaxed text-muted">{{ t(step.textKey) }}</p>
      </li>
    </ol>
    <AppButton as-child size="lg" class="mt-12">
      <RouterLink :to="{ name: 'home', hash: '#san-gan-ban' }">
        {{ t('home.startBooking') }}
        <ArrowRight class="size-5" aria-hidden="true" />
      </RouterLink>
    </AppButton>
  </section>
</template>
