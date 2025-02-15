import { useEffect, useReducer } from 'react'
import { RegisterActionType } from '../enums/auth.enum'
import { RegisterAction, RegisterForm } from '../types/auth'
import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePhoneNumber,
  validateRegisterForm,
} from '../utils/auth.util'
import { useAuth } from './useAuth'
import { UserRegistration } from '../types/user'
import { UserRole } from '../enums/user.enum'
import { useNavigate } from 'react-router'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'

function initializeRegisterForm(): RegisterForm {
  return {
    fields: {
      fullname: { text: '', error: '' },
      email: { text: '', error: '' },
      phoneNumber: { text: '', error: '' },
      password: { text: '', error: '' },
    },
    isValid: false,
  }
}

function registerReducer(
  state: RegisterForm,
  action: RegisterAction
): RegisterForm {
  switch (action.type) {
    case RegisterActionType.SET_FULLNAME: {
      const newState = structuredClone(state)
      newState.fields.fullname = validateFullname(action.payload.fullname)
      return newState
    }

    case RegisterActionType.SET_EMAIL: {
      const newState = structuredClone(state)
      newState.fields.email = validateEmail(action.payload.email)
      return newState
    }

    case RegisterActionType.SET_PHONE_NUMBER: {
      const newState = structuredClone(state)
      newState.fields.phoneNumber = validatePhoneNumber(
        action.payload.phoneNumber
      )
      return newState
    }

    case RegisterActionType.SET_PASSWORD: {
      const newState = structuredClone(state)
      newState.fields.password = validatePassword(action.payload.password)
      return newState
    }

    case RegisterActionType.SUBMIT: {
      const newState = validateRegisterForm(state)
      return newState
    }

    case RegisterActionType.RESET: {
      return initializeRegisterForm()
    }
  }
}

export function useRegister() {
  const [form, dispatch] = useReducer(
    registerReducer,
    null,
    initializeRegisterForm
  )
  const { message, isLoading, error, signUp } = useAuth()
  const navigate = useNavigate()

  const setFullname = (fullname: string) => {
    dispatch({
      type: RegisterActionType.SET_FULLNAME,
      payload: { fullname: fullname },
    })
  }

  const setEmail = (email: string) => {
    dispatch({
      type: RegisterActionType.SET_EMAIL,
      payload: { email: email },
    })
  }

  const setPhoneNumber = (phoneNumber: string) => {
    dispatch({
      type: RegisterActionType.SET_PHONE_NUMBER,
      payload: { phoneNumber: phoneNumber },
    })
  }

  const setPassword = (password: string) => {
    dispatch({
      type: RegisterActionType.SET_PASSWORD,
      payload: { password: password },
    })
  }

  const submit = () => {
    dispatch({ type: RegisterActionType.SUBMIT })
  }

  const reset = () => {
    dispatch({ type: RegisterActionType.RESET })
  }

  useEffect(() => {
    if (!form.isValid || isLoading) return

    const userToRegister: UserRegistration = {
      email: form.fields.email.text,
      fullname: form.fields.fullname.text,
      password: form.fields.password.text,
      phoneNumber: form.fields.phoneNumber.text,
      role: UserRole.CLIENT,
    }

    void signUp(userToRegister).then(() => reset())
  }, [form, isLoading, signUp])

  useEffect(() => {
    if (!message) return
    setTimeout(() => {
      void navigate(ROUTES_PATH.login.absolute, { replace: true })
    }, 2000)
  }, [message, navigate])

  return {
    form,
    isLoading,
    message,
    error,
    setFullname,
    setEmail,
    setPhoneNumber,
    setPassword,
    submit,
    reset,
  }
}
