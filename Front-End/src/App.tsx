import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { Login } from './auth/screens/Login'
import { AuthProvider } from './auth/components/AuthProvider'
import { ProtectedRoute } from './auth/components/ProtectedRoute'
import { Unauthorized } from './shared/screens/Unauthorized'
import { NotFound } from './shared/screens/NotFound'
import { Register } from './auth/screens/Register'
import { Store } from './store/screens/Store'
import { Welcome } from './shared/components/Welcome'
import {
  ALLOWED_ROLES_PER_MODULE,
  ROUTES_PATH,
} from './shared/constants/routesPermissions'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={ROUTES_PATH.login.absolute} replace />}
        />
        <Route path={ROUTES_PATH.login.relative} element={<Login />} />
        <Route path={ROUTES_PATH.register.relative} element={<Register />} />
        <Route
          path={ROUTES_PATH.unauthorized.relative}
          element={<Unauthorized />}
        />
        <Route
          path={ROUTES_PATH.dashboard.relative}
          element={
            <ProtectedRoute allowedRoles={ALLOWED_ROLES_PER_MODULE.dashboard} />
          }
        >
          <Route index element={<Welcome />} />
        </Route>
        <Route
          path={ROUTES_PATH.store.relative}
          element={
            <ProtectedRoute allowedRoles={ALLOWED_ROLES_PER_MODULE.store} />
          }
        >
          <Route index element={<Store />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
