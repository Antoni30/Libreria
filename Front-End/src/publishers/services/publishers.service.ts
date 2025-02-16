import { Publisher } from '../types/publishers'
import PublishersMock from '../mocks/publishers.json'

async function getPublishersSimulated() {
  return new Promise<Publisher[]>((resolve) => {
    setTimeout(() => {
      resolve(PublishersMock)
    }, 2000)
  })
}

async function deletePublishersSimulated(id: number) {
  const publisherDeleted = PublishersMock.find((element) => element.id === id)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(publisherDeleted)
    }, 2000)
  })
}

export async function getPublishersService(): Promise<Publisher[]> {
  const publishers = await getPublishersSimulated()
  return publishers
}

export async function deletePublisherService(id: number): Promise<boolean> {
  const publisherDeleted = await deletePublishersSimulated(id)
  return publisherDeleted !== undefined
}
