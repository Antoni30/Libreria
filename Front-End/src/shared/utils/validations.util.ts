export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
export function isValidPhoneNumber(phoneNumber: string) {
  return /^\d{10}$/.test(phoneNumber)
}
