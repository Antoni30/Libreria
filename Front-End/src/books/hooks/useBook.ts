import { useEffect, useState } from 'react'
import { Book } from '../types/book'
import { getBookById } from '../services/book.service'

export function useBook({ id }: { id?: number }) {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<Book>()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    setIsLoading(true)

    getBookById(id)
      .then((book) => setBook(book))
      .catch(() => {
        setError('Book not found')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return {
    book,
    isLoading,
    error,
  }
}
