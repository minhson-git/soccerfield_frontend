import { createSharedComposable, useColorMode } from '@vueuse/core'
import { computed } from 'vue'

/**
 * Light / dark theme via the `dark` class on <html>, persisted under the `theme` key
 * (index.html reads the same key before first paint). Defaults to the OS preference.
 */
export const useTheme = createSharedComposable(() => {
  const mode = useColorMode({
    storageKey: 'theme',
    initialValue: 'auto',
    disableTransition: true,
  })

  const isDark = computed(() => mode.state.value === 'dark')

  function toggle() {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  return { isDark, toggle }
})
