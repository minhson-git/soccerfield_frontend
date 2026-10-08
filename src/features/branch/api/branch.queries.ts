import { useQuery } from '@tanstack/vue-query'
import { computed, toValue, type MaybeRefOrGetter } from 'vue'

import { fetchBranch, fetchNearbyBranches } from './branch.api'

export const branchKeys = {
  all: ['branches'] as const,
  nearby: () => [...branchKeys.all, 'nearby'] as const,
  detail: (id: number) => [...branchKeys.all, 'detail', id] as const,
}

export function useNearbyBranchesQuery() {
  return useQuery({
    queryKey: branchKeys.nearby(),
    queryFn: fetchNearbyBranches,
  })
}

export function useBranchQuery(id: MaybeRefOrGetter<number>) {
  return useQuery({
    queryKey: computed(() => branchKeys.detail(toValue(id))),
    queryFn: () => fetchBranch(toValue(id)),
    enabled: computed(() => Number.isInteger(toValue(id))),
  })
}
