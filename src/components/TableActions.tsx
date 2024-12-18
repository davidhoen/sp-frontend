"use client"

import { cn } from "@/lib/utils";
import { CircleDashedIcon, EyeIcon, LucideIcon, PencilLineIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function TableAction({ label, icon = CircleDashedIcon, type }: { label?: string, icon?: LucideIcon, type?: "edit" | "delete" | "view" }) {
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
  const Icon = icon

  return <div className={cn("flex items-center gap-2 p-0.5 rounded-full bg-border cursor-pointer")}>
    <div className="p-1.5 bg-background rounded-full">
      <Icon size={16} strokeWidth={2.5} />
    </div>
    <span className="font-medium mr-3">{label}</span>
  </div>
}
