// MOCK: swap the bodies for http calls (or Orval clients) once the backend serves these fields.
import { mockResponse } from '@/shared/api/mock'
import { ApiError } from '@/shared/api/types'

import type { Branch } from '../branch.types'
import { MOCK_BRANCHES } from './branch.mock'

export function fetchNearbyBranches(): Promise<Branch[]> {
  return mockResponse(MOCK_BRANCHES)
}

export async function fetchBranch(id: number): Promise<Branch> {
  const branch = MOCK_BRANCHES.find((item) => item.id === id)
  if (!branch) {
    throw new ApiError('Branch not found', 404)
  }
  return mockResponse(branch)
}
