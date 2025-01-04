"use client"

import { Link } from "@/i18n/routing"
import { triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { useUser } from "@/providers/UserProvider"
import { ProfileWithCompetencies } from "@/types"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Chip } from "../Chip"
import { ConfirmActionDialog } from "../Modals/ConfirmActionModal"
import UpsertProfileModal from "../Modals/Teacher/UpsertProfileModal"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
import ProfileTile from "../ProfileTile"

export default function ProfileRow({ profile, mutate }: { profile: ProfileWithCompetencies, mutate: () => void }) {
    const { user } = useUser()
    const t = useTranslations("general")

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const deleteProfile = async () => {
        try {
            const res = axiosInstance.delete(`/api/educator/profiles/${profile.id}`,)
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
            {/* Title */}
            <TableCell><ProfileTile profile={profile} className="h-11 w-44" /></TableCell>
            {/* Competencies */}
            <TableCell>
                <div className="flex gap-2">
                    {profile.competencies && profile.competencies.map(competency => <Link key={competency.id} href={`/teacher/competencies/${competency.id}`}><Chip>{competency.title}</Chip></Link>)}
                </div>
            </TableCell>

            {/* Actions */}
            <TableCell className="flex gap-2">

                {/* Edit */}
                <UpsertProfileModal profile={profile} mutate={mutate}>
                    <div><TableAction type="edit" /></div>
                </UpsertProfileModal>

                {/* Delete (for admins) */}
                {user?.is_admin && <div onClick={() => setIsDeleteModalOpen(true)}><TableAction type="delete" /></div>}
            </TableCell>
        </TableRow>

        {/* Delete profile modal */}
        <ConfirmActionDialog
            onContinue={() => deleteProfile()}
            onCancel={() => setIsDeleteModalOpen(false)}
            isOpen={isDeleteModalOpen}
            description={t("confirmDeleteEntity", { entity: t("profile").toLowerCase() })}
        />
    </>

}
