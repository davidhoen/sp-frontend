"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUser } from "@/providers/UserProvider"
import { NotificationType, NotificationTypeEnum } from "@/types"
import { BellIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { v4 } from "uuid"
import { Button } from "../ui/button"
import Notification from "./Notification"
import { useNotifications } from "@/hooks/use-notifications"

export default function Notifications() {
  const t = useTranslations("general.notifications")
  const { user } = useUser()

  // When a teacher clicks on the notification, they should be taken to the requests page
  const needsTeacherRouting = user?.is_teacher || user?.is_head_teacher || user?.is_admin || false

  let { data: notifications } = useNotifications()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="relative" aria-label={`${notifications?.length} notifications`}>
          <BellIcon className="h-6 w-6" />
          {/* Number of notifications */}
          {(notifications && notifications?.length > 0) && (
            <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notifications?.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {notifications && notifications?.length > 0 ? (
          notifications.map((notification) => <Notification key={notification.id} notification={notification} needsTeacherRouting={needsTeacherRouting} />)
        ) : (
          <p className="text-xs px-2 pb-2">{t("noNotificationsDescription")}</p>
        )}

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
