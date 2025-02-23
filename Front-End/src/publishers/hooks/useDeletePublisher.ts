import { useEffect, useState } from 'react'
import { deletePublisher as deletePublisherService } from '../services/publisher.service'

export function useDeletePublisher() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const deletePublisher = (id: number) => {
    setMessage('')
    setError('')
    setIsLoading(true)

    deletePublisherService(id)
      .then((isDeleted) => {
        if (isDeleted) {
          setMessage('Publisher deleted successfully')
        } else {
          setError(
            'Publisher cant be deleted because is associated with a book'
          )
        }
      })
      .catch(() => setError('Publisher cant be deleted'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (!error.length && !message.length) return

    setTimeout(() => {
      setError('')
      setMessage('')
    }, 2500)
  }, [error, message])

  return {
    message,
    isLoading,
    error,
    deletePublisher,
  }
}
