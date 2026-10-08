<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { cn } from '@/shared/lib/cn'

import { appButtonVariants, type AppButtonVariants } from './app-button.variants'

interface Props extends PrimitiveProps {
  variant?: AppButtonVariants['variant']
  size?: AppButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), { as: 'button' })
</script>

<!-- Links: <AppButton as-child><RouterLink :to="...">...</RouterLink></AppButton> -->
<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :type="props.as === 'button' && !props.asChild ? 'button' : undefined"
    :class="cn(appButtonVariants({ variant: props.variant, size: props.size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
