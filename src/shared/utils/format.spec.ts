import { describe, expect, it } from 'vitest'

import { formatCurrency, formatDistance, formatPriceShort } from './format'

describe('formatCurrency', () => {
  it('formats VND without decimals', () => {
    expect(formatCurrency(350000, 'vi')).toMatch(/^350\.000\s₫$/)
  })

  it('uses the English number format for en', () => {
    expect(formatCurrency(350000, 'en')).toBe('₫350,000')
  })
})

describe('formatPriceShort', () => {
  it('shows thousands with a k suffix', () => {
    expect(formatPriceShort(250000, 'vi')).toBe('250k')
    expect(formatPriceShort(1200000, 'vi')).toBe('1.200k')
    expect(formatPriceShort(1200000, 'en')).toBe('1,200k')
  })
})

describe('formatDistance', () => {
  it('uses the locale decimal separator', () => {
    expect(formatDistance(1.2, 'vi')).toBe('1,2 km')
    expect(formatDistance(1.2, 'en')).toBe('1.2 km')
  })
})
