<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
import { useI18n } from 'vue-i18n'

import { useTheme } from '@/shared/theme/useTheme'

import AppButton from './ui/AppButton.vue'

withDefaults(defineProps<{ variant?: 'outline' | 'overlay' }>(), { variant: 'outline' })

const { t } = useI18n()
const { isDark, toggle } = useTheme()
</script>

<template>
  <AppButton
    :variant="variant"
    size="icon"
    :aria-label="isDark ? t('theme.toLight') : t('theme.toDark')"
    :title="isDark ? t('theme.toLight') : t('theme.toDark')"
    @click="toggle"
  >
    <Sun v-if="isDark" class="size-5" aria-hidden="true" />
    <Moon v-else class="size-5" aria-hidden="true" />
  </AppButton>
</template>
