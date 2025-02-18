export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhoneNumber(phoneNumber: string) {
  return /^\d{10}$/.test(phoneNumber)
}

export function isValidAddress(address: string) {
  return /^[A-Za-z0-9\s,.-]{5,100}$/.test(address)
}
