import { Navigate, Outlet } from 'react-router'
import { UserRole } from '../enums/user.enum'
import { useAuth } from '../hooks/useAuth'
import { Layout } from '../../shared/components/Layout'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth()
  if (!user) return <Navigate to={'/login'} replace />

  if (!allowedRoles.includes(user.role))
    return <Navigate to={'/unauthorized'} replace />

  return (
    <Layout userRole={user.role}>
      <Outlet />
    </Layout>
  )
}
