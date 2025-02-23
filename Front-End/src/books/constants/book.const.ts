import { BookStatus } from '../enums/book.enum'

export const bookStatusMap: Record<string, BookStatus> = {
  available: BookStatus.AVAILABLE,
  unavailable: BookStatus.UNAVAILABLE,
}

export const booksStatusStringMap: Record<BookStatus, string> = {
  [BookStatus.AVAILABLE]: 'available',
  [BookStatus.UNAVAILABLE]: 'unavailable',
  [BookStatus.UNKNOWN]: 'unkown',
}
