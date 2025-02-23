import { FormField } from '../../shared/types/form'
import { booksStatusStringMap, bookStatusMap } from '../constants/book.const'
import { BookStatus } from '../enums/book.enum'
import { AddBookForm, EditBookForm } from '../types/book'

function isValidStatus(status: string) {
  return Object.keys(bookStatusMap).includes(status)
}

export function isBookStatus(status: unknown): status is BookStatus {
  return typeof status === 'string' && isValidStatus(status)
}

export function bookStatusToString(status: BookStatus): string {
  return booksStatusStringMap[status]
}

export function isValidAuthor(author: string): boolean {
  return author.length > 0
}

export function isValidIsbn(isbn: string): boolean {
  return isbn.length === 13
}

export function isValidPublisherId(id: number): boolean {
  return id >= 0
}

export function isValidPublicationYear(publicationYear: number): boolean {
  return publicationYear > 1900 && publicationYear <= new Date().getFullYear()
}

export function isValidQuantity(quantity: number): boolean {
  return quantity >= 0 && quantity <= 100
}

export function isValidTitle(title: string): boolean {
  return title.length > 0 && title.length <= 50
}

export function isValidPrice(price: number): boolean {
  return price > 0 && price <= 100
}

export function validateAuthor(author: string): FormField<string> {
  const isValid = isValidAuthor(author)
  return {
    error: !isValid ? 'Author name invalid' : '',
    value: author,
  }
}

export function validateIsbn(isbn: string): FormField<string> {
  const isValid = isValidIsbn(isbn)
  return {
    error: !isValid ? 'ISBN invalid' : '',
    value: isbn,
  }
}

export function validatePublisherId(id: number): FormField<number> {
  const isValid = isValidPublisherId(id)
  return {
    error: !isValid ? 'Publisher invalid' : '',
    value: id,
  }
}

export function validatePublicationYear(year: number): FormField<number> {
  const isValid = isValidPublicationYear(year)
  return {
    error: !isValid ? 'Publication year invalid' : '',
    value: year,
  }
}

export function validateQuantity(quantity: number): FormField<number> {
  const isValid = isValidQuantity(quantity)
  return {
    error: !isValid ? 'Quantity should be greater or equals than zero' : '',
    value: quantity,
  }
}

export function validateTitle(title: string): FormField<string> {
  const isValid = isValidTitle(title)
  return {
    error: !isValid ? 'Invalid title' : '',
    value: title,
  }
}

export function validatePrice(price: number): FormField<number> {
  const isValid = isValidPrice(price)
  return {
    error: !isValid ? 'Invalid price' : '',
    value: price,
  }
}

export function validateAddBookForm(form: AddBookForm) {
  const formValidated = structuredClone(form)
  formValidated.fields.author = validateAuthor(
    formValidated.fields.author.value
  )
  formValidated.fields.isbn = validateAuthor(formValidated.fields.isbn.value)
  formValidated.fields.publicationYear = validatePublicationYear(
    formValidated.fields.publicationYear.value
  )
  formValidated.fields.publisherId = validatePublisherId(
    formValidated.fields.publisherId.value
  )
  formValidated.fields.quantity = validateQuantity(
    formValidated.fields.quantity.value
  )
  formValidated.fields.title = validateTitle(formValidated.fields.title.value)

  const isValidForm = Object.entries(formValidated.fields).every(
    ([, field]) => {
      return !field.error.length
    }
  )

  formValidated.isValid = isValidForm

  return formValidated
}

export function validateEditBookForm(form: EditBookForm) {
  const formValidated = structuredClone(form)

  formValidated.fields.author = validateAuthor(
    formValidated.fields.author.value
  )
  formValidated.fields.isbn = validateAuthor(formValidated.fields.isbn.value)
  formValidated.fields.publicationYear = validatePublicationYear(
    formValidated.fields.publicationYear.value
  )
  formValidated.fields.publisherId.error =
    formValidated.fields.publisherId.value < 0
      ? 'Publisher not selected yet'
      : ''
  formValidated.fields.quantity = validateQuantity(
    formValidated.fields.quantity.value
  )
  formValidated.fields.title = validateAuthor(formValidated.fields.title.value)
  formValidated.fields.price = validatePrice(formValidated.fields.price.value)

  const isValidForm = Object.entries(formValidated.fields).every(
    ([, field]) => {
      return !field.error.length
    }
  )

  formValidated.isValid = isValidForm

  return formValidated
}
