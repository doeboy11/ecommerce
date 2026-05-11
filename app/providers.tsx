'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, LoginCredentials, SignupData, AuthContextType } from '@/types/auth'
import { mockUsers } from '@/lib/mock-data'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (err) {
        console.log('[v0] Failed to parse stored user')
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const foundUser = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      )

      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      // Store user without password
      const userToStore = { ...foundUser }
      delete (userToStore as any).password
      setUser(userToStore)
      localStorage.setItem('user', JSON.stringify(userToStore))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (data: SignupData) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const existingUser = mockUsers.find(u => u.email === data.email)
      if (existingUser) {
        throw new Error('Email already in use')
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: new Date(),
        role: 'customer',
      }

      mockUsers.push({ ...newUser, password: data.password })
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      if (!user) throw new Error('No user logged in')

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))

      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))

      // Update in mockUsers
      const index = mockUsers.findIndex(u => u.id === user.id)
      if (index !== -1) {
        mockUsers[index] = { ...mockUsers[index], ...data }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
