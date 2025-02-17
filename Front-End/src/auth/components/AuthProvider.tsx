import { ReactElement, useEffect, useState } from 'react'
import { UserSignIn, UserSignUp } from '../types/auth'
import { AuthContext } from '../context/AuthContext'
import { signInService, signUpService } from '../services/auth.service'
import { useLocation, useNavigate } from 'react-router'
import {
  getLocalSession,
  removeLocalSession,
  setLocalSession,
} from '../utils/auth.util'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'

interface AuthProviderProps {
  children: ReactElement
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserSignIn | undefined>(getLocalSession)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const signOut = () => {
    removeLocalSession()
    setUser(undefined)
    void navigate('/', { replace: true })
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
    void navigate(ROUTES_PATH.dashboard.absolute, { replace: true })
  }

  const signUp = async (user: UserSignUp) => {
    setIsLoading(true)
    setError('')
    setMessage('')

    const successfulSignUp = await signUpService(user)
    if (!successfulSignUp) {
      setError('User has already register')
    } else {
      setMessage('Register successfully')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if (!user || location.pathname !== ROUTES_PATH.login.absolute) return
    void navigate(ROUTES_PATH.dashboard.absolute, { replace: true })
  }, [user, location, navigate])

  useEffect(() => {
    if (!message && !error) return

    setTimeout(() => {
      setMessage('')
      setError('')
    }, 2500)
  }, [message, error])

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
