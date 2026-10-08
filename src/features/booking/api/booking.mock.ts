import type { Branch } from '@/features/branch'
import { FIELD_TYPES } from '@/features/field'

import { PEAK_START_HOUR } from '../booking.constants'
import type { AvailabilityParams, BookingExtra, TimeSlot } from '../booking.types'
import { fromMinutes, toMinutes } from '../utils/booking-time'

export const MOCK_EXTRAS: BookingExtra[] = [
  { id: 1, name: 'Áo bib (2 màu)', price: 50_000 },
  { id: 2, name: 'Nước uống (1 thùng)', price: 120_000 },
  { id: 3, name: 'Trọng tài', price: 200_000 },
]

/**
 * Hourly slots from opening to closing time. Which ones are booked is deterministic
 * (derived from the date and field type) so the same day always looks the same.
 */
export function generateMockSlots(branch: Branch, params: AvailabilityParams): TimeSlot[] {
  const offer = branch.offers.find((item) => item.fieldType === params.fieldType)
  if (!offer) return []

  const typeIndex = FIELD_TYPES.indexOf(params.fieldType)
  const dayOfMonth = Number(params.date.slice(-2))
  const slots: TimeSlot[] = []

  for (
    let start = toMinutes(branch.openingTime);
    start < toMinutes(branch.closingTime);
    start += 60
  ) {
    const hour = start / 60
    const isPeak = hour >= PEAK_START_HOUR
    const booked =
      (hour * 7 + dayOfMonth * 3 + typeIndex * 5) % 4 === 0 ||
      (isPeak && (hour + dayOfMonth + typeIndex) % 3 === 0)

    slots.push({
      startTime: fromMinutes(start),
      endTime: fromMinutes(start + 60),
      available: !booked,
      hourlyRate: isPeak ? offer.peakRate : offer.dayRate,
    })
  }
  return slots
}
