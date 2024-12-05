"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useUser } from "@/providers/UserProvider"
import { NotificationType, NotificationTypeEnum, TranslationFunction } from "@/types"
import { BadgeCheckIcon, MessageCircleIcon, MessageCircleQuestionIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const getNotificationIcon = (type: NotificationTypeEnum) => {
    switch (type) {
        case NotificationTypeEnum.FeedbackReceived:
            return MessageCircleIcon
        case NotificationTypeEnum.FeedbackRequest:
            return MessageCircleQuestionIcon
        case NotificationTypeEnum.EndorsementReceived:
        case NotificationTypeEnum.EndorsementRequest:
        case NotificationTypeEnum.EndorsementReviewed:
            return BadgeCheckIcon
        default:
            return MessageCircleIcon
    }
}

const getNotificationHref = (notification: NotificationType, t: TranslationFunction, needsTeacherRouting: boolean) => {
    switch (notification.type) {
        case NotificationTypeEnum.FeedbackReceived:
            return { pathname: `/student/skills/${notification.skill.id}`, hash: t("feedbacks") }
        case NotificationTypeEnum.FeedbackRequest:
            if (needsTeacherRouting) return { pathname: `/teacher/requests`, hash: t("feedbacks") }
            else return "/student/requests"
        case NotificationTypeEnum.EndorsementReceived:
        case NotificationTypeEnum.EndorsementReviewed:
            return { pathname: `/student/skills/${notification.skill.id}`, hash: t("endorsements") }
        case NotificationTypeEnum.EndorsementRequest:
            return { pathname: `/teacher/requests`, hash: t("endorsements") }
        default:
            return "/"
    }
}

export default function Notification({ notification, needsTeacherRouting }: { notification: NotificationType, needsTeacherRouting: boolean }) {
    const t = useTranslations("general")

    const Icon = getNotificationIcon(notification.type)
    const href = getNotificationHref(notification, t, needsTeacherRouting)
    const color = notification.type.includes("endorsement") ? "text-success" : "text-primary"

    return (
        <DropdownMenuItem key={notification.id}>
            <Link href={href}>
                <div className="flex gap-2">
                    <div className="pt-1">
                        <Icon strokeWidth={2.5} size={16} className={color} />
                    </div>
                    <div>
                        <span className="font-bold">{notification.requestee_name}</span> {t(`notifications.${notification.type}`)} <span className={cn("font-bold", color)}>{notification.skill.title}</span>
                    </div>
                </div>
            </Link>
        </DropdownMenuItem>
    )
}
