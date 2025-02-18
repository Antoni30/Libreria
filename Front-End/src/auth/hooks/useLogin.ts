import { useEffect, useReducer } from 'react'
import { LoginAction, LoginForm } from '../types/auth'
import { LoginActionType } from '../enums/auth.enum'
import { validateLoginForm, validatePassword } from '../utils/auth.util'
import { validateEmail } from '../../shared/utils/validations.util'
import { useAuth } from './useAuth'

function initializeLoginForm(): LoginForm {
  return {
    fields: {
      email: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
    },
    isValid: false,
  }
}

function loginReducer(state: LoginForm, action: LoginAction): LoginForm {
  switch (action.type) {
    case LoginActionType.SET_EMAIL: {
      const newState = structuredClone(state)
      newState.fields.email = validateEmail(action.payload.email)
      return newState
    }

    case LoginActionType.SET_PASSWORD: {
      const newState = structuredClone(state)
      newState.fields.password = validatePassword(action.payload.password)
      return newState
    }

    case LoginActionType.SUBMIT: {
      const newState = validateLoginForm(state)
      return newState
    }

    case LoginActionType.RESET: {
      return initializeLoginForm()
    }
  }
}

export function useLogin() {
  const [form, dispatch] = useReducer(loginReducer, null, initializeLoginForm)
  const { isLoading, error, signIn } = useAuth()

  const setEmail = (email: string) => {
    dispatch({
      type: LoginActionType.SET_EMAIL,
      payload: { email: email },
    })
  }

  const setPassword = (password: string) => {
    dispatch({
      type: LoginActionType.SET_PASSWORD,
      payload: { password: password },
    })
  }

  const submit = () => {
    dispatch({ type: LoginActionType.SUBMIT })
  }

  const reset = () => {
    dispatch({ type: LoginActionType.RESET })
  }

  useEffect(() => {
    if (!form.isValid || isLoading) return
    const email = form.fields.email.value
    const password = form.fields.password.value
    void signIn(email, password).then(() => reset())
  }, [form, isLoading, signIn])

  return {
    form,
    isLoading,
    error,
    setEmail,
    setPassword,
    submit,
  }
}
