import { useEffect, useState } from 'react'
import { deleteBook as deleteBookService } from '../services/book.service'

export function useDeleteBook() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const deleteBook = (id: number) => {
    setMessage('')
    setError('')
    setIsLoading(true)

    deleteBookService({ id })
      .then((isDeleted) => {
        if (isDeleted) {
          setMessage('Book deleted successfully')
        } else {
          setError('Book cant be deleted because is associated with a book')
        }
      })
      .catch(() => setError('Book cant be deleted'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!error.length && !message.length) return

    setTimeout(() => {
      setError('')
      setMessage('')
    }, 2500)
  }, [error, message])

  return {
    message,
    isLoading,
    error,
    deleteBook,
  }
}
