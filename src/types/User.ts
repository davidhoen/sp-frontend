export interface UserType {
  id: string
  email: string
  first_name: string
  last_name: string
  role_id?: string
  image?: string
  role: Role
  personal_coach?: UserType
}

export type Role = {
  id: string
  name: string
  is_teacher: boolean
  is_head_teacher: boolean
}
