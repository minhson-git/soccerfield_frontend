<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import PitchStripes from '@/shared/components/brand/PitchStripes.vue'
import AppButton from '@/shared/components/ui/AppButton.vue'
import { formatDistance, formatPriceShort } from '@/shared/utils/format'

import type { Branch } from '../branch.types'
import { getStartingRate } from '../branch.utils'

const props = defineProps<{ branch: Branch }>()

const { t, locale } = useI18n()

const tags = computed(() => [
  ...props.branch.offers.map((offer) => t(`field.type.${offer.fieldType}`)),
  ...props.branch.amenities.slice(0, 1).map((amenity) => t(`amenity.${amenity}`)),
])
</script>

<!-- Always-light card (the venue section keeps a light ground in both themes). -->
<template>
  <article
    class="flex flex-col overflow-hidden rounded-card border border-section-alt-line bg-white text-forest"
  >
    <PitchStripes :stripe="40" class="flex h-[180px] items-end p-3.5">
      <span class="relative rounded-full bg-forest px-2.5 py-1.5 text-xs font-semibold text-chalk">
        {{ t('branch.photoPlaceholder') }}
      </span>
    </PitchStripes>

    <div class="flex flex-1 flex-col gap-2.5 p-5">
      <h3 class="m-0 text-xl font-bold">{{ branch.name }}</h3>
      <p class="m-0 text-sm text-card-muted">
        {{ branch.address }}, {{ branch.district }} ·
        {{ formatDistance(branch.distanceKm, locale) }}
      </p>
      <ul class="m-0 flex list-none flex-wrap gap-1.5 p-0">
        <li
          v-for="tag in tags"
          :key="tag"
          class="rounded-full bg-card-tag px-2.5 py-1 text-xs font-semibold text-card-tag-foreground"
        >
          {{ tag }}
        </li>
      </ul>
      <div class="mt-auto flex items-center justify-between gap-3 pt-1.5">
        <i18n-t keypath="branch.fromRate" tag="span" class="text-sm text-card-muted">
          <template #price>
            <strong class="text-lg text-forest">
              {{ formatPriceShort(getStartingRate(branch), locale) }}
            </strong>
          </template>
        </i18n-t>
        <AppButton as-child variant="solid" size="sm">
          <RouterLink :to="{ name: 'branch-booking', params: { branchId: branch.id } }">
            {{ t('branch.viewSchedule') }}
          </RouterLink>
        </AppButton>
      </div>
    </div>
  </article>
</template>
