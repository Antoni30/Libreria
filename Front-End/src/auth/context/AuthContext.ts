import { createContext } from 'react'
import { User } from '../../users/types/user'
import { UserSignUp } from '../types/auth'

interface AuthContextValue {
  user?: User
  isLoading: boolean
  message: string
  error: string
  updateUser: (user: User) => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (user: UserSignUp) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)
