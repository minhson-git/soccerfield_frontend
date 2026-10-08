<script setup lang="ts">
import AppLogo from '@/shared/components/brand/AppLogo.vue'
import LocaleSwitcher from '@/shared/components/LocaleSwitcher.vue'
import ThemeToggle from '@/shared/components/ThemeToggle.vue'
</script>

<!-- Login, register and error pages: no section navigation. -->
<template>
  <div class="flex min-h-dvh flex-col">
    <header
      class="flex items-center justify-between gap-4 px-4 py-3 desktop:px-6 desktop:py-[18px]"
    >
      <RouterLink :to="{ name: 'home' }" class="text-foreground no-underline">
        <AppLogo />
      </RouterLink>
      <div class="flex items-center gap-2.5">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
    <main class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-10">
      <slot />
    </main>
  </div>
</template>
