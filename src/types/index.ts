import { useTranslations } from "next-intl"
import { UserType } from "./auth"
import { EndorsementFormValues } from "@/schemas/zod"

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
  rating: number
}

export type GroupType = {
  id: string
  name: string
  desc: string
  teachers: UserType[]
  students?: UserType[]
  skills: SkillType[]
  students_count: number
  created_by: UserType
  closed_at?: Date
  created_at: Date
  archived_at?: Date
}

export type FeedbackType = {
  id: string
  created_by: UserType
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
  approved_at: Date
  data?: EndorsementFormValues & {
    approved_by: UserType
  }
  created_by: UserType
  created_at: Date
}

export type RatingType = {
  rating: number
  created_at: Date
}

export type TimeLineItemType = {
  type: TimeLineItemTypeEnum,
  created_at: Date,
  Endorsement?: EndorsementType,
  Feedback?: FeedbackType,
  Rating?: RatingType
}

export enum TimeLineItemTypeEnum {
  Feedback = "Feedback",
  Endorsement = "Endorsement",
  Rating = "Rating"
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

export type StudentGroupsQueryType = {
  page: string,
  search: string,
  is_joined: string
}

export type TeacherGroupsQueryType = {
  page: string,
  search: string,
  is_archived: string
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
  endorsement?: EndorsementType,
  read_at?: Date
}

export enum NotificationTypeEnum {
  FeedbackRequest = "FeedbackRequest", // Teacher or student received feedback request
  FeedbackReceived = "FeedbackReceived", // Student received feedback
  EndorsementRequest = "EndorsementRequest", // Teacher received endorsement request
  EndorsementRequestReview = "EndorsementRequestReview", // Teacher received endorsement request review 
  EndorsementReceived = "EndorsementReceived", // Student received endorsement
  EndorsementReviewed = "EndorsementReviewed", // Teacher reviewed (external) endorsement
}

export type StudentRequestType = {
  id: string,
  title: string,
  skill: SkillType,
  requester: UserType,
  group: GroupType,
  status: StudentRequestStatusEnum
  created_at: Date
  updated_at: Date
}

export enum StudentRequestStatusEnum {
  Pending = "pending",
  Accepted = "answered",
  Rejected = "declined",
}