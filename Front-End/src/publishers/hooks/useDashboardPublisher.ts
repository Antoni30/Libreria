import { useEffect, useState } from 'react'
import { useDeletePublisher } from './useDeletePublisher'
import { usePublishers } from './usePublishers'
import { Publisher } from '../types/publisher'

export function useDashboardPublisher() {
  const { publishers } = usePublishers()
  const { message, deletePublisher: deletePublisherById } = useDeletePublisher()
  const [publishersDashboard, setPublishersDashboard] = useState<Publisher[]>()
  const [idDeleting, setIdDeleting] = useState<number | undefined>()

  const deletePublisher = (id: number) => {
    deletePublisherById(id)
    setIdDeleting(id)
  }

  useEffect(() => {
    if (!publishers || publishersDashboard) return
    setPublishersDashboard(publishers)
  }, [publishers, publishersDashboard])

  useEffect(() => {
    if (!idDeleting) return

    if (message.length) {
      setPublishersDashboard((publishers) => {
        if (!publishers) return
        return publishers.filter((publisher) => publisher.id !== idDeleting)
      })
      setIdDeleting(undefined)
    }
  }, [idDeleting, message])

  return { publishers: publishersDashboard, idDeleting, deletePublisher }
}
