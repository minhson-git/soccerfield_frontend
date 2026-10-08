import type { FieldType } from '@/features/field'

/** Mirrors `AvailabilitySlotResponse`: one bookable hour. */
export interface TimeSlot {
  /** HH:mm */
  startTime: string
  /** HH:mm */
  endTime: string
  available: boolean
  hourlyRate: number
}

export interface BookingExtra {
  id: number
  name: string
  price: number
}

export interface AvailabilityParams {
  branchId: number
  fieldType: FieldType
  /** yyyy-MM-dd */
  date: string
}

export interface HoldBookingRequest extends AvailabilityParams {
  /** HH:mm */
  startTime: string
  durationMinutes: number
  extraIds: number[]
}

export interface BookingHold {
  id: number
  /** ISO date-time: the deposit must be paid before this */
  holdExpiresAt: string
}

export type CheckoutStep = 'pick-slot' | 'slot-unavailable' | 'hold' | 'pay'
