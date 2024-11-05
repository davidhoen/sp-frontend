export interface UserType {
  id: number
  email: string
  first_name: string
  last_name: string
  role_id?: number
  image?: string
  role: Role
  personal_coach?: UserType
}

export type Role = {
  id: number
  name: string
  is_teacher: boolean
  is_head_teacher: boolean
}
