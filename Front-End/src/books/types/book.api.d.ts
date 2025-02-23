export interface BookDTO {
  id_book: number
  id_publisher: number
  book_title: string
  book_author: string
  book_isbn: string
  book_publication_year: number
  book_quantity_available: number
  book_status: string
  book_cover_image: string
  book_price: string
}

export type GetBooksResponse = BookDTO[] | { message: string; error: string }

export type GetBookResponse = BookDTO | { message: string; error: string }

export type PostBookRequest = Omit<BookDTO, 'id_book'>

export type PostBookResponse =
  | { message: string; error: undefined }
  | { message: undefined; error: string }

export type PutBookRequest = Omit<BookDTO, 'id_book'>

export type PutBookResponse =
  | { message: string; error: undefined }
  | { message: undefined; error: string }

export type DeleteBookResponse =
  | { message: string; error: undefined }
  | { message: undefined; error: string }
