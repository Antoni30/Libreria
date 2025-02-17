import { LoginActionType, RegisterActionType } from '../enums/auth.enum'
import { User } from '../../users/types/user'
import { FormState } from '../../shared/types/form'

export type LoginForm = FormState<Pick<User, 'email' | 'password'>>

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

export type RegisterForm = FormState<Omit<User, 'id' | 'role'>>

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

export type UserSignIn = Omit<User, 'password'>
export type UserSignUp = Omit<User, 'id' | 'role'>
