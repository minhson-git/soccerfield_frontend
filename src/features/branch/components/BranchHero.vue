<script setup lang="ts">
import { ChevronLeft, Share } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

import PitchStripes from '@/shared/components/brand/PitchStripes.vue'
import ThemeToggle from '@/shared/components/ThemeToggle.vue'
import AppButton from '@/shared/components/ui/AppButton.vue'
import { formatDistance } from '@/shared/utils/format'

import type { Branch } from '../branch.types'

defineProps<{ branch: Branch; linkCopied?: boolean }>()
const emit = defineEmits<{ back: []; share: [] }>()

const { t, locale } = useI18n()
</script>

<!-- Mobile venue cover with back / theme / share actions. Shrinks on short (landscape) screens. -->
<template>
  <PitchStripes
    :stripe="34"
    lines="center"
    class="flex h-[210px] flex-none flex-col justify-between p-4 text-chalk short:h-[124px] short:py-3"
  >
    <div class="relative flex justify-between">
      <AppButton variant="overlay" size="icon" :aria-label="t('common.back')" @click="emit('back')">
        <ChevronLeft class="size-5" :stroke-width="2.2" aria-hidden="true" />
      </AppButton>
      <div class="flex gap-2">
        <ThemeToggle variant="overlay" />
        <AppButton
          variant="overlay"
          size="icon"
          :aria-label="linkCopied ? t('branch.linkCopied') : t('branch.share')"
          @click="emit('share')"
        >
          <Share class="size-5" :stroke-width="2.2" aria-hidden="true" />
        </AppButton>
      </div>
    </div>

    <div class="relative flex flex-col gap-0.5">
      <h1 class="m-0 font-display text-4xl leading-none font-extrabold uppercase short:text-[28px]">
        {{ branch.name }}
      </h1>
      <p class="m-0 text-[13px] text-chalk/85 short:hidden">
        {{ branch.address }} · {{ formatDistance(branch.distanceKm, locale) }} ·
        {{ branch.openingTime }} – {{ branch.closingTime }}
      </p>
    </div>
    <p v-if="linkCopied" role="status" class="sr-only">{{ t('branch.linkCopied') }}</p>
  </PitchStripes>
</template>
