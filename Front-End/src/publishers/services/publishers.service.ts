import { Publisher } from '../types/publishers'
import PublishersMock from '../mocks/publishers.json'

async function getPublishersSimulated() {
  return new Promise<Publisher[]>((resolve) => {
    setTimeout(() => {
      resolve(PublishersMock)
    }, 2000)
  })
}

export async function getPublishersService(): Promise<Publisher[]> {
  const publishers = await getPublishersSimulated()
  return publishers
}
