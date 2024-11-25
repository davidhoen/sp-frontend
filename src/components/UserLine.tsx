"use client"

import { getYouOrFullName } from "@/lib"
import { useUser } from "@/providers/UserProvider"
import { UserType } from "@/types/User"
import { BadgeCheckIcon, MessageCircleIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import RequestEndorsementModal from "./Modals/RequestEndorsementModal"
import RequestFeedbackModal from "./Modals/RequestFeedbackModal"
import UserAvatar from "./UserAvatar"
import { Button } from "./ui/button"

export default function UserLine({ user }: { user: UserType, }) {
    const t = useTranslations("general")
    const { user: currentUser } = useUser()

    const isTeacher = user.role.is_teacher

    return (
        <div className="flex justify-between border-2 rounded-md p-1 w-full">
            {/* Picture and name */}
            <div className="flex items-center gap-2">
                <UserAvatar user={user} />
                <span className="font-medium">{getYouOrFullName(user, t, currentUser)}</span>
            </div>

            {/* User actions  */}
            {/* Add actions for all users other then the current logged in user */}
            {user.id !== currentUser?.id &&
                <div className="flex items-center gap-2">
                    {/* Add feedback */}
                    <RequestFeedbackModal requestFromUser={user}>
                        <Button variant="outline" className="px-0.5" size="icon">
                            <MessageCircleIcon className="" strokeWidth={2.5} size={18} />
                        </Button>
                    </RequestFeedbackModal>

                    {/* Request endorsement */}
                    {/* Only teachers can provide a endorsement, so only show the button when its a teacher */}
                    {isTeacher && <RequestEndorsementModal requestFromUser={user}>
                        <Button variant="outline" className="px-0.5" size="icon">
                            <BadgeCheckIcon className="" strokeWidth={2.5} size={18} />
                        </Button>
                    </RequestEndorsementModal>}
                </div>
            }
        </div>
    )
}
