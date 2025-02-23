import { FormState } from '../../shared/types/form'
import { BookStatus } from '../enums/book.enum'

export interface Book {
  id: number
  publisherId: number
  title: string
  author: string
  isbn: string
  publicationYear: number
  quantity: number
  status: BookStatus
  price: number
}

export type EditBook = Omit<Book, 'id'>

export type DeleteBook = Pick<Book, 'id'>

export type AddBook = Omit<Book, 'id'>

export type AddBookForm = FormState<Omit<Book, 'id' | 'status'>>

export type AddBookAction =
  | {
      type: 'set-publisher-id'
      payload: {
        publisherId: number
      }
    }
  | {
      type: 'set-title'
      payload: {
        title: string
      }
    }
  | {
      type: 'set-author'
      payload: {
        author: string
      }
    }
  | {
      type: 'set-isbn'
      payload: {
        isbn: string
      }
    }
  | {
      type: 'set-publication-year'
      payload: {
        publicationYear: number
      }
    }
  | {
      type: 'set-quantity'
      payload: {
        quantity: number
      }
    }
  | {
      type: 'set-price'
      payload: {
        price: number
      }
    }
  | {
      type: 'submit'
    }
  | {
      type: 'reset'
    }

export type EditBook = Omit<Book, 'id'>

export type EditBookForm = FormState<EditBook>

export type EditBookAction =
  | {
      type: 'set-publisher-id'
      payload: {
        publisherId: number
      }
    }
  | {
      type: 'set-title'
      payload: {
        title: string
      }
    }
  | {
      type: 'set-author'
      payload: {
        author: string
      }
    }
  | {
      type: 'set-isbn'
      payload: {
        isbn: string
      }
    }
  | {
      type: 'set-publication-year'
      payload: {
        publicationYear: number
      }
    }
  | {
      type: 'set-quantity'
      payload: {
        quantity: number
      }
    }
  | {
      type: 'set-price'
      payload: {
        price: number
      }
    }
  | {
      type: 'submit'
    }
  | {
      type: 'reset'
      payload?: {
        fieldsValues: Book
      }
    }
