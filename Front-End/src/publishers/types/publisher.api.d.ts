export interface PublisherDTO {
  id: number
  name: string
  address: string
  phone: string
  email: string
}

interface SuccessfulResponse<T> {
  message: string
  data: T
  error: undefined
}

interface UnsuccessfulResponse {
  message: undefined
  data: undefined
  error: string
}

export type GetPublishersResponse =
  | SuccessfulResponse<PublisherDTO[]>
  | UnsuccessfulResponse

export type GetPublisherByIdResponse =
  | SuccessfulResponse<PublisherDTO>
  | UnsuccessfulResponse

export type DeletePublisherResponse =
  | SuccessfulResponse<PublisherDTO>
  | UnsuccessfulResponse

export type PostPublisherResponse =
  | SuccessfulResponse<PublisherDTO>
  | UnsuccessfulResponse

export type PutPublisherResponse =
  | SuccessfulResponse<PublisherDTO>
  | UnsuccessfulResponse
