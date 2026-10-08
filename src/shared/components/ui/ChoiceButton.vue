<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/shared/lib/cn'

/** Toggle-style option (field type, day, duration...). Shape and size come from `class`. */
const props = withDefaults(
  defineProps<{
    pressed: boolean
    /** Unpressed fill: `surface` inside white panels, `panel` directly on the page background */
    tone?: 'surface' | 'panel'
    class?: HTMLAttributes['class']
  }>(),
  { tone: 'surface' },
)
</script>

<template>
  <button
    type="button"
    :aria-pressed="props.pressed"
    :class="
      cn(
        'border transition-colors',
        props.pressed
          ? 'border-selected bg-selected text-selected-foreground'
          : [
              'border-line-strong text-foreground hover:border-ink',
              props.tone === 'panel' ? 'bg-panel' : 'bg-surface',
            ],
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>
