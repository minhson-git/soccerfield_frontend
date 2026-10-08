<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  BranchSearchBar,
  filterBranches,
  useNearbyBranchesQuery,
  type BranchSearchFilters,
} from '@/features/branch'

import HomeHero from './HomeHero.vue'
import HowItWorksSection from './HowItWorksSection.vue'
import NearbyBranchesSection from './NearbyBranchesSection.vue'

const { data: branches, isPending } = useNearbyBranchesQuery()

const filters = ref<BranchSearchFilters | null>(null)
const districts = computed(() => [...new Set((branches.value ?? []).map((b) => b.district))])
const visibleBranches = computed(() => filterBranches(branches.value ?? [], filters.value))

function onSearch(next: BranchSearchFilters) {
  filters.value = next
  document.getElementById('san-gan-ban')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<!-- Responsive only (level 1): one markup for every screen size. -->
<template>
  <HomeHero>
    <div id="tim-san" class="mt-14 scroll-mt-6 desktop:mt-[72px]">
      <BranchSearchBar :districts="districts" @search="onSearch" />
    </div>
  </HomeHero>
  <NearbyBranchesSection :branches="visibleBranches" :loading="isPending" />
  <HowItWorksSection />
</template>
