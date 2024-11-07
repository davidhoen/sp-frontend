import { LucideIcon } from "lucide-react"
import { UserType } from "./User"
import { useTranslations } from "next-intl"

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

export type TranslationFunction = ReturnType<typeof useTranslations>;

export type FeedbackType = {
  id: number
  user: UserType
  created_at: Date
  event: EventType
  content: string
}

export type EndorsementType = {
  id: number
  user: UserType
  event: EventType
  content: string
  rating: number
  is_approved: boolean
  created_by: UserType
  created_at: Date
}

export type RatingUpdateType = {
  id: number
  rating: number
  user: UserType
  is_approved: boolean
  created_at: Date
}

export type TimeLineItem = {
  type: TimeLineItemType,
  created_at: Date,
  endorsement?: EndorsementType,
  feedback?: FeedbackType,
  ratingUpdate?: RatingUpdateType
}

export enum TimeLineItemType {
  Feedback,
  Endorsement,
  RatingUpdate
}

export type EventType = {
  id: number
  title: string
}
