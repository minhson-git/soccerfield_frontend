import axios, { AxiosError, type AxiosRequestConfig } from 'axios'

import { env } from '@/shared/config/env'
import { i18n } from '@/shared/i18n'

import { ApiError, type ApiResponse } from './types'

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Do not try to refresh the token on 401 (used by auth endpoints themselves). */
    skipAuthRefresh?: boolean
    /** Internal: request has already been retried after a token refresh. */
    _retried?: boolean
  }
}

/**
 * Auth is injected from the app layer so `shared` never depends on `features/auth`.
 */
export interface HttpAuthHandlers {
  getAccessToken: () => string | null
  /** Returns the new access token, or null when the session can't be refreshed. */
  refreshAccessToken: () => Promise<string | null>
  onAuthFailure: () => void
}

let authHandlers: HttpAuthHandlers | null = null
let pendingRefresh: Promise<string | null> | null = null

export function configureHttpAuth(handlers: HttpAuthHandlers): void {
  authHandlers = handlers
}

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

http.interceptors.request.use((config) => {
  const token = authHandlers?.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers['Accept-Language'] = i18n.global.locale.value
  return config
})

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const config = error.config

    if (error.response?.status === 401 && config && !config.skipAuthRefresh && !config._retried) {
      const newToken = await refreshOnce()
      if (newToken) {
        return http.request({ ...config, _retried: true })
      }
      authHandlers?.onAuthFailure()
    }

    throw toApiError(error)
  },
)

/** Concurrent 401s share a single refresh request. */
function refreshOnce(): Promise<string | null> {
  if (!authHandlers) return Promise.resolve(null)
  pendingRefresh ??= authHandlers.refreshAccessToken().finally(() => {
    pendingRefresh = null
  })
  return pendingRefresh
}

function toApiError(error: AxiosError<ApiResponse<unknown>>): ApiError {
  const status = error.response?.status ?? null
  const message = error.response?.data?.message ?? error.message
  return new ApiError(message, status)
}

/** Mutator used by Orval-generated clients. */
export function httpClient<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return http.request<T>({ ...config, ...options }).then(({ data }) => data)
}
