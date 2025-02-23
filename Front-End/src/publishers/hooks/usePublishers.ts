import { useEffect, useState } from 'react'
import { Publisher } from '../types/publisher'
import { getPublishers } from '../services/publisher.service'

export function usePublishers() {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)

    void getPublishers()
      .then((publishers) => {
        setPublishers(publishers)
        setIsLoading(false)
      })
      .catch(() => setError('An error occur trying to retrieve the publishers'))
  }, [])

  return { publishers, isLoading, error }
}
