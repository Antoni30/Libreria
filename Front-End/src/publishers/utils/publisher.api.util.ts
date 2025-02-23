import { Publisher } from '../types/publisher'
import { PublisherDTO } from '../types/publisher.api'

export function mapPublisherDTO(publisherDTO: PublisherDTO): Publisher {
  return {
    address: publisherDTO.address,
    email: publisherDTO.email,
    id: publisherDTO.id,
    name: publisherDTO.name,
    phone: publisherDTO.phone,
  }
}
