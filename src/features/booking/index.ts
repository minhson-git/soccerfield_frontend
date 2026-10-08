// Public API of the booking feature. Outside this folder, import only from here.
export { DURATION_OPTIONS } from './booking.constants'
export type { BookingExtra, CheckoutStep, TimeSlot } from './booking.types'
export { useBranchBooking, useProvideBranchBooking } from './composables/useBranchBooking'

// Presentational (v-model driven)
export { default as DayPicker } from './components/DayPicker.vue'
export { default as DurationPicker } from './components/DurationPicker.vue'
export { default as ExtrasPicker } from './components/ExtrasPicker.vue'
export { default as FieldTypePicker } from './components/FieldTypePicker.vue'
export { default as SlotLegend } from './components/SlotLegend.vue'
export { default as TimeSlotGrid } from './components/TimeSlotGrid.vue'

// Connected to the booking page state (need useProvideBranchBooking above them)
export { default as BookingBottomBar } from './components/BookingBottomBar.vue'
export { default as BookingSheet } from './components/BookingSheet.vue'
export { default as BookingSummaryCard } from './components/BookingSummaryCard.vue'
