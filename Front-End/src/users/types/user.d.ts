import { UserRole } from '../enums/user.enum'

export interface User {
  id: string
  role: UserRole
  fullname: string
  email: string
  phoneNumber: string
}
