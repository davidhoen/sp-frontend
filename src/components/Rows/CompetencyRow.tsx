"use client"

import { Link } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { CompetencyType } from "@/types"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Chip } from "../Chip"
import { ConfirmActionDialog } from "../Modals/ConfirmActionModal"
import UpsertCompetencyModal from "../Modals/Teacher/UpsertCompetencyModal"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"

export default function CompetencyRow({ competency, mutate }: { competency: CompetencyType, mutate: () => void }) {
    const { user } = useUser()
    const t = useTranslations("general")

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const deleteCompetency = async () => {
        try {
            const res = axiosInstance.delete(`/api/teacher/competencies/${competency.id}`,)
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
            {/* Name */}
            <TableCell>{competency.title}</TableCell>
            {/* Skills */}
            <TableCell>
                <div className="flex gap-2">
                    {competency.skills && competency.skills?.slice(0, 3).map(skill => <Link key={skill.id} href={`/teacher/skills/${skill.id}`}><Chip>{skill.title}</Chip></Link>)}
                    {/* Plus icon when more then one skill is connected */}
                    {(competency.skills && competency.skills.length > 3) && (
                        <div className="flex items-center h-fit gap-1 bg-border rounded-full text-xs p-1">
                            <span>+{competency.skills.length - 1}</span>
                        </div>
                    )}
                </div>
            </TableCell>
            {/* Profiles */}
            <TableCell>
                <div className="flex gap-2">
                    {competency.profiles && competency.profiles?.map(profile => <Link key={profile.id} href={`/teacher/profiles/${profile.id}`}><Chip>{profile.title}</Chip></Link>)}
                </div>
            </TableCell>
            {/* Actions */}
            <TableCell className="flex gap-2">
                {/* Edit */}
                <UpsertCompetencyModal competency={competency} mutate={mutate}>
                    <div><TableAction type="edit" /></div>
                </UpsertCompetencyModal>

                {/* Delete (for admins) */}
                {user?.is_admin && <div onClick={() => setIsDeleteModalOpen(true)}><TableAction type="delete" /></div>}
            </TableCell>
        </TableRow>

        {/* Delete competency modal */}
        <ConfirmActionDialog
            onContinue={() => deleteCompetency()}
            onCancel={() => setIsDeleteModalOpen(false)}
            isOpen={isDeleteModalOpen}
            description={t("confirmDeleteEntity", { entity: t("competency").toLowerCase() })}
        />
    </>

}
