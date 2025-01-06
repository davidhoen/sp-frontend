'use client'

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Link, useRouter } from "@/i18n/routing"
import { getFullName } from "@/lib"
import { NotificationType, NotificationTypeEnum, TranslationFunction } from "@/types"
import { BadgeCheckIcon, MessageCircleIcon, MessageCircleQuestionIcon } from 'lucide-react'
import { useTranslations } from "next-intl"
import RichText from "../RichText"
import axiosInstance from "@/lib/axios"
import { mutate } from "swr"

// Configuration object for notification types
const notificationConfig = {
    // Teacher or student received feedback request
    [NotificationTypeEnum.FeedbackRequest]: {
        icon: MessageCircleQuestionIcon,
        getHref: (notification: NotificationType, t: TranslationFunction, isTeacher: boolean) =>
            isTeacher ? { pathname: `/teacher/requests`, hash: t("feedbacks") } : "/student/requests",
        color: "text-primary",
        getContent: (notification: NotificationType, t: TranslationFunction) =>
            <RichText>
                {(chunks) => t.rich(`notifications.feedbackRequest`, {
                    ...chunks,
                    requester: notification.requester ? getFullName(notification.requester) : "Unknown",
                    skillName: notification.skill?.title
                })}
            </RichText>
    },
    // Student received feedback
    [NotificationTypeEnum.FeedbackReceived]: {
        icon: MessageCircleIcon,
        color: "text-primary",
        getHref: (notification: NotificationType, t: TranslationFunction) => ({
            pathname: `/student/skills/${notification.skill.id}`,
            hash: t("feedbacks")
        }),
        getContent: (notification: NotificationType, t: TranslationFunction) =>
            <RichText>
                {(chunks) => t.rich(`notifications.feedbackReceived`, {
                    ...chunks,
                    requestee: notification.requestee_name,
                    skillName: notification.skill?.title
                })}
            </RichText>
    },
    // Teacher received endorsement request
    [NotificationTypeEnum.EndorsementRequest]: {
        icon: BadgeCheckIcon,
        getHref: (notification: NotificationType, t: TranslationFunction) => ({
            pathname: `/teacher/requests`,
            hash: t("endorsements")
        }),
        color: "text-success",
        getContent: (notification: NotificationType, t: TranslationFunction) =>
            <RichText>
                {(chunks) => t.rich(`notifications.endorsementRequest`, {
                    ...chunks,
                    requester: notification.requester ? getFullName(notification.requester) : "Unknown",
                    skillName: notification.skill?.title
                })}
            </RichText>
    },
    // Teacher received endorsement request review
    [NotificationTypeEnum.EndorsementRequestReview]: {
        icon: BadgeCheckIcon,
        getHref: (notification: NotificationType, t: TranslationFunction) => ({
            pathname: `/student/skills/${notification.skill?.id}`,
            hash: t("endorsements")
        }),
        color: "text-success",
        getContent: (notification: NotificationType, t: TranslationFunction) => <RichText>
            {(chunks) => t.rich(`notifications.endorsementRequestReview`, {
                ...chunks,
                student: notification.requester ? getFullName(notification.requester) : "Unknown",
                requestee: notification.requestee_name
            })}
        </RichText>
    },
    // Student received endorsement
    [NotificationTypeEnum.EndorsementReceived]: {
        icon: BadgeCheckIcon,
        getHref: (notification: NotificationType, t: TranslationFunction) => ({
            pathname: `/student/skills/${notification.skill?.id}`,
            hash: t("endorsements")
        }),
        color: "text-success",
        getContent: (notification: NotificationType, t: TranslationFunction) =>
            <RichText>
                {(chunks) => t.rich(`notifications.endorsementReceived`, {
                    ...chunks,
                    requestee: notification.requestee_name,
                    skillName: notification.skill?.title
                })}
            </RichText>
    },
    // Teacher reviewed (external) endorsement request 
    [NotificationTypeEnum.EndorsementReviewed]: {
        icon: BadgeCheckIcon,
        getHref: (notification: NotificationType, t: TranslationFunction) => ({
            pathname: `/student/skills/${notification.skill?.id}`,
            hash: t("endorsements")
        }),
        color: "text-success",
        getContent: (notification: NotificationType, t: TranslationFunction) => {
            const reviewer: string = notification?.endorsement?.data?.approved_by ? getFullName(notification.endorsement.data.approved_by) : "Unknown"
            return <RichText>
                {(chunks) => t.rich(`notifications.endorsementReviewed`, {
                    ...chunks,
                    reviewer,
                    skillName: notification.skill?.title
                })}
            </RichText>
        }
    },
}

export default function Notification({ notification, needsTeacherRouting }: { notification: NotificationType, needsTeacherRouting: boolean }) {
    const t = useTranslations("general")
    const { push } = useRouter()

    const config = notificationConfig[notification.type]
    if (!config) {
        console.error(`Unknown notification type: ${notification.type}`)
        return null
    }

    const Icon = config.icon
    const href = config.getHref(notification, t, needsTeacherRouting)
    const content = config.getContent(notification, t)

    const markAsRead = async () => {
        try {
            await axiosInstance.get(`/api/notifications/${notification.id}/read`)
            await mutate("/api/notifications")
            push(href)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <DropdownMenuItem key={notification.id} onClick={markAsRead} asChild>
            <div className="flex gap-2">
                <div className="pt-1">
                    <Icon strokeWidth={2.5} size={16} className={config.color} />
                </div>
                <div>{content}</div>
                {!notification.read_at && <div className="bg-destructive p-1 rounded-full"></div>}
            </div>
        </DropdownMenuItem>
    )
}

