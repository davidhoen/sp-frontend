"use client"

import { useUser } from "@/providers/UserProvider"
import { SkillType } from "@/types"
import { CompetencyType } from "@/types"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { ConfirmActionDialog } from "../Modals/ConfirmActionModal"
import UpsertSkillModal from "../Modals/Teacher/UpsertSkillModal"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
import { Link } from "@/i18n/routing"

export default function SkillRow({ skill }: { skill: SkillType }) {
    const { user } = useUser()
    const t = useTranslations("general")

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const deleteSkill = (skillId: string) => {
        console.log("Delete skill with id: ", skillId)
        setIsDeleteModalOpen(false)
    }

    return <>
        <TableRow>
            {/* SKill */}
            <TableCell>{skill.title}</TableCell>
            {/* Competence */}
            <TableCell>{skill.competency.title}</TableCell>
            {/* Number of Groups */}
            <TableCell>{skill.groups_count}</TableCell>
            {/* Actions */}
            <TableCell className="flex gap-2">

                {/* Edit */}
                <UpsertSkillModal skill={skill}>
                    <div><TableAction type="edit" /></div>
                </UpsertSkillModal>

                {/* Delete (for admins) */}
                {!user?.is_admin && <div onClick={() => setIsDeleteModalOpen(true)}><TableAction type="delete" /></div>}

                {/* View */}
                <Link href={`/teacher/skills/${skill.id}`}>
                    <TableAction type="view" />
                </Link>
            </TableCell>
        </TableRow>

        {/* Delete group modal */}
        <ConfirmActionDialog
            onContinue={() => deleteSkill(skill.id)}
            onCancel={() => setIsDeleteModalOpen(false)}
            isOpen={isDeleteModalOpen}
            description={t("confirmDeleteEntity", { entity: t("skill").toLowerCase() })}
        />
    </>

}
