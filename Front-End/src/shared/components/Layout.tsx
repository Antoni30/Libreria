import { IconFactory } from './IconFactory'
import { Icon } from '../enums/icon.enum'
import Logo from '../../assets/shared/logo.png'
import { ReactElement } from 'react'
import { UserRole } from '../../auth/enums/user.enum'
import { Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import { ALLOWED_ROLES_PER_MODULE } from '../constants/routesPermissions'

interface LayoutProps {
  userRole: UserRole
  children: ReactElement
}

export function Layout({ userRole, children }: LayoutProps) {
  const { signOut } = useAuth()
  return (
    <div>
      <header>
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <img src={Logo} alt="Logo" className="h-10" />

            {ALLOWED_ROLES_PER_MODULE.books.includes(userRole) && (
              <Link
                to="/books"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Books
              </Link>
            )}
            {ALLOWED_ROLES_PER_MODULE.users.includes(userRole) && (
              <Link
                to="/users"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Users
              </Link>
            )}
            {ALLOWED_ROLES_PER_MODULE.publishers.includes(userRole) && (
              <Link
                to="/publishers"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Publishers
              </Link>
            )}
            {ALLOWED_ROLES_PER_MODULE.sales.includes(userRole) && (
              <Link
                to="/sales"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Sales
              </Link>
            )}
            {ALLOWED_ROLES_PER_MODULE.store.includes(userRole) && (
              <Link
                to="/sales"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Store
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <button
              className="text-gray-700 hover:text-red-600 transition"
              onClick={signOut}
            >
              <IconFactory icon={Icon.SIGN_OUT} />
            </button>
          </div>
        </nav>
      </header>
      {children}
    </div>
  )
}
