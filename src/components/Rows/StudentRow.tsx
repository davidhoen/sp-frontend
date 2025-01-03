"use client"

import { useUser } from "@/providers/UserProvider"
import { GroupType, SkillType, UserWithSkills, UserWithSkillsAndGroups } from "@/types"
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

export default function StudentRow({ student, mutate }: { student: UserWithSkillsAndGroups, mutate: () => void }) {
    const t = useTranslations("general")

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
                    {student.skills && student.skills.slice(0, 3).map(skill => <Link key={skill.id} href={`/teacher/students/${student.id}/skills/${skill.id}`}><Chip key={skill.id}>{skill.title}</Chip></Link>)}
                    {(student.skills && student.skills.length > 3) && (
                        <div className="flex items-center h-fit gap-1 bg-border rounded-full text-xs p-1">
                            <span>+{student.skills.length - 1}</span>
                        </div>
                    )}
                </div>
            </TableCell>

            {/* Groups */}
            <TableCell>
                <div className="flex gap-2">
                    {student.groups && student.groups.map(group => <Link key={group.id} href={`/teacher/groups/${group.id}/skills/${group.id}`}><Chip key={group.id}>{group.name}</Chip></Link>)}
                </div>
            </TableCell>

            {/* Actions */}
            <TableCell className="flex gap-2">
                {/* View */}
                <Link href={`/teacher/students/${student.id}`}>
                    <TableAction type="view" />
                </Link>
            </TableCell>
        </TableRow>
    </>

}
