import { AddPublisher, EditPublisher, Publisher } from '../types/publisher'
import {
  DeletePublisherResponse,
  GetPublisherByIdResponse,
  GetPublishersResponse,
  PostPublisherResponse,
  PutPublisherResponse,
} from '../types/publisher.api'
import { mapPublisherDTO } from '../utils/publisher.api.util'

const PUBLISHER_API_PATH = 'http://localhost:2030/publishers'

export async function getPublishers(): Promise<Publisher[]> {
  try {
    const response = await fetch(PUBLISHER_API_PATH)

    if (!response.ok) throw new Error('Cannot retrieve publishers')

    const jsonResponse = (await response.json()) as GetPublishersResponse

    if (jsonResponse.error !== undefined) throw new Error(jsonResponse.error)

    return jsonResponse.data.map((publisherDTO) =>
      mapPublisherDTO(publisherDTO)
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return []
  }
}

export async function getPublisherById(
  id: number
): Promise<Publisher | undefined> {
  try {
    const response = await fetch(`${PUBLISHER_API_PATH}/${id}`)

    if (!response.ok) throw new Error('Cannot retrieve publisher')

    const jsonResponse = (await response.json()) as GetPublisherByIdResponse

    if (jsonResponse.error !== undefined) return undefined

    return mapPublisherDTO(jsonResponse.data)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}

export async function deletePublisher(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${PUBLISHER_API_PATH}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error('Cannot retrieve publisher')

    const jsonResponse = (await response.json()) as DeletePublisherResponse
    const isPublisherDeleted = jsonResponse.message !== undefined

    return isPublisherDeleted
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }

    return false
  }
}

export async function postPublisher(
  publisher: AddPublisher
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

    const jsonResponse = (await response.json()) as PostPublisherResponse

    if (jsonResponse.error !== undefined) throw new Error(jsonResponse.error)

    const publisherAdded = jsonResponse.data

    return mapPublisherDTO(publisherAdded)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}

export async function putPublisher(
  id: number,
  publisher: EditPublisher
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

    const jsonResponse = (await response.json()) as PutPublisherResponse

    if (jsonResponse.error !== undefined) throw new Error(jsonResponse.error)

    const publisherUpdated = jsonResponse.data

    return mapPublisherDTO(publisherUpdated)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`)
    }
  }
}
