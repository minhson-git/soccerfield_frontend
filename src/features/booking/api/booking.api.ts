// MOCK: swap the bodies for the real endpoints
// (GET /fields/{id}/availability, POST /bookings) when wiring the API.
import { fetchBranch } from '@/features/branch'
import { mockResponse } from '@/shared/api/mock'

import { HOLD_MINUTES } from '../booking.constants'
import type {
  AvailabilityParams,
  BookingExtra,
  BookingHold,
  HoldBookingRequest,
  TimeSlot,
} from '../booking.types'
import { generateMockSlots, MOCK_EXTRAS } from './booking.mock'

export async function fetchAvailability(params: AvailabilityParams): Promise<TimeSlot[]> {
  const branch = await fetchBranch(params.branchId)
  return mockResponse(generateMockSlots(branch, params), 0)
}

export function fetchExtras(_branchId: number): Promise<BookingExtra[]> {
  return mockResponse(MOCK_EXTRAS)
}

let nextHoldId = 1000

export function holdBooking(_request: HoldBookingRequest): Promise<BookingHold> {
  return mockResponse({
    id: nextHoldId++,
    holdExpiresAt: new Date(Date.now() + HOLD_MINUTES * 60_000).toISOString(),
  })
}
