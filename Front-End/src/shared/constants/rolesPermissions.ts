import { UserRole } from '../../auth/enums/user.enum'

export const ALLOWED_ROLES_PER_MODULE = {
  users: [UserRole.ADMIN],
  sales: [UserRole.ADMIN],
  books: [UserRole.LIBRARIAN],
  publishers: [UserRole.LIBRARIAN],
  store: [UserRole.CLIENT],
}
