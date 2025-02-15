import { ReactElement, useEffect, useState } from 'react'
import { User, UserRegistration } from '../types/user'
import { AuthContext } from '../context/AuthContext'
import { signInService, signUpService } from '../services/auth.service'
import { useLocation, useNavigate } from 'react-router'
import {
  getHomePathFromUserRole,
  getLocalSession,
  removeLocalSession,
  setLocalSession,
} from '../utils/auth.util'

interface AuthProviderProps {
  children: ReactElement
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(getLocalSession)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const signOut = () => {
    removeLocalSession()
    setUser(undefined)
    void navigate('/')
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    setError('')
    setMessage('')

    if (user) {
      setError('User has already sign in')
      setIsLoading(false)
      return
    }

    const userSignIn = await signInService(email, password)
    if (!userSignIn) {
      setError('Email or Password Incorrect')
      setIsLoading(false)
      return
    }

    setLocalSession(userSignIn)
    setUser(userSignIn)
    setMessage('Login successfully')
    setIsLoading(false)
    void navigate(getHomePathFromUserRole(userSignIn.role), { replace: true })
  }

  const signUp = async (user: UserRegistration) => {
    setIsLoading(true)
    setError('')
    setMessage('')

    const successfulSignUp = await signUpService(user)
    if (!successfulSignUp) {
      setError('User has already register')
      setIsLoading(false)
      return
    }

    setMessage('Register successfully')
    setIsLoading(false)
  }

  useEffect(() => {
    if (!user || location.pathname !== '/login') return
    void navigate(getHomePathFromUserRole(user.role), { replace: true })
  }, [user, location, navigate])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        message,
        error,
        updateUser: setUser,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
