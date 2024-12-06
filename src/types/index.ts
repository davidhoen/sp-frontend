import { useTranslations } from "next-intl"
import { UserType } from "./auth"

export type NavItem = {
  title: string
  url: string
  icon: string,
  isActive?: boolean
}

export type TranslationFunction = ReturnType<typeof useTranslations>;

export type ProfileType = {
  id: string
  title: string
  desc: string
  icon: string,
  color: string,
  created_by: UserType
  created_at: Date
}

export type CompetencyType = {
  id: string
  title: string
  desc: string
  overview: string
  feedbacks_count?: number
  endorsements_count?: number
  skills: SkillType[]
  profiles: ProfileType[]
  created_at: Date
}

export type SkillType = {
  id: string
  title: string
  desc?: string
  groups_count: number
  is_added: boolean
  competency: CompetencyType
  created_at: Date
  ratings: RatingHistoryType[]
}

export type GroupType = {
  id: string
  name: string
  desc: string
  teachers: UserType[]
  students: UserType[]
  skills: SkillType[]
  created_by: UserType
  closed_at?: Date
  created_at: Date
}

export type FeedbackType = {
  id: string
  user: UserType
  created_at: Date
  title: string
  content: string
}

export type EndorsementType = {
  id: string
  user: UserType
  title: string
  content: string
  rating: number
  skill: SkillType
  is_approved: boolean
  created_by: UserType
  created_at: Date
}

export type RatingHistoryType = {
  rating: number
  created_at: Date
}

export type TimeLineItemType = {
  type: TimeLineItemTypeEnum,
  created_at: Date,
  endorsement?: EndorsementType,
  feedback?: FeedbackType,
  ratingUpdate?: RatingHistoryType
}

export enum TimeLineItemTypeEnum {
  Feedback,
  Endorsement,
  RatingUpdate
}

export type SkillsQueryType = {
  page: string,
  search: string,
  competencies: string,
  is_added: string
}

export type EndorsementRequestType = {
  id: string;
  title: string;
  skill: SkillType;
  requester: UserType
}

export type GroupsQueryType = {
  page: string,
  search: string,
  is_joined: string
}

export type NotificationType = {
  id: string,
  type: NotificationTypeEnum,
  requester?: UserType,
  requestee_name?: string,
  skill: {
    id: string,
    title: string
  },
}

export enum NotificationTypeEnum {
  FeedbackRequest = "feedbackRequest",
  FeedbackReceived = "feedbackReceived",
  EndorsementRequest = "endorsementRequest",
  EndorsementReceived = "endorsementReceived",
  EndorsementReviewed = "endorsementReviewed",
}