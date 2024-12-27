"use client"

import { useRouter } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { GroupType } from "@/types"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { ConfirmActionDialog } from "./Modals/ConfirmActionModal"
import { Button } from "./ui/button"

export default function ArchiveGroupButton({ group }: { group: GroupType }) {
    const t = useTranslations("general")
    const router = useRouter()
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false)

    const archiveGroup = async () => {
        try {
            const res = axiosInstance.put(`/api/teacher/groups/${group.id}`, {
                ...group,
                skills: group.skills?.map(skill => skill.id),
                teachers: group.teachers?.map(teacher => teacher.id),
                students: group.students?.map(student => student.id),
                archived_at: new Date()
            })
            await triggerPromiseToast(res, t, { success: t("successfullyDeleted") })
            router.refresh()
            setIsArchiveModalOpen(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {!group.archived_at && <Button className="rounded-full" onClick={() => setIsArchiveModalOpen(true)}>{t("archiveGroup")}</Button>}
            {/* Archive group modal */}
            <ConfirmActionDialog
                onContinue={() => archiveGroup()}
                onCancel={() => setIsArchiveModalOpen(false)}
                isOpen={isArchiveModalOpen}
                description={t("confirmArchiveGroup")}
            />
        </>
    )
}
