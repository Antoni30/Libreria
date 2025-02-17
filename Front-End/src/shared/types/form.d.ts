export interface FormState<T> {
  fields: { [K in keyof T]: FormField<T[K]> }
  isValid: boolean
}

export interface FormField<T> {
  value: T
  error: string
}
