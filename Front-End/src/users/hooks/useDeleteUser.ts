/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'
import { NavigateFunction } from 'react-router-dom'

export function useDeleteUser(
  userId?: string,
  setUser?: (user: null) => void, // ✅ Acepta null correctamente
  navigate?: NavigateFunction,
  user_UI?: string
) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!userId) return
    setDeleting(true)
    setError(null)
    try {
      const respodFB = await fetch(
        `http://localhost:2028/firebase/delete-user/${user_UI}`,
        { method: 'DELETE' }
      )
      const response = await fetch(`http://localhost:2028/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok && !respodFB.ok) throw new Error('Failed to delete user')

      setUser?.(null) // ✅ Eliminar usuario correctamente
      setError('User deleted successfully')
      setTimeout(() => navigate?.('/users', { replace: true }), 1500)
    } catch (error) {
      setError('Failed to delete user')
      console.error('Error deleting user:', error)
    } finally {
      setDeleting(false)
    }
  }

  return { handleDelete, deleting, error }
}
