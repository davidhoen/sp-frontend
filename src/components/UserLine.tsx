"use client"

import { getYouOrFullName, isTeacherUser } from "@/lib"
import { useUser } from "@/providers/UserProvider"
import { UserType } from "@/types/auth"
import { BadgeCheckIcon, MessageCircleIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import RequestEndorsementModal from "./Modals/Student/RequestEndorsementModal"
import RequestFeedbackModal from "./Modals/Student/RequestFeedbackModal"
import UserAvatar from "./UserAvatar"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function UserLine({ user, groupId, hideActions, className }: { user: UserType, groupId?: string, hideActions?: boolean, className?: string }) {
    const t = useTranslations("general")
    const { user: currentUser } = useUser()

    return (
        <div className={cn("flex justify-between border-2 rounded-lg py-1 px-2 w-full", className)}>
            {/* Picture and name */}
            <div className="flex items-center gap-2">
                <UserAvatar user={user} />
                <span className="font-medium">{getYouOrFullName(user, t, currentUser)}</span>
            </div>

            {/* User actions  */}
            {/* Add actions for all users other then the current logged in user   */}
            {(!hideActions && user.id !== currentUser?.id) &&
                <div className="flex items-center gap-2">
                    {/* Add feedback */}
                    <RequestFeedbackModal requestFromUser={user} groupId={groupId}>
                        <Button variant="outline" className="px-0.5" size="icon">
                            <MessageCircleIcon className="" strokeWidth={2.5} size={18} />
                        </Button>
                    </RequestFeedbackModal>

                    {/* Request endorsement */}
                    {/* Only teachers can provide a endorsement, so only show the button when its a teacher */}
                    {isTeacherUser(user) && <RequestEndorsementModal requestFromUser={user} groupId={groupId}>
                        <Button variant="outline" className="px-0.5" size="icon">
                            <BadgeCheckIcon className="" strokeWidth={2.5} size={18} />
                        </Button>
                    </RequestEndorsementModal>}
                </div>
            }
        </div>
    )
}
