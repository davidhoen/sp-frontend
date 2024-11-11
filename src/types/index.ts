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

export type ProfileType = {
  id: number
  title: string
  desc: string
  icon: string,
  created_by: UserType
  created_at: Date
}

export type CompetencyType = {
  id: number
  title: string
  desc: string
  overview: string
  skills: SkillType[]
  profiles: ProfileType[]
  created_at: Date
}

export type SkillType = {
  id: number
  title: string
  desc?: string
  groups_count: number
  competency: CompetencyType
  is_added: boolean
  rating: RatingUpdateType[]
  created_at: Date
  ratings: Array<RatingHistoryType>
}

export type GroupType = {
  id: number
  name: string
  desc: string
  created_by: UserType
  closed_at: Date
  created_at: Date
}

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

export type RatingHistoryType = {
  rating: number
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

export type SkillsQueryType = {
  page: string,
  search: string,
  competencies: string,
  is_added: string
}