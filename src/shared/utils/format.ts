const INTL_LOCALE: Record<string, string> = {
  vi: 'vi-VN',
  en: 'en-US',
}

export function formatCurrency(amount: number, locale: string): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale] ?? locale, {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)
}
