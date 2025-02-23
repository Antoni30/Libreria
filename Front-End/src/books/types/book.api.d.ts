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
  book_price: number
}

export type GetBooksDTO = BookDTO[]

export type GetBookDTO = BookDTO

export type PutBookDTO = Omit<BookDTO, 'id_book'>
