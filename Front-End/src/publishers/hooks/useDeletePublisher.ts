import { useEffect, useState } from 'react'
import { deletePublisher as deletePublisherService } from '../services/publisher.service'

export function useDeletePublisher() {
  const [error, setError] = useState('')
  const [idDeleting, setIdDeleting] = useState<number | undefined>()

  const deletePublisher = (id: number) => {
    setIdDeleting(id)

    deletePublisherService(id)
      .then((isPublisherDeleted) => {
        if (!isPublisherDeleted) {
          setError('Publisher cant be deleted')
        }
      })
      .catch(() => {
        setError('An error occurred while trying to delete the publisher')
      })
      .finally(() => {
        setIdDeleting(undefined)
      })
  }

  useEffect(() => {
    if (!error.length) return

    setTimeout(() => {
      setError('')
    }, 2500)
  }, [error])

  return {
    error,
    idDeleting,
    deletePublisher,
  }
}
