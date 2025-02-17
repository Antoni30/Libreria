import { createContext } from 'react'
import { UserSignIn, UserSignUp } from '../types/auth'

interface AuthContextValue {
  user?: UserSignIn
  isLoading: boolean
  message: string
  error: string
  updateUser: (user: UserSignIn) => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (user: UserSignUp) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)
