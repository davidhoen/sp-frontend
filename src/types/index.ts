import { LucideIcon } from "lucide-react"
import { UserType } from "./User"

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

export type FeedbackType = {
  id: number
  user: UserType
  created_at: Date
  event: EventType
  content: string
}

export type EventType = {
  id: number
  title: string
}
