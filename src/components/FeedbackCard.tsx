import { UserType } from "@/types/User"
import UserAvatar from "./UserAvatar"
import { FeedbackType } from "@/types"
import { useFormatter, useTranslations } from "next-intl"

export function FeedbackCard({ feedback, user }: { feedback: FeedbackType; user: UserType }) {
  const t = useTranslations("general")
  const format = useFormatter()
  return (
    <div className="border rounded-lg p-4">
      {/* Header */}
      <div className="flex mb-2 justify-between">
        <div className="flex gap-4">
          <UserAvatar user={user} />
          <div>
            {/* User name or "you" when viewing on feedback */}
            <span className="font-semibold">{feedback.user.id === user.id ? t("you") : feedback.user.name}</span>
            {/* Role */}
            <p className="text-sm text-muted-foreground">{feedback.user.role}</p>
          </div>
        </div>
        {/* Date */}
        <p className="text-muted-foreground text-sm">{format.dateTime(feedback.created_at, { year: "numeric", month: "short", day: "numeric" })}</p>
      </div>
      {/* Content */}
      <div>
        <span className="font-sans font-bold text-lg">{feedback.event.title}</span>
        <p>{feedback.content}</p>
      </div>
    </div>
  )
}
