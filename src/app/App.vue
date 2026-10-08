<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { layouts } from './layouts'

const route = useRoute()
const layout = computed(() => layouts[route.meta.layout ?? 'user'])
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
