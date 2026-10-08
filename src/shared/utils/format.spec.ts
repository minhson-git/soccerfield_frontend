import { describe, expect, it } from 'vitest'

import { formatCurrency } from './format'

describe('formatCurrency', () => {
  it('formats VND without decimals', () => {
    expect(formatCurrency(350000, 'vi')).toMatch(/^350\.000\s₫$/)
  })

  it('uses the English number format for en', () => {
    expect(formatCurrency(350000, 'en')).toBe('₫350,000')
  })
})
