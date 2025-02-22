import { PublisherApiResponse } from '../types/publisher'

export function isPublisherApiResponse(
  object: unknown
): object is PublisherApiResponse {
  const apiResponse = object as PublisherApiResponse
  return apiResponse.error !== undefined || apiResponse.message !== undefined
}
