import { useEffect, useState } from 'react'
import { Publisher } from '../types/publishers'
import {
  deletePublisherService,
  getPublishersService,
} from '../services/publishers.service'

export function usePublishers() {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [publisherIdDeleting, setPublisherIdDeleting] = useState<number | null>(
    null
  )

  const deletePublisher = async (id: number) => {
    setPublisherIdDeleting(id)
    const isPublisherDeleted = await deletePublisherService(id)

    if (!isPublisherDeleted) {
      setError('An error occurred while trying to delete the publisher')
    } else {
      setPublishers((publishers) => {
        return publishers.filter((publisher) => publisher.id !== id)
      })
    }

    setPublisherIdDeleting(null)
  }

  useEffect(() => {
    void getPublishersService().then((publishers) => {
      setPublishers(publishers)
      setIsLoading(false)
    })
  }, [])

  return { publishers, isLoading, error, publisherIdDeleting, deletePublisher }
}
