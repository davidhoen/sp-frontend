export interface UserType {
  id: number
  email: string
  first_name: string
  last_name: string
  role_id?: number
  imageUrl?: string
  email_verified_at?: Date
  created_at: Date
  updated_at: Date
}
