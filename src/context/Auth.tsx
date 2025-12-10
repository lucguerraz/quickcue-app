import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

import { getUser, type GetUserSuccess } from '@/api/getUser'
import { createSession, type CreateSessionResponse, type CreateSessionSuccess } from '@/api/createSession'
import { updateSession, type UpdateSessionResponse, type UpdateSessionSuccess } from '@/api/updateSession'
import { deleteSession } from '@/api/deleteSession'

export interface User {
  uuid: string
  name: string
  email_address: string
  picture: string | null
}

export interface AuthState {
  isAuthenticated: () => boolean
  user: User | null
  logout: () => Promise<boolean>
  loginEmail: (email_address: string) => Promise<CreateSessionResponse>
  loginCode: (sessionUUID: string, code: string) => Promise<UpdateSessionResponse>
  updateUser: (name: string, email_address: string) => boolean
}

export const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [, setAuthState] = useState(false)
  const authRef = useRef(false)
  const isAuthenticated = () => authRef.current
  const setIsAuthenticated = (status: boolean) => {
    authRef.current = status
    setAuthState(status)
  }

  useEffect(() => {
    ;(async () => {
      const sessionUUID = localStorage.getItem('session-uuid')
      if (sessionUUID) {
        const api = await getUser()

        if (api.success) {
          setUser((api as GetUserSuccess).userData as User)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('session-uuid')
        }

        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  const loginEmail = async (email_address: string): Promise<CreateSessionResponse> => {
    const api = await createSession(email_address)

    if (api.success) {
      localStorage.setItem('session-uuid', (api as CreateSessionSuccess).sessionData.uuid)
    }

    return api
  }

  const loginCode = async (sessionUUID: string, code: string): Promise<UpdateSessionResponse> => {
    const api = await updateSession(sessionUUID, code)

    if (api.success) {
      setUser((api as UpdateSessionSuccess).userData as User)
      setIsAuthenticated(true)
    }

    return api
  }

  const logout = async (): Promise<boolean> => {
    const sessionUUID = localStorage.getItem('session-uuid')
    if (sessionUUID) {
      const api = await deleteSession(sessionUUID)

      if (api.success) {
        localStorage.removeItem('session-uuid')
        setUser(null)
        setIsAuthenticated(false)
        return true
      }
      return false
    } else {
      setUser(null)
      setIsAuthenticated(false)
      return false
    }
  }

  const updateUser = (name: string, email_address: string): boolean => {
    if (user === null) return false
    setUser({ uuid: user.uuid, name, email_address, picture: user.picture })
    return true
  }

  return (
    <AuthContext value={{ isAuthenticated, user, logout, loginEmail, loginCode, updateUser }}>{children}</AuthContext>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
