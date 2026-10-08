const MOCK_LATENCY_MS = 300

/**
 * Resolves a deep copy of `data` after a short delay, like a network call.
 * Used by feature `*.api.ts` files until the real endpoints are wired.
 */
export function mockResponse<T>(data: T, delayMs = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), delayMs)
  })
}
