import { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { QueryClient } from '@tanstack/react-query'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface JwtPayload {
  user_id: string
  email: string
  exp: number
}

interface AuthTokens {
  access: string
  refresh: string
}

interface AuthContextType {
  user: JwtPayload | null
  tokens: AuthTokens | null
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, password: string, name: string) => Promise<void>
  isAuthenticated: boolean
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
export const AuthContext = createContext<AuthContextType | null>(null)

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const queryClient = new QueryClient()

  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    const stored = localStorage.getItem('tokens')
    return stored ? JSON.parse(stored) : null
  })

  const [user, setUser] = useState<JwtPayload | null>(() => {
    const stored = localStorage.getItem('tokens')
    if (!stored) return null
    const { access } = JSON.parse(stored)
    return jwtDecode<JwtPayload>(access)
  })

  const logout = useCallback(() => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem('tokens')
    queryClient.clear()
    navigate('/login')
  }, [navigate, queryClient])

  const login = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/api/auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) throw new Error('Credenciais inválidas')

    const data: AuthTokens = await res.json()
    setTokens(data)
    setUser(jwtDecode<JwtPayload>(data.access))
    localStorage.setItem('tokens', JSON.stringify(data))
    navigate('/')
  }

  const signup = async (email: string, password: string, name: string) => {
    const res = await fetch(`${BASE_URL}/api/accounts/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    if (!res.ok) {
      const error = await res.json()
      const firstError = Object.values(error)[0] as string[]
      throw new Error(firstError[0])
    }

    await login(email, password)
  }

  useEffect(() => {
    if (!tokens) return

    const decoded = jwtDecode<JwtPayload>(tokens.access)
    const expiresIn = decoded.exp * 1000 - Date.now() - 60_000

    if (expiresIn <= 0) {
      logout()
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/token/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: tokens.refresh }),
        })

        if (!res.ok) throw new Error()

        const data: AuthTokens = await res.json()
        setTokens(data)
        setUser(jwtDecode<JwtPayload>(data.access))
        localStorage.setItem('tokens', JSON.stringify(data))
      } catch {
        logout()
      }
    }, expiresIn)

    return () => clearTimeout(timeout)
  }, [tokens, logout])

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        accessToken: tokens?.access ?? null,
        login,
        logout,
        signup,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}