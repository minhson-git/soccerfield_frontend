// TODO: switch to the Orval-generated clients once `pnpm api:generate` has run.
import { http } from '@/shared/api/http'
import { unwrapData, type ApiResponse } from '@/shared/api/types'

import type { AuthSession, LoginCredentials } from '../auth.types'

const AUTH_URL = '/api/v1/auth'

export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const { data } = await http.post<ApiResponse<AuthSession>>(`${AUTH_URL}/login`, credentials, {
    skipAuthRefresh: true,
  })
  return unwrapData(data)
}

export async function refresh(refreshToken: string): Promise<AuthSession> {
  const { data } = await http.post<ApiResponse<AuthSession>>(
    `${AUTH_URL}/refresh`,
    { refreshToken },
    { skipAuthRefresh: true },
  )
  return unwrapData(data)
}

export async function logout(refreshToken: string): Promise<void> {
  await http.post(`${AUTH_URL}/logout`, { refreshToken }, { skipAuthRefresh: true })
}
