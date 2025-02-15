import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export function useAuth() {
  const authContext = useContext(AuthContext)

  if (!authContext)
    throw new Error('Auth context must be used width AuthProvider')

  const { user, message, error, isLoading, signIn, signUp, signOut } =
    authContext

  return {
    user,
    message,
    error,
    isLoading,
    signIn,
    signUp,
    signOut,
  }
}
