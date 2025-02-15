import { UserRole } from '../enums/user.enum'

export interface User {
  id: number
  role: UserRole
  fullname: string
  email: string
  phoneNumber: string
}

export type UserRegistration = Omit<User, 'id'> & {
  password: string
}
