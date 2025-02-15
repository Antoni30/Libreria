import { UserRole } from '../../auth/enums/user.enum'

export const ROUTES_PATH = {
  login: {
    relative: 'login',
    absolute: '/login',
  },
  register: {
    relative: 'register',
    absolute: '/register',
  },
  unauthorized: {
    relative: 'unauthorized',
    absolute: '/unauthorized',
  },
  dashboard: {
    relative: 'dashboard',
    absolute: '/dashboard',
  },
  users: {
    relative: 'users',
    absolute: '/users',
  },
  sales: {
    relative: 'sales',
    absolute: '/sales',
  },
  books: {
    relative: 'books',
    absolute: '/books',
  },
  publishers: {
    relative: 'publishers',
    absolute: '/publishers',
  },
  store: {
    relative: 'store',
    absolute: '/store',
  },
}

export const ALLOWED_ROLES_PER_MODULE: Record<
  keyof Omit<typeof ROUTES_PATH, 'login' | 'register' | 'unauthorized'>,
  UserRole[]
> = {
  dashboard: [UserRole.ADMIN, UserRole.CLIENT, UserRole.LIBRARIAN],
  users: [UserRole.ADMIN],
  sales: [UserRole.ADMIN],
  books: [UserRole.LIBRARIAN],
  publishers: [UserRole.LIBRARIAN],
  store: [UserRole.CLIENT],
}
