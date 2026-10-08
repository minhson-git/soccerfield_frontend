<script setup lang="ts">
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'

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
</script>

<!-- Unstyled on purpose: markup will be rebuilt once the UI library is chosen. -->
<template>
  <form novalidate @submit="onSubmit">
    <label>
      {{ t('auth.identifier') }}
      <input v-model="identifier" v-bind="identifierAttrs" autocomplete="username" />
    </label>
    <p v-if="errors.identifier">{{ t(errors.identifier) }}</p>

    <label>
      {{ t('auth.password') }}
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        autocomplete="current-password"
      />
    </label>
    <p v-if="errors.password">{{ t(errors.password) }}</p>

    <p v-if="isError" role="alert">{{ t('auth.loginFailed') }}</p>

    <button type="submit" :disabled="isPending">{{ t('auth.submit') }}</button>
  </form>
</template>
