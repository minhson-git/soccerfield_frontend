<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'

import { cn } from '@/shared/lib/cn'

/** Mown-grass stripes, used as the placeholder for venue photos. */
const props = withDefaults(
  defineProps<{
    /** Stripe width in px */
    stripe?: number
    /** Chalk lines drawn on top */
    lines?: 'none' | 'center' | 'full'
    class?: HTMLAttributes['class']
  }>(),
  { stripe: 48, lines: 'none' },
)

const background = computed(() => ({
  backgroundImage: `repeating-linear-gradient(90deg, var(--color-pitch-1) 0 ${props.stripe}px, var(--color-pitch-2) ${props.stripe}px ${props.stripe * 2}px)`,
}))
</script>

<template>
  <div :class="cn('relative overflow-hidden', props.class)" :style="background">
    <svg
      v-if="lines !== 'none'"
      viewBox="0 0 400 240"
      preserveAspectRatio="none"
      class="pointer-events-none absolute inset-0 size-full [&_*]:[vector-effect:non-scaling-stroke]"
      aria-hidden="true"
    >
      <g fill="none" stroke="#ffffff" stroke-opacity="0.4" stroke-width="2">
        <rect v-if="lines === 'full'" x="16" y="16" width="368" height="208" />
        <line
          x1="200"
          :y1="lines === 'full' ? 16 : 0"
          x2="200"
          :y2="lines === 'full' ? 224 : 240"
        />
        <circle cx="200" cy="120" r="40" />
      </g>
    </svg>
    <slot />
  </div>
</template>
