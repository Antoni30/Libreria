import {
  PostPublisherDTO,
  PutPublisherDTO,
  Publisher,
} from '../types/publisher'
import { isPublisher } from '../utils/publisher.util'
import { isPublisherApiResponse } from '../utils/publisher-api.util'

const PUBLISHER_API_PATH = 'http://localhost:2030/publishers'

/* async function getPublishersSimulated() {
  return new Promise<Publisher[]>((resolve) => {
    setTimeout(() => {
      resolve(PublishersMock)
    }, 2000)
  })
} */

/* async function getPublisherByIdSimulated(id: number) {
  const publisherFound = PublishersMock.find((publisher) => publisher.id === id)
  return new Promise<Publisher | undefined>((resolve) => {
    setTimeout(() => {
      resolve(publisherFound)
    }, 2000)
  })
} */

/* async function deletePublishersSimulated(id: number) {
  const publisherDeleted = PublishersMock.find((element) => element.id === id)

  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(publisherDeleted !== undefined)
    }, 2000)
  })
} */

/* async function addPublishersSimulated(publisher: PostPublisherDTO) {
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
} */

/* async function editPublishersSimulated(publisherUpdated: PutPublisherDTO) {
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
} */

export async function getPublishersService(): Promise<Publisher[]> {
  try {
    const response = await fetch(PUBLISHER_API_PATH)

    if (!response.ok) throw new Error('Cannot retrieve publishers')

    const json = (await response.json()) as unknown

    if (!isPublisherApiResponse(json))
      throw new Error('Response body doesnt match with expected response')

    if (json.error) throw new Error(json.error)

    const publishers = json.data as Publisher[]

    if (typeof publishers.length === 'number') {
      return publishers
    } else {
      throw new Error('Response data doesnt match with expected response')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return []
  }
}

export async function getPublisherByIdService(
  id: number
): Promise<Publisher | undefined> {
  try {
    const response = await fetch(`${PUBLISHER_API_PATH}/${id}`)

    if (!response.ok) throw new Error('Cannot retrieve publisher')

    const json = (await response.json()) as unknown

    if (!isPublisherApiResponse(json))
      throw new Error('Response body doesnt match with expected response')

    const publisher = json.data

    if (isPublisher(publisher)) {
      return publisher
    } else {
      throw new Error('Response data doesnt match with expected response')
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return
  }
}

export async function deletePublisherService(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${PUBLISHER_API_PATH}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error('Cannot retrieve publisher')

    const json = (await response.json()) as unknown

    if (!isPublisherApiResponse(json))
      throw new Error('Response body doesnt match with expected response')

    const publisherDeleted = json.data

    return isPublisher(publisherDeleted)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return false
  }
}

export async function addPublisherService(
  publisher: PostPublisherDTO
): Promise<Publisher | undefined> {
  try {
    const response = await fetch(PUBLISHER_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publisher),
    })

    if (!response.ok) throw new Error('Cannot retrieve publisher')

    const json = (await response.json()) as unknown

    if (!isPublisherApiResponse(json))
      throw new Error('Response body doesnt match with expected response')

    const publisherAdded = json.data
    if (!isPublisher(publisherAdded)) {
      return undefined
    }

    return publisherAdded
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return
  }
}

export async function editPublisherService(
  id: number,
  publisher: PutPublisherDTO
): Promise<Publisher | undefined> {
  try {
    const response = await fetch(`${PUBLISHER_API_PATH}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publisher),
    })

    if (!response.ok) throw new Error('Cannot retrieve publisher')

    const json = (await response.json()) as unknown

    if (!isPublisherApiResponse(json))
      throw new Error('Response body doesnt match with expected response')

    const publisherUpdated = json.data
    if (!isPublisher(publisherUpdated)) {
      return undefined
    }

    return publisherUpdated
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return
  }
}
