/** Mirrors the backend `FieldType` enum. */
export const FIELD_TYPES = ['FIVE_A_SIDE', 'SEVEN_A_SIDE', 'ELEVEN_A_SIDE'] as const
export type FieldType = (typeof FIELD_TYPES)[number]

export const FIELD_TYPE_PLAYERS: Record<FieldType, number> = {
  FIVE_A_SIDE: 5,
  SEVEN_A_SIDE: 7,
  ELEVEN_A_SIDE: 11,
}

export type FieldSurface = 'ARTIFICIAL' | 'NATURAL'

export function isFieldType(value: unknown): value is FieldType {
  return FIELD_TYPES.includes(value as FieldType)
}
