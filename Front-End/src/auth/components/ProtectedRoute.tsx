import { Navigate, Outlet } from 'react-router'
import { UserRole } from '../../users/enums/user.enum'
import { useAuth } from '../hooks/useAuth'
import { Layout } from '../../shared/components/Layout'
import { ROUTES_PATH } from '../../shared/constants/routesPermissions'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth()
  if (!user) return <Navigate to={ROUTES_PATH.login.absolute} replace />

  if (!allowedRoles.includes(user.role))
    return <Navigate to={ROUTES_PATH.unauthorized.absolute} replace />

  return (
    <Layout userRole={user.role}>
      <Outlet />
    </Layout>
  )
}
