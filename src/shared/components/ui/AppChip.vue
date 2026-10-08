<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/shared/lib/cn'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center rounded-full bg-chip px-3 py-1.5 text-[13px] font-semibold',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
