import { useEffect, useReducer, useState } from 'react'
import { AddBookForm, AddBookAction, AddBook } from '../types/book'
import {
  validateAddBookForm,
  validateAuthor,
  validateIsbn,
  validatePrice,
  validatePublicationYear,
  validatePublisherId,
  validateQuantity,
  validateTitle,
} from '../utils/book.util'
import { postBook } from '../services/book.service'
import { BookStatus } from '../enums/book.enum'

function initializeForm(): AddBookForm {
  return {
    fields: {
      author: {
        error: '',
        value: '',
      },
      isbn: {
        error: '',
        value: '',
      },
      publicationYear: {
        error: '',
        value: 0,
      },
      publisherId: {
        error: '',
        value: -1,
      },
      quantity: {
        error: '',
        value: 0,
      },
      title: {
        error: '',
        value: '',
      },
      price: {
        error: '',
        value: 0,
      },
    },
    isValid: false,
  }
}

function addBookReducer(
  state: AddBookForm,
  action: AddBookAction
): AddBookForm {
  switch (action.type) {
    case 'set-author': {
      const newState = structuredClone(state)
      newState.fields.author = validateAuthor(action.payload.author)
      return newState
    }

    case 'set-isbn': {
      const newState = structuredClone(state)
      newState.fields.isbn = validateIsbn(action.payload.isbn)
      return newState
    }

    case 'set-publication-year': {
      const newState = structuredClone(state)
      newState.fields.publicationYear = validatePublicationYear(
        action.payload.publicationYear
      )
      return newState
    }

    case 'set-publisher-id': {
      const newState = structuredClone(state)
      newState.fields.publisherId = validatePublisherId(
        action.payload.publisherId
      )
      return newState
    }

    case 'set-quantity': {
      const newState = structuredClone(state)
      newState.fields.quantity = validateQuantity(action.payload.quantity)
      return newState
    }

    case 'set-title': {
      const newState = structuredClone(state)
      newState.fields.title = validateTitle(action.payload.title)
      return newState
    }

    case 'set-price': {
      const newState = structuredClone(state)
      newState.fields.price = validatePrice(action.payload.price)
      return newState
    }

    case 'submit': {
      const newState = validateAddBookForm(state)
      return newState
    }

    case 'reset': {
      return initializeForm()
    }
  }
}

export function useAddBook() {
  const [form, dispatch] = useReducer(addBookReducer, null, initializeForm)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const setAuthor = (author: string) => {
    dispatch({ type: 'set-author', payload: { author: author } })
  }

  const setIsbn = (isbn: string) => {
    dispatch({
      type: 'set-isbn',
      payload: { isbn: isbn },
    })
  }

  const setPublicationYear = (publicationYear: number) => {
    dispatch({
      type: 'set-publication-year',
      payload: { publicationYear: publicationYear },
    })
  }

  const setPublisherId = (publisherId: number) => {
    dispatch({
      type: 'set-publisher-id',
      payload: { publisherId: publisherId },
    })
  }

  const setQuantity = (quantity: number) => {
    dispatch({
      type: 'set-quantity',
      payload: { quantity: quantity },
    })
  }

  const setTitle = (title: string) => {
    dispatch({
      type: 'set-title',
      payload: { title: title },
    })
  }

  const setPrice = (price: number) => {
    dispatch({
      type: 'set-price',
      payload: { price: price },
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

    const newBook: AddBook = {
      author: form.fields.author.value,
      isbn: form.fields.isbn.value,
      publicationYear: form.fields.publicationYear.value,
      publisherId: form.fields.publisherId.value,
      quantity: form.fields.quantity.value,
      status:
        form.fields.quantity.value > 0
          ? BookStatus.AVAILABLE
          : BookStatus.UNAVAILABLE,
      title: form.fields.title.value,
      price: form.fields.price.value,
    }

    postBook(newBook)
      .then((successful) => {
        if (successful) {
          setMessage('Book created successfully')
        } else {
          setError('Book already exist')
        }
      })
      .catch(() => {
        setError("Book can't be created")
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
    setAuthor,
    setIsbn,
    setPublicationYear,
    setPublisherId,
    setQuantity,
    setTitle,
    setPrice,
    submit,
  }
}
