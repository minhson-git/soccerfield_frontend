/** Envelope every backend endpoint responds with (`ApiResponse<T>` in Spring). */
export interface ApiResponse<T> {
  message: string
  statusCode: number
  timestamp: string
  path?: string
  data?: T
}

/** Normalized error thrown by the http client for any failed request. */
export class ApiError extends Error {
  constructor(
    message: string,
    /** HTTP status, or null for network errors / timeouts */
    readonly status: number | null,
  ) {
    super(message)
    this.name = 'ApiError'
  }

  get isClientError(): boolean {
    return this.status !== null && this.status >= 400 && this.status < 500
  }
}

export function unwrapData<T>(response: ApiResponse<T>): T {
  if (response.data === undefined) {
    throw new ApiError('Response has no data', response.statusCode)
  }
  return response.data
}
