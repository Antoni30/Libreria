import { useEffect, useState } from 'react'
import { Publisher } from '../types/publisher'
import { getPublisherByIdService } from '../services/publisher.service'

export function usePublisher({ id }: { id?: number }) {
  const [isLoading, setIsLoading] = useState(false)
  const [publisher, setPublisher] = useState<Publisher>()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    setIsLoading(true)

    getPublisherByIdService(id)
      .then((publisher) => setPublisher(publisher))
      .catch(() => {
        setError('Publisher not found')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return {
    publisher,
    isLoading,
    error,
  }
}
