<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { BranchCard, type Branch } from '@/features/branch'

defineProps<{ branches: Branch[]; loading: boolean }>()

const { t } = useI18n()
</script>

<!-- Stays light in dark mode, as in the design. -->
<template>
  <section id="san-gan-ban" class="scroll-mt-4 bg-section-alt text-forest">
    <div
      class="mx-auto flex max-w-[1240px] flex-col gap-9 px-4 py-16 desktop:px-6 desktop:py-[88px]"
    >
      <h2
        class="m-0 font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none font-extrabold uppercase"
      >
        {{ t('home.nearbyTitle') }}
      </h2>

      <div
        v-if="loading"
        class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6"
        aria-busy="true"
        :aria-label="t('common.loading')"
      >
        <div v-for="n in 3" :key="n" class="h-[380px] animate-pulse rounded-card bg-white/70" />
      </div>

      <p v-else-if="branches.length === 0" class="m-0 text-card-muted">{{ t('home.noResults') }}</p>

      <ul
        v-else
        class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-0"
      >
        <li v-for="branch in branches" :key="branch.id" class="flex">
          <BranchCard :branch="branch" class="flex-1" />
        </li>
      </ul>
    </div>
  </section>
</template>
