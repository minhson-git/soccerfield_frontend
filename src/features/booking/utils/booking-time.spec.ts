import { describe, expect, it } from 'vitest'

import {
  addMinutesToTime,
  getUpcomingDays,
  isTime,
  parseDateParam,
  toDateParam,
} from './booking-time'

describe('booking-time', () => {
  it('validates HH:mm', () => {
    expect(isTime('19:00')).toBe(true)
    expect(isTime('24:00')).toBe(false)
    expect(isTime('9:00')).toBe(false)
  })

  it('adds minutes to a time', () => {
    expect(addMinutesToTime('19:00', 90)).toBe('20:30')
  })

  it('lists upcoming days from midnight', () => {
    const days = getUpcomingDays(new Date(2026, 9, 31, 15, 30), 3)
    expect(days.map(toDateParam)).toEqual(['2026-10-31', '2026-11-01', '2026-11-02'])
  })

  it('parses only valid date params', () => {
    expect(parseDateParam('2026-10-08')).toEqual(new Date(2026, 9, 8))
    expect(parseDateParam('not-a-date')).toBeNull()
  })
})
