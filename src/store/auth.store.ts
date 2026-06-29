import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'student'|'instructor'|'admin'|'super_admin'

export interface AuthUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  profilePicture?: string
}

interface AuthState {
  user: AuthUser|null
  accessToken: string|null
  refreshToken: string|null
  isAuthenticated: boolean
  setAuth: (u: AuthUser, at: string, rt: string) => void
  updateUser: (u: Partial<AuthUser>) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null, accessToken: null, refreshToken: null, isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) => set({ user, accessToken, refreshToken, isAuthenticated: true }),
      updateUser: (updates) => set(s => ({ user: s.user ? { ...s.user, ...updates } : null })),
      clearAuth: () => set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
    }),
    { name: 'mv-auth', partialize: s => ({ user:s.user, accessToken:s.accessToken, refreshToken:s.refreshToken, isAuthenticated:s.isAuthenticated }) }
  )
)
