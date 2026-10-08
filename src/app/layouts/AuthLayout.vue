<script setup lang="ts">
import LocaleSwitcher from '@/shared/components/LocaleSwitcher.vue'
</script>

<!-- Login, register and error pages: no navigation. -->
<template>
  <main>
    <LocaleSwitcher />
    <slot />
  </main>
</template>
