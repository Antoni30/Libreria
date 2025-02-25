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
import { Books } from './books/screens/Books'
import { Publishers } from './publishers/screens/Publishers'
import { Sales } from './sales/screens/Sales'
import { Users } from './users/screens/Users'
import { AddPublisher } from './publishers/screens/AddPublisher'
import { EditPublisher } from './publishers/screens/EditPublisher'
import { EditUser } from './users/screens/EditUser'
import { DeleteUser } from './users/screens/DeleteUser'
import { AddBook } from './books/screens/AddBook'
import { EditBook } from './books/screens/EditBook'

import {InfoBooks} from './store/screens/InfoBooks'

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
          <Route path={ROUTES_PATH.store.view.relative} element={<InfoBooks />} />

        </Route>

        <Route
          path={ROUTES_PATH.books.relative}
          element={
            <ProtectedRoute allowedRoles={ALLOWED_ROLES_PER_MODULE.books} />
          }
        >
          <Route index element={<Books />} />
          <Route path={ROUTES_PATH.books.add.relative} element={<AddBook />} />
          <Route
            path={ROUTES_PATH.books.edit.relative}
            element={<EditBook />}
          />
        </Route>

        <Route
          path={ROUTES_PATH.publishers.relative}
          element={
            <ProtectedRoute
              allowedRoles={ALLOWED_ROLES_PER_MODULE.publishers}
            />
          }
        >
          <Route index element={<Publishers />} />
          <Route
            path={ROUTES_PATH.publishers.add.relative}
            element={<AddPublisher />}
          />
          <Route
            path={ROUTES_PATH.publishers.edit.relative}
            element={<EditPublisher />}
          />
        </Route>

        <Route
          path={ROUTES_PATH.sales.relative}
          element={
            <ProtectedRoute allowedRoles={ALLOWED_ROLES_PER_MODULE.sales} />
          }
        >
          <Route index element={<Sales />} />
        </Route>

        <Route
          path={ROUTES_PATH.users.relative}
          element={
            <ProtectedRoute allowedRoles={ALLOWED_ROLES_PER_MODULE.users} />
          }
        >
          <Route index element={<Users />} />
          <Route
            path={ROUTES_PATH.users.edit.relative}
            element={<EditUser />}
          />
          <Route
            path={ROUTES_PATH.users.delete.relative}
            element={<DeleteUser />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
