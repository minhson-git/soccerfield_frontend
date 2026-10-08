import { addDays, format, isValid, parseISO, startOfDay } from 'date-fns'

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

export function isTime(value: unknown): value is string {
  return typeof value === 'string' && TIME_PATTERN.test(value)
}

/** "19:30" → 1170 */
export function toMinutes(time: string): number {
  const [hours = 0, minutes = 0] = time.split(':').map(Number)
  return hours * 60 + minutes
}

/** 1170 → "19:30" */
export function fromMinutes(total: number): string {
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function addMinutesToTime(time: string, minutes: number): string {
  return fromMinutes(toMinutes(time) + minutes)
}

/** Today plus the next `count - 1` days, at midnight. */
export function getUpcomingDays(from: Date, count: number): Date[] {
  const start = startOfDay(from)
  return Array.from({ length: count }, (_, index) => addDays(start, index))
}

/** Date → "2026-10-08" (route query / API format). */
export function toDateParam(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function parseDateParam(value: string): Date | null {
  const date = parseISO(value)
  return isValid(date) ? date : null
}
