import { useEffect, useState } from 'react'
import { Publisher } from '../types/publishers'
import { getPublishersService } from '../services/publishers.service'

export function usePublishers() {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const deletePublisher = (id: number) => {
    setPublishers((publishers) => {
      return publishers.filter((publisher) => publisher.id !== id)
    })
  }

  useEffect(() => {
    void getPublishersService().then((publishers) => {
      setPublishers(publishers)
      setIsLoading(false)
    })
  }, [])

  return { publishers, isLoading, deletePublisher }
}
