import { FormState } from '../../shared/types/form'

export interface Publisher {
  id: number
  name: string
  address: string
  phone: string
  email: string
}

export type AddPublisherDTO = Omit<Publisher, 'id'>

export type AddPublisherForm = FormState<Omit<Publisher, 'id'>>

export type AddPublisherAction =
  | {
      type: 'set-address'
      payload: {
        address: string
      }
    }
  | {
      type: 'set-email'
      payload: {
        email: string
      }
    }
  | {
      type: 'set-name'
      payload: {
        name: string
      }
    }
  | {
      type: 'set-phone'
      payload: {
        phone: string
      }
    }
  | {
      type: 'submit'
    }
  | {
      type: 'reset'
    }

export type EditPublisherDTO = Publisher<Omit<Publisher, 'id'>>

export type EditPublisherForm = FormState<Omit<Publisher, 'id'>>

export type EditPublisherAction =
  | {
      type: 'set-address'
      payload: {
        address: string
      }
    }
  | {
      type: 'set-email'
      payload: {
        email: string
      }
    }
  | {
      type: 'set-phone'
      payload: {
        phone: string
      }
    }
  | {
      type: 'submit'
    }
  | {
      type: 'reset'
      payload?: {
        fieldsValues: Publisher
      }
    }

export interface PublisherApiResponse {
  error?: string
  message?: string
  data?: Publisher | Publisher[]
}
