import { UserRole } from '../enums/user.enum'
import { FormField, LoginForm, RegisterForm } from '../types/auth'
import { User } from '../types/user'
import {
  isUser,
  isValidEmail,
  isValidFullname,
  isValidPassword,
  isValidPhoneNumber,
} from '../utils/user.util'

const homePathByUserRole: Record<UserRole, string> = {
  [UserRole.ADMIN]: '/admin',
  [UserRole.CLIENT]: '/store',
  [UserRole.LIBRARIAN]: '/librarian',
}

const USER_SESSION_KEY = 'user'

export function validateFullname(fullname: string): FormField {
  const hasFullnameError = !isValidFullname(fullname)
  const fullnameValidated = {
    text: fullname,
    error: hasFullnameError
      ? 'Invalid fullname (must be contain firstname and lastname)'
      : '',
  }
  return fullnameValidated
}

export function validateEmail(email: string): FormField {
  const hasEmailError = !isValidEmail(email)
  const emailValidated = {
    text: email,
    error: hasEmailError ? 'Invalid email format' : '',
  }
  return emailValidated
}

export function validatePhoneNumber(phoneNumber: string): FormField {
  const hasPhoneNumberError = !isValidPhoneNumber(phoneNumber)
  const phoneNumberValidated = {
    text: phoneNumber,
    error: hasPhoneNumberError
      ? 'Invalid phone number (must be contain 10 digits)'
      : '',
  }
  return phoneNumberValidated
}

export function validatePassword(password: string): FormField {
  const hasPasswordError = !isValidPassword(password)
  const passwordValidated = {
    text: password,
    error: hasPasswordError
      ? 'Invalid password (must be containe at least 6 characters)'
      : '',
  }
  return passwordValidated
}

export function validateLoginForm(form: LoginForm) {
  const formValidated = structuredClone(form)
  formValidated.fields.email = validateEmail(formValidated.fields.email.text)
  formValidated.fields.password = validatePassword(
    formValidated.fields.password.text
  )
  const isValidForm = Object.entries(formValidated.fields).every(
    ([, field]) => {
      return !field.error.length
    }
  )
  formValidated.isValid = isValidForm

  return formValidated
}

export function validateRegisterForm(form: RegisterForm) {
  const formValidated = structuredClone(form)
  formValidated.fields.fullname = validateFullname(
    formValidated.fields.fullname.text
  )
  formValidated.fields.email = validateEmail(formValidated.fields.email.text)
  formValidated.fields.phoneNumber = validatePhoneNumber(
    formValidated.fields.phoneNumber.text
  )
  formValidated.fields.password = validatePassword(
    formValidated.fields.password.text
  )
  const isValidForm = Object.entries(formValidated.fields).every(
    ([, field]) => {
      return !field.error.length
    }
  )
  formValidated.isValid = isValidForm

  return formValidated
}

export function getHomePathFromUserRole(role: UserRole) {
  return homePathByUserRole[role]
}

export function setLocalSession(user: User) {
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user))
}

export function removeLocalSession() {
  localStorage.removeItem(USER_SESSION_KEY)
}

export function getLocalSession(): User | undefined {
  const session = localStorage.getItem(USER_SESSION_KEY)
  if (!session) return
  const user = JSON.parse(session) as unknown
  if (!isUser(user)) return
  return user
}
