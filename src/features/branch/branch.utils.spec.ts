import { describe, expect, it } from 'vitest'

import { MOCK_BRANCHES } from './api/branch.mock'
import type { BranchSearchFilters } from './branch.types'
import { filterBranches, getStartingRate } from './branch.utils'

const anyFilters: BranchSearchFilters = {
  district: '',
  fieldType: '',
  date: '',
  timeOfDay: 'EVENING',
}

describe('getStartingRate', () => {
  it('returns the cheapest day rate', () => {
    expect(getStartingRate(MOCK_BRANCHES[0]!)).toBe(250_000)
  })
})

describe('filterBranches', () => {
  it('keeps everything without filters', () => {
    expect(filterBranches(MOCK_BRANCHES, null)).toHaveLength(MOCK_BRANCHES.length)
    expect(filterBranches(MOCK_BRANCHES, anyFilters)).toHaveLength(MOCK_BRANCHES.length)
  })

  it('filters by field type', () => {
    const result = filterBranches(MOCK_BRANCHES, { ...anyFilters, fieldType: 'ELEVEN_A_SIDE' })
    expect(result.map((b) => b.id)).toEqual([1, 3])
  })

  it('filters by district', () => {
    const result = filterBranches(MOCK_BRANCHES, { ...anyFilters, district: 'Quận 3' })
    expect(result.map((b) => b.id)).toEqual([2])
  })
})
