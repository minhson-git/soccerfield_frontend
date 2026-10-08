<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppChip from '@/shared/components/ui/AppChip.vue'

import type { Amenity } from '../branch.types'

defineProps<{ amenities: Amenity[] }>()

const { t } = useI18n()
</script>

<template>
  <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
    <li v-for="amenity in amenities" :key="amenity">
      <AppChip>{{ t(`amenity.${amenity}`) }}</AppChip>
    </li>
  </ul>
</template>
