<script setup lang="ts">
defineProps<{ label: string }>()

const STRIPES = [0, 120, 240, 360, 480]
</script>

<!-- Top-down pitch with the accent dot marking a free slot (home hero). -->
<template>
  <svg
    viewBox="0 0 600 400"
    class="block h-auto w-full rounded-card"
    role="img"
    :aria-label="label"
  >
    <rect width="600" height="400" fill="var(--color-pitch-1)" />
    <rect
      v-for="x in STRIPES"
      :key="x"
      :x="x"
      width="60"
      height="400"
      fill="var(--color-pitch-2)"
    />
    <g fill="none" stroke="var(--color-pitch-line)" stroke-opacity="0.6" stroke-width="2.5">
      <rect x="30" y="30" width="540" height="340" />
      <line x1="300" y1="30" x2="300" y2="370" />
      <circle cx="300" cy="200" r="52" />
      <rect x="30" y="115" width="80" height="170" />
      <rect x="30" y="160" width="30" height="80" />
      <rect x="490" y="115" width="80" height="170" />
      <rect x="540" y="160" width="30" height="80" />
    </g>
    <circle cx="300" cy="200" r="4" fill="var(--color-pitch-line)" fill-opacity="0.75" />
    <circle cx="408" cy="132" r="9" fill="var(--color-accent)" />
    <circle
      cx="408"
      cy="132"
      r="20"
      fill="none"
      stroke="var(--color-accent)"
      stroke-opacity="0.5"
      stroke-width="2"
    />
  </svg>
</template>
