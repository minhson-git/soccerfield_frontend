<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useDevice } from '@/shared/composables/useDevice'

import UserFooter from './UserFooter.vue'
import UserHeader from './UserHeader.vue'

const route = useRoute()
const { isMobile } = useDevice()

const immersive = computed(() => isMobile.value && route.meta.immersiveOnMobile === true)
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <UserHeader v-if="!immersive" />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <UserFooter v-if="!immersive" />
  </div>
</template>
