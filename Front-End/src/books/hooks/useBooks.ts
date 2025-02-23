import { useEffect, useState } from 'react'
import { Book } from '../types/book'
import { getBooks } from '../services/book.service'

export function useBooks() {
  const [books, setBooks] = useState<Book[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)

    void getBooks()
      .then((books) => {
        setBooks(books)
        setIsLoading(false)
      })
      .catch(() => setError('An error occur trying to retrieve the books'))
  }, [])

  return { books, isLoading, error }
}
