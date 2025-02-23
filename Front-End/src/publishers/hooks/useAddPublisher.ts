import { useEffect, useReducer, useState } from 'react'
import { AddPublisherForm, AddPublisherAction } from '../types/publisher'
import {
  validateAddPublisherForm,
  validatePublisherName,
} from '../utils/publisher.util'
import {
  validateAddress,
  validateEmail,
  validatePhoneNumber,
} from '../../shared/utils/validations.util'
import { postPublisher } from '../services/publisher.service'

function initializeForm(): AddPublisherForm {
  return {
    fields: {
      address: {
        error: '',
        value: '',
      },
      email: {
        error: '',
        value: '',
      },
      name: {
        error: '',
        value: '',
      },
      phone: {
        error: '',
        value: '',
      },
    },
    isValid: false,
  }
}

function addPublisherReducer(
  state: AddPublisherForm,
  action: AddPublisherAction
): AddPublisherForm {
  switch (action.type) {
    case 'set-name': {
      const newState = structuredClone(state)
      newState.fields.name = validatePublisherName(action.payload.name)
      return newState
    }

    case 'set-address': {
      const newState = structuredClone(state)
      newState.fields.address = validateAddress(action.payload.address)
      return newState
    }

    case 'set-phone': {
      const newState = structuredClone(state)
      newState.fields.phone = validatePhoneNumber(action.payload.phone)
      return newState
    }

    case 'set-email': {
      const newState = structuredClone(state)
      newState.fields.email = validateEmail(action.payload.email)
      return newState
    }

    case 'submit': {
      const newState = validateAddPublisherForm(state)
      return newState
    }

    case 'reset': {
      return initializeForm()
    }
  }
}

export function useAddPublisher() {
  const [form, dispatch] = useReducer(addPublisherReducer, null, initializeForm)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const setName = (name: string) => {
    dispatch({ type: 'set-name', payload: { name: name } })
  }

  const setAddress = (address: string) => {
    dispatch({
      type: 'set-address',
      payload: { address: address },
    })
  }

  const setPhone = (phone: string) => {
    dispatch({
      type: 'set-phone',
      payload: { phone: phone },
    })
  }

  const setEmail = (email: string) => {
    dispatch({
      type: 'set-email',
      payload: { email: email },
    })
  }

  const submit = () => {
    dispatch({ type: 'submit' })
  }

  const reset = () => {
    dispatch({ type: 'reset' })
  }

  useEffect(() => {
    if (!form.isValid) return

    setIsLoading(true)
    setMessage('')

    const newPublisher = {
      name: form.fields.name.value,
      email: form.fields.email.value,
      address: form.fields.address.value,
      phone: form.fields.phone.value,
    }

    postPublisher(newPublisher)
      .then((successful) => {
        if (successful) {
          setMessage('Publisher created successfully')
        } else {
          setError('Publisher name already exist')
        }
      })
      .catch(() => {
        setError("Publisher can't be created")
      })
      .finally(() => {
        reset()
        setIsLoading(false)
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 3000)
      })
  }, [form])

  return {
    form,
    isLoading,
    error,
    message,
    setName,
    setAddress,
    setPhone,
    setEmail,
    submit,
  }
}
