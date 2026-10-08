const INTL_LOCALE: Record<string, string> = {
  vi: 'vi-VN',
  en: 'en-US',
}

function toIntlLocale(locale: string): string {
  return INTL_LOCALE[locale] ?? locale
}

export function formatCurrency(amount: number, locale: string): string {
  return new Intl.NumberFormat(toIntlLocale(locale), {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** 250000 → "250k", 1200000 → "1.200k" (vi) / "1,200k" (en). */
export function formatPriceShort(amount: number, locale: string): string {
  return `${new Intl.NumberFormat(toIntlLocale(locale)).format(Math.round(amount / 1000))}k`
}

/** 1.2 → "1,2 km" (vi) / "1.2 km" (en). */
export function formatDistance(km: number, locale: string): string {
  const value = new Intl.NumberFormat(toIntlLocale(locale), { maximumFractionDigits: 1 }).format(km)
  return `${value} km`
}

/** "9/10" (vi) / "10/9" (en). */
export function formatDayMonth(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(toIntlLocale(locale), { day: 'numeric', month: 'numeric' }).format(
    date,
  )
}

/** "thg 10" (vi) / "Oct" (en). */
export function formatMonthShort(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(toIntlLocale(locale), { month: 'short' }).format(date)
}
