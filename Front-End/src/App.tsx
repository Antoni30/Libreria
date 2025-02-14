import { Route, Routes } from 'react-router'
import './App.css'
import { Login } from './auth/screens/Login'

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  )
}

export default App
