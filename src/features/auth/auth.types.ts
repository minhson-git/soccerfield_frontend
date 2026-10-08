export const ROLES = ['CUSTOMER', 'OWNER', 'ADMIN'] as const
export type Role = (typeof ROLES)[number]

export interface LoginCredentials {
  identifier: string
  password: string
}

/** Mirrors `AuthenticationResponse` from the backend. */
export interface AuthSession {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  role: Role
  userId: number
}
