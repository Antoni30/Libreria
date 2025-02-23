import { useEffect, useState } from 'react'
import { useDeleteBook } from './useDeleteBook'
import { useBooks } from './useBooks'
import { Book } from '../types/book'

export function useDashboardBook() {
  const { books } = useBooks()
  const { message, deleteBook: deleteBookById } = useDeleteBook()
  const [booksDashboard, setBooksDashboard] = useState<Book[]>()
  const [idDeleting, setIdDeleting] = useState<number | undefined>()

  const deleteBook = (id: number) => {
    deleteBookById(id)
    setIdDeleting(id)
  }

  useEffect(() => {
    if (!books || booksDashboard) return
    setBooksDashboard(books)
  }, [books, booksDashboard])

  useEffect(() => {
    if (!idDeleting) return

    if (message.length) {
      setBooksDashboard((books) => {
        if (!books) return
        return books.filter((book) => book.id !== idDeleting)
      })
      setIdDeleting(undefined)
    }
  }, [idDeleting, message])

  return { books: booksDashboard, idDeleting, deleteBook }
}
