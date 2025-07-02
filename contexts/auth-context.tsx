"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  fullName: string
  email: string
  phone?: string
  avatar?: string
  isVerified: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
}

interface RegisterData {
  fullName: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          // Simulate API call to verify token and get user data
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock user data
          const mockUser: User = {
            id: "1",
            fullName: "John Doe",
            email: "john@example.com",
            phone: "08123456789",
            avatar: "/placeholder.svg?height=100&width=100",
            isVerified: true,
            createdAt: "2024-01-01T00:00:00Z",
          }
          setUser(mockUser)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful login
      const mockUser: User = {
        id: "1",
        fullName: "John Doe",
        email: email,
        phone: "08123456789",
        avatar: "/placeholder.svg?height=100&width=100",
        isVerified: true,
        createdAt: "2024-01-01T00:00:00Z",
      }

      localStorage.setItem("auth_token", "mock_token_123")
      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful registration
      const newUser: User = {
        id: "1",
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        avatar: "/placeholder.svg?height=100&width=100",
        isVerified: false,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("auth_token", "mock_token_123")
      setUser(newUser)
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setUser({ ...user, ...userData })
    } catch (error) {
      throw new Error("Profile update failed")
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
