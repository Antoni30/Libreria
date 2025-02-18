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
  const hasEmailError = !isValidEmail(email)
  const emailValidated = {
    value: email,
    error: hasEmailError ? 'Invalid email format' : '',
  }
  return emailValidated
}
export function validatePhoneNumber(phoneNumber: string): FormField<string> {
  const hasPhoneNumberError = !isValidPhoneNumber(phoneNumber)
  const phoneNumberValidated = {
    value: phoneNumber,
    error: hasPhoneNumberError
      ? 'Invalid phone number (must be contain 10 digits)'
      : '',
  }
  return phoneNumberValidated
}
