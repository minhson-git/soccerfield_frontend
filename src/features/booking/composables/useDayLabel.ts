import { isToday } from 'date-fns'
import { useI18n } from 'vue-i18n'

import { formatDayMonth, formatMonthShort } from '@/shared/utils/format'

export function useDayLabel() {
  const { t, locale } = useI18n()

  /** "Hôm nay" (or "Nay" when `short`), otherwise "T2", "CN"... */
  function weekday(date: Date, options: { short?: boolean } = {}): string {
    if (isToday(date)) return options.short ? t('booking.todayShort') : t('booking.today')
    return t(`date.weekdayShort.${date.getDay()}`)
  }

  return {
    weekday,
    dayMonth: (date: Date) => formatDayMonth(date, locale.value),
    month: (date: Date) => formatMonthShort(date, locale.value),
  }
}
