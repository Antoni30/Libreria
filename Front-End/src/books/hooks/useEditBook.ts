import { useEffect, useReducer, useState } from 'react'
import { EditBookForm, EditBookAction, Book, EditBook } from '../types/book'
import {
  validateAuthor,
  validateEditBookForm,
  validateIsbn,
  validatePrice,
  validatePublicationYear,
  validateQuantity,
  validateTitle,
} from '../utils/book.util'
import { putBook } from '../services/book.service'
import { useBook } from './useBook'
import { useNavigate } from 'react-router'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'
import { BookStatus } from '../enums/book.enum'

function initializeForm(bookToEdit: Book | undefined): EditBookForm {
  return {
    fields: {
      author: {
        error: '',
        value: bookToEdit?.author ?? '',
      },
      isbn: {
        error: '',
        value: bookToEdit?.isbn ?? '',
      },
      publicationYear: {
        error: '',
        value: bookToEdit?.publicationYear ?? 0,
      },
      publisherId: {
        error: '',
        value: bookToEdit?.publisherId ?? -1,
      },
      quantity: {
        error: '',
        value: bookToEdit?.quantity ?? 0,
      },
      title: {
        error: '',
        value: bookToEdit?.title ?? '',
      },
      status: {
        error: '',
        value: bookToEdit?.status ?? BookStatus.UNKNOWN,
      },
      price: {
        error: '',
        value: bookToEdit?.price ?? 0,
      },
    },
    isValid: false,
  }
}

function editBookReducer(
  state: EditBookForm,
  action: EditBookAction
): EditBookForm {
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
      newState.fields.publisherId.value = action.payload.publisherId
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
      const newState = validateEditBookForm(state)
      return newState
    }

    case 'reset': {
      return initializeForm(action.payload?.fieldsValues)
    }
  }
}

export function useEditBook({ bookId }: { bookId?: number }) {
  const {
    book: bookToUpdate,
    isLoading: isLoadingData,
    error: errorData,
  } = useBook({ id: bookId })
  const [form, dispatch] = useReducer(
    editBookReducer,
    bookToUpdate,
    initializeForm
  )
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

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
    if (!form.isValid || !bookToUpdate) return

    setIsLoading(true)
    setMessage('')

    const updatedBook: EditBook = {
      author: form.fields.author.value,
      isbn: form.fields.isbn.value,
      publicationYear: form.fields.publicationYear.value,
      publisherId: form.fields.publisherId.value,
      quantity: form.fields.quantity.value,
      status: form.fields.status.value,
      title: form.fields.title.value,
      price: form.fields.price.value,
    }

    putBook(bookToUpdate.id, updatedBook)
      .then((successful) => {
        if (successful) {
          setMessage('Book updated successfully')
        } else {
          setError('Book already exist')
        }
      })
      .catch(() => {
        setError("Book can't be updated")
      })
      .finally(() => {
        reset()
        setIsLoading(false)
        setTimeout(() => {
          setMessage('')
          setError('')
          void navigate(ROUTES_PATH.books.absolute, { replace: true })
        }, 2000)
      })
  }, [form, bookToUpdate, navigate])

  useEffect(() => {
    if (!bookToUpdate) return

    dispatch({ type: 'reset', payload: { fieldsValues: bookToUpdate } })
  }, [bookToUpdate])

  return {
    form,
    isLoadingForm: isLoading,
    isLoadingData,
    errorForm: error,
    errorData,
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
