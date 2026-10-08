import type { BookingExtra, TimeSlot } from '../booking.types'
import { toMinutes } from './booking-time'

/**
 * Slots covered by a booking of `durationMinutes` starting at `startTime`,
 * or null when any part of it is booked or falls outside opening hours.
 */
export function getCoveredSlots(
  slots: TimeSlot[],
  startTime: string,
  durationMinutes: number,
): TimeSlot[] | null {
  const start = toMinutes(startTime)
  const end = start + durationMinutes
  const covered = slots.filter(
    (slot) => toMinutes(slot.startTime) < end && toMinutes(slot.endTime) > start,
  )

  const coversWholeRange =
    covered.length > 0 &&
    toMinutes(covered[0]!.startTime) <= start &&
    toMinutes(covered[covered.length - 1]!.endTime) >= end
  if (!coversWholeRange || covered.some((slot) => !slot.available)) {
    return null
  }
  return covered
}

/**
 * Field price for the booking, charging each covered slot at its own rate for the minutes used
 * (16:30 → 18:00 bills 30 min off-peak + 60 min peak). Null when the range can't be booked.
 */
export function calculateFieldPrice(
  slots: TimeSlot[],
  startTime: string,
  durationMinutes: number,
): number | null {
  const covered = getCoveredSlots(slots, startTime, durationMinutes)
  if (!covered) return null

  const start = toMinutes(startTime)
  const end = start + durationMinutes
  const total = covered.reduce((sum, slot) => {
    const minutes =
      Math.min(end, toMinutes(slot.endTime)) - Math.max(start, toMinutes(slot.startTime))
    return sum + (slot.hourlyRate * minutes) / 60
  }, 0)
  return Math.round(total)
}

export function calculateExtrasPrice(extras: BookingExtra[], selectedIds: number[]): number {
  return extras
    .filter((extra) => selectedIds.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0)
}
