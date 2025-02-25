import { UserRole } from '../../users/enums/user.enum'

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
    add: {
      relative: 'add',
      absolute: '/users/add',
    },
    edit: {
      relative: 'edit/:userId',
      absolute: (userId: number) => {
        return `/users/edit/${userId}`
      },
    },delete: {
      relative: 'delete/:userId',
      absolute: (userId: number) => {
        return `/users/delete/${userId}`
      },
    }
  },
  sales: {
    relative: 'sales',
    absolute: '/sales',
  },
  books: {
    relative: 'books',
    absolute: '/books',
    add: {
      relative: 'add',
      absolute: '/books/add',
    },
    edit: {
      relative: 'edit/:bookId',
      absolute: (bookId: number) => {
        return `/books/edit/${bookId}`
      },
    },
  },
  publishers: {
    relative: 'publishers',
    absolute: '/publishers',
    add: {
      relative: 'add',
      absolute: '/publishers/add',
    },
    edit: {
      relative: 'edit/:publisherId',
      absolute: (publisherId: number) => {
        return `/publishers/edit/${publisherId}`
      },
    },
  },
  store: {
    relative: 'store',
    absolute: '/store',
    view :{
      relative: 'view/:id',
      absolute:(bookId: number)=>{
        return `/store/view/${bookId}`
      }
    }
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
