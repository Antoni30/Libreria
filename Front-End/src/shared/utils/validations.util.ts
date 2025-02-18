import { FormField } from '../types/form'

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhoneNumber(phoneNumber: string) {
  return /^\d{10}$/.test(phoneNumber)
}

export function isValidAddress(address: string) {
  return /^[A-Za-z0-9\s,.-]{5,100}$/.test(address)
}

export function validateEmail(email: string): FormField<string> {
  const isValid = isValidEmail(email)
  return {
    value: email,
    error: !isValid ? 'Invalid email format' : '',
  }
}

export function validatePhoneNumber(phoneNumber: string): FormField<string> {
  const isValid = isValidPhoneNumber(phoneNumber)
  return {
    value: phoneNumber,
    error: !isValid ? 'Invalid phone number (must be contain 10 digits)' : '',
  }
}

export function validateAddress(address: string): FormField<string> {
  const isValid = isValidAddress(address)
  return {
    error: !isValid ? 'Invalid address' : '',
    value: address,
  }
}
