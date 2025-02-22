import { FormField } from '../../shared/types/form'
import {
  validateAddress,
  validateEmail,
  validatePhoneNumber,
} from '../../shared/utils/validations.util'
import {
  AddPublisherForm,
  EditPublisherForm,
  Publisher,
} from '../types/publisher'

export function isValidPublisherName(name: string) {
  return /[A-Za-z0-9\s]{3,50}/.test(name)
}

export function validatePublisherName(name: string): FormField<string> {
  const isValid = isValidPublisherName(name)
  return {
    error: !isValid ? 'Publisher name invalid' : '',
    value: name,
  }
}

export function validateAddPublisherForm(form: AddPublisherForm) {
  const formValidated = structuredClone(form)
  formValidated.fields.name = validatePublisherName(
    formValidated.fields.name.value
  )
  formValidated.fields.address = validateAddress(
    formValidated.fields.address.value
  )
  formValidated.fields.phone = validatePhoneNumber(
    formValidated.fields.phone.value
  )
  formValidated.fields.email = validateEmail(formValidated.fields.email.value)

  const isValidForm = Object.entries(formValidated.fields).every(
    ([, field]) => {
      return !field.error.length
    }
  )

  formValidated.isValid = isValidForm

  return formValidated
}

export function validateEditPublisherForm(form: EditPublisherForm) {
  const formValidated = structuredClone(form)

  formValidated.fields.address = validateAddress(
    formValidated.fields.address.value
  )
  formValidated.fields.phone = validatePhoneNumber(
    formValidated.fields.phone.value
  )
  formValidated.fields.email = validateEmail(formValidated.fields.email.value)

  const isValidForm = Object.entries(formValidated.fields).every(
    ([, field]) => {
      return !field.error.length
    }
  )

  formValidated.isValid = isValidForm

  return formValidated
}

export function isPublisher(object: unknown): object is Publisher {
  const publisher = object as Publisher
  return publisher.id !== undefined
}
