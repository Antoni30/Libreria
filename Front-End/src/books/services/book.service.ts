import { AddBook, Book, DeleteBook, EditBook } from '../types/book'
import BooksMock from '../mocks/books.json'
import { mapBookStatus } from '../utils/book.api.util'

// const BOOKS_API_PATH = 'http://localhost:2024/books'

export async function getBooks(): Promise<Book[]> {
  try {
    return await new Promise((resolve) => {
      const books = BooksMock.map((book) => ({
        ...book,
        status: mapBookStatus(book.status),
      }))

      setTimeout(() => {
        resolve(books)
      }, 2000)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return []
  }
}

export async function getBookById(id: number): Promise<Book | undefined> {
  try {
    return await new Promise((resolve) => {
      const book = BooksMock.find((book) => book.id === id)

      setTimeout(() => {
        resolve(
          book
            ? {
                ...book,
                status: mapBookStatus(book.status),
              }
            : undefined
        )
      }, 2000)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}

export async function putBook(
  id: number,
  bookToUpdate: EditBook
): Promise<Book | undefined> {
  try {
    return await new Promise((resolve) => {
      const book = BooksMock.find((book) => book.id === id)
      setTimeout(() => {
        resolve(book ? { id: id, ...bookToUpdate } : undefined)
      }, 2000)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}

export async function deleteBook(
  bookToDelete: DeleteBook
): Promise<Book | undefined> {
  try {
    return await new Promise((resolve) => {
      const deletedBook = BooksMock.find((book) => book.id === bookToDelete.id)
      setTimeout(() => {
        resolve(
          deletedBook
            ? {
                ...deletedBook,
                status: mapBookStatus(deletedBook.status),
              }
            : undefined
        )
      }, 2000)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}

export async function postBook(newBook: AddBook): Promise<Book | undefined> {
  try {
    return await new Promise((resolve) => {
      const isBookOnDb = BooksMock.find((book) => book.isbn === newBook.isbn)
      setTimeout(() => {
        if (isBookOnDb) return resolve(undefined)

        resolve({ id: BooksMock.length + 1, ...newBook })
      }, 2000)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}
