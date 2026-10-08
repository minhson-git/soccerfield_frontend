<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/shared/lib/cn'

/** Small uppercase label above a group ("1 · Loại sân", "Chọn ngày"). */
const props = withDefaults(defineProps<{ as?: string; class?: HTMLAttributes['class'] }>(), {
  as: 'span',
})
</script>

<template>
  <component
    :is="props.as"
    :class="
      cn(
        'text-xs font-semibold tracking-[0.06em] text-muted uppercase desktop:text-[13px]',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>
