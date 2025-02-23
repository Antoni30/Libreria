import { bookStatusMap } from '../constants/book.const'
import { BookStatus } from '../enums/book.enum'
import { Book, EditBook } from '../types/book'
import { BookDTO, PutBookDTO } from '../types/book.api'
import { bookStatusToString, isBookStatus } from './book.util'

export function mapBookStatus(statusObject: unknown): BookStatus {
  return typeof statusObject === 'string' &&
    isBookStatus(statusObject.toLowerCase())
    ? bookStatusMap[statusObject.toLowerCase()]
    : BookStatus.UNKNOWN
}

export function mapBooksDTO(booksObject: BookDTO[]): Book[] {
  return booksObject.map((bookDTO) => mapBookDTO(bookDTO))
}

export function mapBookDTO(bookObject: BookDTO): Book {
  return {
    author: bookObject.book_author,
    id: bookObject.id_book,
    isbn: bookObject.book_isbn,
    publicationYear: bookObject.book_publication_year,
    publisherId: bookObject.id_publisher,
    quantity: bookObject.book_quantity_available,
    status: mapBookStatus(bookObject.book_status),
    title: bookObject.book_title,
    price: bookObject.book_price,
  }
}

export function mapEditBook(book: EditBook): PutBookDTO {
  return {
    book_author: book.author,
    book_cover_image: '',
    book_isbn: book.isbn,
    book_publication_year: book.publicationYear,
    book_quantity_available: book.quantity,
    book_status: bookStatusToString(book.status),
    book_title: book.title,
    id_publisher: book.publisherId,
    book_price: book.price,
  }
}
