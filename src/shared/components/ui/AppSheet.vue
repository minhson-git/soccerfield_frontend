<script setup lang="ts">
import { X } from '@lucide/vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { useI18n } from 'vue-i18n'

import AppButton from './AppButton.vue'

/** Bottom sheet for mobile flows. Focus trap, Esc and scroll lock come from Reka UI's Dialog. */
defineProps<{ title: string; description?: string }>()
const open = defineModel<boolean>('open', { default: false })

const { t } = useI18n()
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-forest/60 motion-safe:animate-fade-in" />
      <DialogContent
        class="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-2xl flex-col rounded-t-panel bg-panel text-foreground shadow-2xl motion-safe:animate-sheet-up"
        v-bind="description ? {} : { 'aria-describedby': undefined }"
      >
        <header class="flex items-start justify-between gap-4 px-4 pt-5 pb-3">
          <div class="flex flex-col gap-1">
            <DialogTitle class="m-0 font-display text-[28px] leading-none font-extrabold uppercase">
              {{ title }}
            </DialogTitle>
            <DialogDescription v-if="description" class="m-0 text-sm text-muted">
              {{ description }}
            </DialogDescription>
          </div>
          <DialogClose as-child>
            <AppButton variant="outline" size="icon" :aria-label="t('common.close')">
              <X class="size-5" aria-hidden="true" />
            </AppButton>
          </DialogClose>
        </header>

        <div class="flex-1 overflow-y-auto px-4 pb-4">
          <slot />
        </div>

        <footer
          v-if="$slots.footer"
          class="border-t border-line px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        >
          <slot name="footer" />
        </footer>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
