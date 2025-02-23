import { useEffect, useReducer, useState } from 'react'
import {
  EditPublisherForm,
  EditPublisherAction,
  Publisher,
} from '../types/publisher'
import { validateEditPublisherForm } from '../utils/publisher.util'
import {
  validateAddress,
  validateEmail,
  validatePhoneNumber,
} from '../../shared/utils/validations.util'
import { putPublisher } from '../services/publisher.service'
import { usePublisher } from './usePublisher'
import { useNavigate } from 'react-router'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'

function initializeForm(
  publisherToEdit: Publisher | undefined
): EditPublisherForm {
  return {
    fields: {
      name: {
        error: '',
        value: publisherToEdit?.name ?? '',
      },
      address: {
        error: '',
        value: publisherToEdit?.address ?? '',
      },
      email: {
        error: '',
        value: publisherToEdit?.email ?? '',
      },
      phone: {
        error: '',
        value: publisherToEdit?.phone ?? '',
      },
    },
    isValid: false,
  }
}

function editPublisherReducer(
  state: EditPublisherForm,
  action: EditPublisherAction
): EditPublisherForm {
  switch (action.type) {
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
      const newState = validateEditPublisherForm(state)
      return newState
    }

    case 'reset': {
      return initializeForm(action.payload?.fieldsValues)
    }
  }
}

export function useEditPublisher({ publisherId }: { publisherId?: number }) {
  const {
    publisher: publisherToUpdate,
    isLoading: isLoadingData,
    error: errorData,
  } = usePublisher({ id: publisherId })
  const [form, dispatch] = useReducer(
    editPublisherReducer,
    publisherToUpdate,
    initializeForm
  )
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

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
    if (!form.isValid || !publisherToUpdate) return

    setIsLoading(true)
    setMessage('')

    const updatedPublisher = {
      name: publisherToUpdate.name,
      email: form.fields.email.value,
      address: form.fields.address.value,
      phone: form.fields.phone.value,
    }

    putPublisher(publisherToUpdate.id, updatedPublisher)
      .then((successful) => {
        if (successful) {
          setMessage('Publisher updated successfully')
        } else {
          setError('Publisher name already exist')
        }
      })
      .catch(() => {
        setError("Publisher can't be updated")
      })
      .finally(() => {
        reset()
        setIsLoading(false)
        setTimeout(() => {
          setMessage('')
          setError('')
          void navigate(ROUTES_PATH.publishers.absolute, { replace: true })
        }, 2000)
      })
  }, [form, publisherToUpdate, navigate])

  useEffect(() => {
    if (!publisherToUpdate) return

    dispatch({ type: 'reset', payload: { fieldsValues: publisherToUpdate } })
  }, [publisherToUpdate])

  return {
    form,
    isLoadingForm: isLoading,
    isLoadingData,
    errorForm: error,
    errorData,
    message,
    setAddress,
    setPhone,
    setEmail,
    submit,
  }
}
