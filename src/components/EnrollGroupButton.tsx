"use client"

import { useRouter } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { GroupType } from "@/types"
import { useTranslations } from "next-intl"
import { Button } from "./ui/button"

export default function EnrollGroupButton({ group }: { group: GroupType }) {
    const t = useTranslations("general")

    const enrollGroup = async () => {
        try {
            const res = axiosInstance.get(`/api/student/groups/${group.id}/join`)
            await triggerPromiseToast(res, t)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Button onClick={enrollGroup}>
            {t("enrollForGroup")}
        </Button>
    )
}
