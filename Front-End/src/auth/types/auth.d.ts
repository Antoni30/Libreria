import { LoginActionType, RegisterActionType } from '../enums/auth.enum'

export interface FormField {
  text: string
  error: string
}

export interface LoginForm {
  fields: {
    email: FormField
    password: FormField
  }
  isValid: boolean
}

export type LoginAction =
  | {
      type: LoginActionType.SET_EMAIL
      payload: {
        email: string
      }
    }
  | {
      type: LoginActionType.SET_PASSWORD
      payload: {
        password: string
      }
    }
  | {
      type: LoginActionType.SUBMIT
    }
  | {
      type: LoginActionType.RESET
    }

export interface RegisterForm {
  fields: {
    fullname: FormField
    email: FormField
    phoneNumber: FormField
    password: FormField
  }
  isValid: boolean
}

export type RegisterAction =
  | {
      type: RegisterActionType.SET_FULLNAME
      payload: {
        fullname: string
      }
    }
  | {
      type: RegisterActionType.SET_EMAIL
      payload: {
        email: string
      }
    }
  | {
      type: RegisterActionType.SET_PHONE_NUMBER
      payload: {
        phoneNumber: string
      }
    }
  | {
      type: RegisterActionType.SET_PASSWORD
      payload: {
        password: string
      }
    }
  | {
      type: RegisterActionType.SUBMIT
    }
  | {
      type: RegisterActionType.RESET
    }
