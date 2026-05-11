export interface User {
  id: string
  email: string
  password?: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  city?: string
  country?: string
  zipCode?: string
  createdAt: Date
  role: 'customer' | 'admin'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData extends LoginCredentials {
  firstName: string
  lastName: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (data: SignupData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}
