<script setup lang="ts">
import { Clock, MapPin, Phone } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

import PitchStripes from '@/shared/components/brand/PitchStripes.vue'

import type { Branch } from '../branch.types'
import AmenityChips from './AmenityChips.vue'

defineProps<{ branch: Branch }>()

const { t } = useI18n()
</script>

<!-- Desktop venue header: photo + name, contact details and amenities. -->
<template>
  <div class="flex flex-wrap items-stretch gap-6">
    <PitchStripes
      lines="full"
      class="flex min-h-[220px] flex-[1_1_360px] items-end rounded-panel p-[18px]"
    >
      <span class="relative rounded-full bg-forest px-2.5 py-1.5 text-xs font-semibold text-chalk">
        {{ t('branch.photoPlaceholder') }} · {{ t('branch.viewGallery') }}
      </span>
    </PitchStripes>

    <div class="flex min-w-0 flex-[999_1_520px] flex-col justify-center gap-3.5">
      <span class="text-[13px] font-bold tracking-[0.08em] text-ink uppercase">
        {{ t('pages.booking.title') }}
      </span>
      <h1 class="m-0 font-display text-[72px] leading-[0.95] font-extrabold uppercase">
        {{ branch.name }}
      </h1>
      <ul class="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[15px] text-muted">
        <li class="inline-flex items-center gap-1.5">
          <MapPin class="size-[18px]" aria-hidden="true" />
          {{ branch.address }}, {{ branch.district }}
        </li>
        <li class="inline-flex items-center gap-1.5">
          <Clock class="size-[18px]" aria-hidden="true" />
          {{ t('branch.openHours', { open: branch.openingTime, close: branch.closingTime }) }}
        </li>
        <li class="inline-flex items-center gap-1.5">
          <Phone class="size-[18px]" aria-hidden="true" />
          <a :href="`tel:${branch.phone.replaceAll(' ', '')}`" class="text-inherit">
            {{ branch.phone }}
          </a>
        </li>
      </ul>
      <AmenityChips :amenities="branch.amenities" />
    </div>
  </div>
</template>
