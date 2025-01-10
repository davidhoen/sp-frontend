"use client"

import { Link } from "@/i18n/routing"
import { getFullName } from "@/lib"
import { UserWithSkillsAndGroups } from "@/types"
import { useTranslations } from "next-intl"
import { Chip } from "../Chip"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
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
                    {student.groups && student.groups.slice(0, 3).map(group => <Link key={group.id} href={`/teacher/groups/${group.id}/skills/${group.id}`}><Chip key={group.id}>{group.name}</Chip></Link>)}
                    {(student.groups && student.groups.length > 3) && (
                        <div className="flex items-center h-fit gap-1 bg-border rounded-full text-xs p-1">
                            <span>+{student.groups.length - 1}</span>
                        </div>
                    )}
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
