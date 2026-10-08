import { QueryClient } from '@tanstack/vue-query'

import { ApiError } from '@/shared/api/types'

const MAX_RETRIES = 2

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      // 4xx won't succeed on retry
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.isClientError) && failureCount < MAX_RETRIES,
    },
  },
})
