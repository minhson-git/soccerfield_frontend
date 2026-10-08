import { createSharedComposable, useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'

import { DESKTOP_MIN_WIDTH } from '@/shared/constants/breakpoints'

/**
 * Picks between `*.mobile.vue` and `*.desktop.vue` variants.
 * Phones (portrait and landscape) and portrait tablets get mobile; landscape tablets and up get desktop.
 * For layout tweaks that don't need different markup, prefer Tailwind's `desktop:` variant.
 */
export const useDevice = createSharedComposable(() => {
  const breakpoints = useBreakpoints({ desktop: DESKTOP_MIN_WIDTH })
  const isDesktop = breakpoints.greaterOrEqual('desktop')

  return {
    isDesktop,
    isMobile: computed(() => !isDesktop.value),
  }
})
