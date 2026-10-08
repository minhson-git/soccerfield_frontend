import type { Branch, BranchSearchFilters } from './branch.types'

/** Lowest day rate across the branch's field types ("Từ 250k/giờ"). */
export function getStartingRate(branch: Branch): number {
  return Math.min(...branch.offers.map((offer) => offer.dayRate))
}

/**
 * Client-side filter for the mock list (district + field type).
 * TODO: date / time of day need real availability: move filtering to the API.
 */
export function filterBranches(branches: Branch[], filters: BranchSearchFilters | null): Branch[] {
  if (!filters) return branches
  return branches.filter(
    (branch) =>
      (!filters.district || branch.district === filters.district) &&
      (!filters.fieldType || branch.offers.some((offer) => offer.fieldType === filters.fieldType)),
  )
}
