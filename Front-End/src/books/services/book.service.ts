import { AddBook, Book, DeleteBook, EditBook } from '../types/book'
import {
  isBookDTO,
  mapAddBook,
  mapBookDTO,
  mapEditBook,
} from '../utils/book.api.util'
import {
  DeleteBookResponse,
  GetBookResponse,
  GetBooksResponse,
  PostBookResponse,
  PutBookResponse,
} from '../types/book.api'

const BOOK_API_PATH = 'http://localhost:2024/books'

export async function getBooks(): Promise<Book[]> {
  try {
    const response = await fetch(BOOK_API_PATH)

    if (!response.ok) throw new Error('Cannot retrieve publishers')

    const jsonResponse = (await response.json()) as GetBooksResponse

    if (!Array.isArray(jsonResponse)) throw new Error(jsonResponse.error)

    return jsonResponse.map((bookDTO) => mapBookDTO(bookDTO))
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return []
  }
}

export async function getBookById(id: number): Promise<Book | undefined> {
  try {
    const response = await fetch(`${BOOK_API_PATH}/${id}`)
    if (!response.ok) throw new Error('Cannot retrieve publisher')

    const jsonResponse = (await response.json()) as GetBookResponse
    if (!isBookDTO(jsonResponse)) throw new Error(jsonResponse.error)

    return mapBookDTO(jsonResponse)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}

export async function putBook(
  id: number,
  bookToUpdate: EditBook
): Promise<boolean> {
  try {
    const response = await fetch(`${BOOK_API_PATH}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapEditBook(bookToUpdate)),
    })

    if (!response.ok) throw new Error('Cannot update publisher')

    const jsonResponse = (await response.json()) as PutBookResponse

    if (jsonResponse.error !== undefined) throw new Error(jsonResponse.error)

    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return false
  }
}

export async function deleteBook(bookToDelete: DeleteBook): Promise<boolean> {
  try {
    const response = await fetch(`${BOOK_API_PATH}/${bookToDelete.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error('Cannot update publisher')

    const jsonResponse = (await response.json()) as DeleteBookResponse

    if (jsonResponse.error !== undefined) throw new Error(jsonResponse.error)

    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return false
  }
}

export async function postBook(newBook: AddBook): Promise<boolean> {
  try {
    console.log(JSON.stringify(mapAddBook(newBook)))
    const response = await fetch(BOOK_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mapAddBook(newBook)),
    })

    if (!response.ok) throw new Error('Cannot update publisher')

    const jsonResponse = (await response.json()) as PostBookResponse

    if (jsonResponse.error !== undefined) throw new Error(jsonResponse.error)

    return true
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return false
  }
}
