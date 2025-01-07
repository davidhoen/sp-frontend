"use client"

import { Link } from "@/i18n/routing"
import { hasPermission, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { SkillType } from "@/types"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { ConfirmActionDialog } from "../Modals/ConfirmActionModal"
import UpsertSkillModal from "../Modals/Teacher/UpsertSkillModal"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
import { RolesEnum } from "@/types/auth"

export default function SkillRow({ skill, mutate }: { skill: SkillType, mutate: () => void }) {
    const { user } = useUser()
    const t = useTranslations("general")

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const deleteSkill = async () => {
        try {
            const res = axiosInstance.delete(`/api/educator/skills/${skill.id}`,)
            await triggerPromiseToast(res, t, { success: t("successfullyDeleted") })
            mutate && mutate()
            setIsDeleteModalOpen(false)
        }
        catch (error) {
            console.error(error)
        }
    }

    return <>
        <TableRow>
            {/* SKill */}
            <TableCell>{skill.title}</TableCell>
            {/* Competency */}
            <TableCell>{skill.competency?.title}</TableCell>
            {/* Number of Groups */}
            <TableCell>{skill.groups_count}</TableCell>
            {/* Actions */}
            <TableCell className="flex gap-2">
                {/* Edit  */}
                {hasPermission(RolesEnum.HeadTeacher, user) && <UpsertSkillModal skill={skill} mutate={mutate}>
                    <div><TableAction type="edit" /></div>
                </UpsertSkillModal>}

                {/* Delete (for admins) */}
                {hasPermission(RolesEnum.Admin, user) && <div onClick={() => setIsDeleteModalOpen(true)}><TableAction type="delete" /></div>}

                {/* View */}
                <Link href={`/teacher/skills/${skill.id}`}>
                    <TableAction type="view" />
                </Link>
            </TableCell>
        </TableRow>

        {/* Delete skills modal */}
        <ConfirmActionDialog
            onContinue={() => deleteSkill()}
            onCancel={() => setIsDeleteModalOpen(false)}
            isOpen={isDeleteModalOpen}
            description={t("confirmDeleteEntity", { entity: t("skill").toLowerCase() })}
        />
    </>

}
