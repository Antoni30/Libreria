export interface User {
    id_user:string
    id_user_role: number
    user_fullname: string
    user_email: string
    user_password: string
    user_phone: string
    id_firebase: string
  }
  
  export interface SearchParams {
    email: string | null
    fullname: string | null
  }
  
  