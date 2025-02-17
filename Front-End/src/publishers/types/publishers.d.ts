export interface Publisher {
  id: number
  name: string
  address: string
  phone: string
  email: string
}

export interface PublisherApiResponse {
  message?: string
  error?: string
  data?: Publisher | Publisher[]
}
