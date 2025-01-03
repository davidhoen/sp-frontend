"use client"

import { cn } from "@/lib/utils";
import { ArchiveIcon, CircleDashedIcon, EyeIcon, LucideIcon, MessageCircleReplyIcon, PencilLineIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function TableAction({ label, icon = CircleDashedIcon, type, resizes }: { label?: string, icon?: LucideIcon, type?: "edit" | "delete" | "view" | "archive" | "reply", resizes?: boolean }) {
  const t = useTranslations("general")

  if (type === "edit") {
    icon = PencilLineIcon
    label = t("edit")
  }
  else if (type === "delete") {
    icon = TrashIcon
    label = t("delete")
  }
  else if (type === "view") {
    icon = EyeIcon
    label = t("view")
  }
  else if (type === "archive") {
    icon = ArchiveIcon
    label = t("archive")
  }
  else if (type === "reply") {
    icon = MessageCircleReplyIcon
    label = t("reply")
  }
  const Icon = icon

  return <div className={cn("flex items-center gap-2 p-0.5 rounded-full bg-border cursor-pointer w-fit h-fit", resizes && "")}>
    <div className={cn("p-1.5 bg-background rounded-full", resizes && "bg-inherit sm:bg-background")}>
      <Icon size={16} strokeWidth={2.5} />
    </div>
    <span className={cn("font-medium mr-3", resizes && "hidden sm:block")}>{label}</span>
  </div>
}
