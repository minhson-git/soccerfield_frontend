import type { FieldSurface, FieldType } from '@/features/field'

export type Amenity = 'LIGHTING' | 'PARKING' | 'LOCKER_ROOM' | 'CANTEEN'

/** One field type a branch rents out, with its hourly rates. */
export interface BranchFieldOffer {
  fieldType: FieldType
  surface: FieldSurface
  dayRate: number
  peakRate: number
}

/**
 * A venue ("cụm sân"). `BranchResponse` on the backend has id, name, address, district, phone,
 * openingTime and closingTime; the other fields are not served yet (mock only).
 */
export interface Branch {
  id: number
  name: string
  address: string
  district: string
  phone: string
  /** HH:mm */
  openingTime: string
  /** HH:mm */
  closingTime: string
  distanceKm: number
  amenities: Amenity[]
  offers: BranchFieldOffer[]
}

export type TimeOfDay = 'MORNING' | 'AFTERNOON' | 'EVENING'

export interface BranchSearchFilters {
  /** '' = any district */
  district: string
  /** '' = any field type */
  fieldType: FieldType | ''
  /** yyyy-MM-dd, '' = any day */
  date: string
  timeOfDay: TimeOfDay
}
