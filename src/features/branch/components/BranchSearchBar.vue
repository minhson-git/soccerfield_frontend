<script setup lang="ts">
import { Search } from '@lucide/vue'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { FIELD_TYPES } from '@/features/field'
import AppButton from '@/shared/components/ui/AppButton.vue'

import type { BranchSearchFilters, TimeOfDay } from '../branch.types'

defineProps<{ districts: string[] }>()
const emit = defineEmits<{ search: [filters: BranchSearchFilters] }>()

const { t } = useI18n()

const TIMES_OF_DAY: TimeOfDay[] = ['EVENING', 'MORNING', 'AFTERNOON']

const filters = reactive<BranchSearchFilters>({
  district: '',
  fieldType: '',
  date: '',
  timeOfDay: 'EVENING',
})

const fieldClass = 'flex flex-col gap-1 rounded-xl bg-field px-3.5 py-2.5'
const labelClass = 'text-xs font-semibold tracking-[0.06em] text-muted uppercase'
const controlClass =
  'min-h-8 w-full border-0 bg-transparent py-1 text-base font-semibold text-foreground outline-none'
</script>

<template>
  <form
    class="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2 rounded-card border border-line-strong bg-surface p-3"
    @submit.prevent="emit('search', { ...filters })"
  >
    <label :class="fieldClass">
      <span :class="labelClass">{{ t('search.area') }}</span>
      <select v-model="filters.district" :class="controlClass">
        <option value="">{{ t('search.anyArea') }}</option>
        <option v-for="district in districts" :key="district" :value="district">
          {{ district }}
        </option>
      </select>
    </label>

    <label :class="fieldClass">
      <span :class="labelClass">{{ t('search.fieldType') }}</span>
      <select v-model="filters.fieldType" :class="controlClass">
        <option value="">{{ t('search.anyType') }}</option>
        <option v-for="type in FIELD_TYPES" :key="type" :value="type">
          {{ t(`field.typePlayers.${type}`) }}
        </option>
      </select>
    </label>

    <label :class="fieldClass">
      <span :class="labelClass">{{ t('search.date') }}</span>
      <input v-model="filters.date" type="date" :class="controlClass" />
    </label>

    <label :class="fieldClass">
      <span :class="labelClass">{{ t('search.timeOfDay') }}</span>
      <select v-model="filters.timeOfDay" :class="controlClass">
        <option v-for="time in TIMES_OF_DAY" :key="time" :value="time">
          {{ t(`search.timesOfDay.${time}`) }}
        </option>
      </select>
    </label>

    <AppButton type="submit" size="lg" class="min-h-16 rounded-xl">
      <Search class="size-5" :stroke-width="2.4" aria-hidden="true" />
      {{ t('search.submit') }}
    </AppButton>
  </form>
</template>
