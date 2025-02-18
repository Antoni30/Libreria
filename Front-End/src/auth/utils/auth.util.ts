import { LoginForm, RegisterForm, UserSignIn } from '../types/auth'
import {
  isUser,
  isValidUserName,
  isValidPassword,
} from '../../users/utils/user.util'
import { isValidPhoneNumber } from '../../shared/utils/validations.util'
import { isValidEmail } from '../../shared/utils/validations.util'
import { FormField } from '../../shared/types/form'
import { USER_SESSION_KEY } from '../constants/userSession'

export function validateFullname(fullname: string): FormField<string> {
  const hasFullnameError = !isValidUserName(fullname)
  const fullnameValidated = {
    value: fullname,
    error: hasFullnameError
      ? 'Invalid fullname (must be contain firstname and lastname)'
      : '',
  }
  return fullnameValidated
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

export function validatePassword(password: string): FormField<string> {
  const hasPasswordError = !isValidPassword(password)
  const passwordValidated = {
    value: password,
    error: hasPasswordError
      ? 'Invalid password (must be containe at least 6 characters)'
      : '',
  }
  return passwordValidated
}

export function validateLoginForm(form: LoginForm) {
  const formValidated = structuredClone(form)
  formValidated.fields.email = validateEmail(formValidated.fields.email.value)
  formValidated.fields.password = validatePassword(
    formValidated.fields.password.value
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
    formValidated.fields.fullname.value
  )
  formValidated.fields.email = validateEmail(formValidated.fields.email.value)
  formValidated.fields.phoneNumber = validatePhoneNumber(
    formValidated.fields.phoneNumber.value
  )
  formValidated.fields.password = validatePassword(
    formValidated.fields.password.value
  )
  const isValidForm = Object.entries(formValidated.fields).every(
    ([, field]) => {
      return !field.error.length
    }
  )
  formValidated.isValid = isValidForm

  return formValidated
}

export function setLocalSession(user: UserSignIn) {
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user))
}

export function removeLocalSession() {
  localStorage.removeItem(USER_SESSION_KEY)
}

export function getLocalSession(): UserSignIn | undefined {
  const session = localStorage.getItem(USER_SESSION_KEY)
  if (!session) return
  const user = JSON.parse(session) as unknown
  if (!isUser(user)) return
  return user
}
