import {
  AddPublisherDTO,
  EditPublisherDTO,
  Publisher,
} from '../types/publisher'
import PublishersMock from '../mocks/publishers.json'

async function getPublishersSimulated() {
  return new Promise<Publisher[]>((resolve) => {
    setTimeout(() => {
      resolve(PublishersMock)
    }, 2000)
  })
}

async function getPublisherByIdSimulated(id: number) {
  const publisherFound = PublishersMock.find((publisher) => publisher.id === id)
  return new Promise<Publisher | undefined>((resolve) => {
    setTimeout(() => {
      resolve(publisherFound)
    }, 2000)
  })
}

async function deletePublishersSimulated(id: number) {
  const publisherDeleted = PublishersMock.find((element) => element.id === id)

  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(publisherDeleted !== undefined)
    }, 2000)
  })
}

async function addPublishersSimulated(publisher: AddPublisherDTO) {
  const publisherExist = PublishersMock.find(
    (element) => element.name.toLowerCase() === publisher.name.toLowerCase()
  )

  return new Promise<Publisher | undefined>((resolve) => {
    setTimeout(() => {
      if (publisherExist) {
        resolve(undefined)
      } else {
        resolve({ ...publisher, id: 100 })
      }
    }, 2000)
  })
}

async function editPublishersSimulated(publisherUpdated: EditPublisherDTO) {
  const publisherExist = PublishersMock.find(
    (element) => element.id === publisherUpdated.id
  )

  return new Promise<Publisher | undefined>((resolve) => {
    setTimeout(() => {
      if (!publisherExist) {
        resolve(undefined)
      } else {
        resolve({ ...publisherUpdated, name: publisherExist.name })
      }
    }, 2000)
  })
}

export async function getPublishersService(): Promise<Publisher[]> {
  return getPublishersSimulated()
}

export async function getPublisherByIdService(
  id: number
): Promise<Publisher | undefined> {
  return getPublisherByIdSimulated(id)
}

export async function deletePublisherService(id: number): Promise<boolean> {
  return deletePublishersSimulated(id)
}

export async function addPublisherService(
  publisher: AddPublisherDTO
): Promise<Publisher | undefined> {
  return addPublishersSimulated(publisher)
}

export async function editPublisherService(
  publisher: EditPublisherDTO
): Promise<Publisher | undefined> {
  return editPublishersSimulated(publisher)
}
