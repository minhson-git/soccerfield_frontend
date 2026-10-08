import { describe, expect, it } from 'vitest'

import type { TimeSlot } from '../booking.types'
import { calculateExtrasPrice, calculateFieldPrice, getCoveredSlots } from './booking-pricing'

function slot(startHour: number, hourlyRate: number, available = true): TimeSlot {
  const pad = (hour: number) => `${String(hour).padStart(2, '0')}:00`
  return { startTime: pad(startHour), endTime: pad(startHour + 1), available, hourlyRate }
}

const slots: TimeSlot[] = [
  slot(15, 400_000),
  slot(16, 400_000),
  slot(17, 650_000),
  slot(18, 650_000, false),
  slot(19, 650_000),
  slot(20, 650_000),
]

describe('calculateFieldPrice', () => {
  it('charges the hourly rate pro rata', () => {
    expect(calculateFieldPrice(slots, '19:00', 90)).toBe(975_000)
  })

  it('splits a booking across off-peak and peak slots', () => {
    // 16:00–17:00 at 400k + 17:00–17:30 at 650k
    expect(calculateFieldPrice(slots, '16:00', 90)).toBe(725_000)
  })

  it('returns null when part of the range is already booked', () => {
    expect(calculateFieldPrice(slots, '17:00', 120)).toBeNull()
  })

  it('returns null when the booking runs past closing time', () => {
    expect(calculateFieldPrice(slots, '20:00', 90)).toBeNull()
  })
})

describe('getCoveredSlots', () => {
  it('returns every slot the booking touches', () => {
    expect(getCoveredSlots(slots, '15:00', 120)?.map((s) => s.startTime)).toEqual([
      '15:00',
      '16:00',
    ])
  })

  it('returns null for a start time before opening', () => {
    expect(getCoveredSlots(slots, '14:00', 60)).toBeNull()
  })
})

describe('calculateExtrasPrice', () => {
  const extras = [
    { id: 1, name: 'Bib', price: 50_000 },
    { id: 2, name: 'Water', price: 120_000 },
  ]

  it('sums only the selected extras', () => {
    expect(calculateExtrasPrice(extras, [2])).toBe(120_000)
    expect(calculateExtrasPrice(extras, [])).toBe(0)
  })
})
