import { createContext } from 'react'
import { User, UserRegistration } from '../types/user'

interface AuthContextValue {
  user?: User
  isLoading: boolean
  message: string
  error: string
  updateUser: (user: User) => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (user: UserRegistration) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)
