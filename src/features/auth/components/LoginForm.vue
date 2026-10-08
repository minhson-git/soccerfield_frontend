<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

import AppButton from '@/shared/components/ui/AppButton.vue'
import { toTypedSchema } from '@/shared/lib/form/to-typed-schema'

import { useLogin } from '../composables/useLogin'
import { loginSchema } from '../schemas/login.schema'

const { t } = useI18n()
const { mutate, isPending, isError } = useLogin()

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})
const [identifier, identifierAttrs] = defineField('identifier')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => mutate(values))

const labelClass = 'text-xs font-semibold tracking-[0.06em] text-muted uppercase'
const inputClass =
  'min-h-12 rounded-xl border border-line-strong bg-field px-3.5 text-base text-foreground aria-invalid:border-red-700'
</script>

<!-- Not in the design yet: styled with the shared tokens only. -->
<template>
  <form novalidate class="flex flex-col gap-4" @submit="onSubmit">
    <label class="flex flex-col gap-1.5">
      <span :class="labelClass">{{ t('auth.identifier') }}</span>
      <input
        v-model="identifier"
        v-bind="identifierAttrs"
        autocomplete="username"
        :aria-invalid="!!errors.identifier"
        :class="inputClass"
      />
      <span v-if="errors.identifier" class="text-sm text-red-700 dark:text-red-300">
        {{ t(errors.identifier) }}
      </span>
    </label>

    <label class="flex flex-col gap-1.5">
      <span :class="labelClass">{{ t('auth.password') }}</span>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        autocomplete="current-password"
        :aria-invalid="!!errors.password"
        :class="inputClass"
      />
      <span v-if="errors.password" class="text-sm text-red-700 dark:text-red-300">
        {{ t(errors.password) }}
      </span>
    </label>

    <p v-if="isError" role="alert" class="m-0 text-sm text-red-700 dark:text-red-300">
      {{ t('auth.loginFailed') }}
    </p>

    <AppButton type="submit" size="lg" :disabled="isPending">{{ t('auth.submit') }}</AppButton>
  </form>
</template>
