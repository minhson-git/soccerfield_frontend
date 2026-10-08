import { createI18n } from 'vue-i18n'

import { storage } from '@/shared/utils/storage'

import en from './locales/en.json'
import vi from './locales/vi.json'

export const SUPPORTED_LOCALES = ['vi', 'en'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

const DEFAULT_LOCALE: AppLocale = 'vi'
const STORAGE_KEY = 'locale'

type MessageSchema = typeof vi

declare module 'vue-i18n' {
  // Makes `t('...')` keys type-checked against vi.json
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends MessageSchema {}
}

function isSupportedLocale(value: string | null): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale)
}

function getInitialLocale(): AppLocale {
  const saved = storage.get(STORAGE_KEY)
  return isSupportedLocale(saved) ? saved : DEFAULT_LOCALE
}

export const i18n = createI18n<[MessageSchema], AppLocale, false>({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { vi, en },
})

export function setLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale
  storage.set(STORAGE_KEY, locale)
  document.documentElement.lang = locale
}
