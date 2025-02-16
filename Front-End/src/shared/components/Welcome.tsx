import { useAuth } from '../../auth/hooks/useAuth'
import { getTextFromUserRole } from '../../auth/utils/user.util'

export function Welcome() {
  const { user } = useAuth()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {user && getTextFromUserRole(user?.role)} Dashboard
        </h1>
        <p className="text-lg text-gray-600 mt-4">Welcome, {user?.fullname}!</p>
      </div>
    </div>
  )
}
