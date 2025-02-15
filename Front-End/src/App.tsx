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
  routesPath,
} from './shared/constants/routesPermissions'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={routesPath.login.absolute} replace />}
        />
        <Route path={routesPath.login.relative} element={<Login />} />
        <Route path={routesPath.register.relative} element={<Register />} />
        <Route
          path={routesPath.unauthorized.relative}
          element={<Unauthorized />}
        />
        <Route
          path={routesPath.dashboard.relative}
          element={
            <ProtectedRoute allowedRoles={ALLOWED_ROLES_PER_MODULE.dashboard} />
          }
        >
          <Route index element={<Welcome />} />
        </Route>
        <Route
          path={routesPath.store.relative}
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
