"use client"

import { useUser } from "@/providers/UserProvider"
import { GroupType } from "@/types"
import { useTranslations } from "next-intl"
import { Fragment, useState } from "react"
import { Chip } from "../Chip"
import { ConfirmActionDialog } from "../Modals/ConfirmActionModal"
import UpsertGroupModal from "../Modals/Teacher/UpsertGroupModal"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
import { Link } from "@/i18n/routing"

export default function GroupRow({ group }: { group: GroupType }) {
    const { user } = useUser()
    const t = useTranslations("general")

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const deleteGroup = (groupId: string) => {
        console.log("Delete group with id: ", groupId)
        setIsDeleteModalOpen(false)
    }

    return <>
        <TableRow>
            {/* Name */}
            <TableCell>{group.name}</TableCell>
            {/* Skills */}
            <TableCell>
                <div className="flex gap-2">
                    {group.skills && group.skills?.slice(0, 3).map(skill => <Chip key={skill.id}>{skill.title}</Chip>)}
                    {/* Plus icon when more then one teacher is connected */}
                    {(group.skills && group.skills.length > 3) && (
                        <div className="flex items-center h-fit gap-1 bg-border rounded-full text-xs p-1">
                            <span>+{group.skills.length - 1}</span>
                        </div>
                    )}
                </div>
            </TableCell>
            {/* Number of students */}
            <TableCell>{group.students_count}</TableCell>
            {/* Actions */}
            <TableCell className="flex gap-2">

                {/* Edit */}
                <UpsertGroupModal group={group}>
                    <div><TableAction type="edit" /></div>
                </UpsertGroupModal>

                {/* Delete (for admins) */}
                {!user?.is_admin && <div onClick={() => setIsDeleteModalOpen(true)}><TableAction type="delete" /></div>}

                {/* View */}
                <Link href={`/teacher/groups/${group.id}`}>
                    <TableAction type="view" />
                </Link>
            </TableCell>
        </TableRow>

        {/* Delete group modal */}
        <ConfirmActionDialog
            onContinue={() => deleteGroup(group.id)}
            onCancel={() => setIsDeleteModalOpen(false)}
            isOpen={isDeleteModalOpen}
            description={t("confirmDeleteEntity", { entity: t("group").toLowerCase() })}
        />
    </>

}
