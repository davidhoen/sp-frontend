"use client"

import { useUser } from "@/providers/UserProvider"
import { GroupType, SkillType, UserWithSkills } from "@/types"
import { useTranslations } from "next-intl"
import { Fragment, useState } from "react"
import { Chip } from "../Chip"
import { ConfirmActionDialog } from "../Modals/ConfirmActionModal"
import UpsertGroupModal from "../Modals/Teacher/UpsertGroupModal"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
import { Link } from "@/i18n/routing"
import { getFullName, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { UserType } from "@/types/auth"
import { MinusIcon } from "lucide-react"
import UserAvatar from "../UserAvatar"

export default function GroupStudentRow({ student, group, mutate }: { student: UserWithSkills, group: GroupType, mutate: () => void }) {
    const t = useTranslations("general")

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const removeFromGroup = async () => {
        try {
            const students = group.students?.filter(std => std.id !== student.id).map(std => std.id)
            const res = axiosInstance.put(`/api/teacher/groups/${group.id}`, {
                ...group,
                skills: group.skills?.map(skill => skill.id),
                teachers: group.teachers?.map(teacher => teacher.id),
                students
            })
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
            <TableCell>
                <div className="flex items-center gap-2">
                    <UserAvatar user={student} />
                    <span className="font-medium">{getFullName(student)}</span>
                </div>
            </TableCell>
            {/* Skills */}
            <TableCell>
                <div className="flex gap-2">
                    {student.skills && student.skills.map(skill => <Link key={skill.id} href={`/teacher/students/${student.id}/skills/${skill.id}`}><Chip key={skill.id}>{skill.title}</Chip></Link>)}
                </div>
            </TableCell>

            {/* Actions */}
            <TableCell className="flex gap-2">
                {/* Remove from group */}
                <div onClick={() => setIsDeleteModalOpen(true)}><TableAction label={t("remove")} icon={MinusIcon} /></div>

                {/* View */}
                <Link href={`/teacher/students/${student.id}`}>
                    <TableAction type="view" />
                </Link>
            </TableCell>
        </TableRow>

        {/* Delete group modal */}
        <ConfirmActionDialog
            onContinue={() => removeFromGroup()}
            onCancel={() => setIsDeleteModalOpen(false)}
            isOpen={isDeleteModalOpen}
            description={t("confirmRemoveFromGroup")}
        />
    </>

}
