import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { Login } from './auth/screens/Login'
import { AuthProvider } from './auth/components/AuthProvider'
import { ProtectedRoute } from './auth/components/ProtectedRoute'
import { UserRole } from './auth/enums/user.enum'
import { Unauthorized } from './shared/screens/Unauthorized'
import { NotFound } from './shared/screens/NotFound'
import { Register } from './auth/screens/Register'
import { Store } from './store/screens/Store'
import { Welcome } from './shared/components/Welcome'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route
          path="admin"
          element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}
        >
          <Route index element={<Welcome />} />
        </Route>
        <Route
          path="librarian"
          element={<ProtectedRoute allowedRoles={[UserRole.LIBRARIAN]} />}
        >
          <Route index element={<Welcome />} />
        </Route>
        <Route
          path="client"
          element={<ProtectedRoute allowedRoles={[UserRole.CLIENT]} />}
        >
          <Route index element={<Welcome />} />
        </Route>
        <Route
          path="store"
          element={<ProtectedRoute allowedRoles={[UserRole.CLIENT]} />}
        >
          <Route index element={<Store />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
