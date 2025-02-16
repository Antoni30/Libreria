import { UserRole } from '../../users/enums/user.enum'
import { User } from '../../users/types/user'

export function isValidFullname(fullname: string) {
  return /^[A-Za-z]{3,}\s[A-Za-z]{3,}$/.test(fullname)
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhoneNumber(phoneNumber: string) {
  return /^\d{10}$/.test(phoneNumber)
}

export function isValidPassword(password: string) {
  const MIN_PASSWORD_CHARACTERS = 6
  return password.length >= MIN_PASSWORD_CHARACTERS
}

export function isUser(object: unknown): object is User {
  return (object as User).role !== undefined
}

export function getTextFromUserRole(role: UserRole) {
  const textFromRole: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Admin',
    [UserRole.CLIENT]: 'Client',
    [UserRole.LIBRARIAN]: 'Librarian',
  }

  return textFromRole[role]
}
