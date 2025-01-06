"use client"

import { Link, useRouter } from "@/i18n/routing"
import { getFullName, triggerPromiseToast } from "@/lib"
import axiosInstance from "@/lib/axios"
import { UserType } from "@/types/auth"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { ConfirmActionDialog } from "../Modals/ConfirmActionModal"
import { TableAction } from "../TableActions"
import Select, { OptionType } from "../ui/select"
import { TableCell, TableRow } from "../ui/table"
import UserAvatar from "../UserAvatar"

export default function UserRow({ user, roles, mutate }: { user: UserType, roles: OptionType[], mutate: () => void }) {
    const t = useTranslations("general")
    const { refresh } = useRouter()

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const onChangeRole = async (roleId?: number | string) => {
        try {
            const res = axiosInstance.put(`/api/admin/users/${user.id}`, {
                ...user,
                role_id: roleId
            })
            await triggerPromiseToast(res, t)

            refresh()
            mutate && mutate()
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteUser = async () => {
        try {
            const res = axiosInstance.delete(`/api/admin/users/${user.id}`,)
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
                    <UserAvatar user={user} />
                    <span className="font-medium">{getFullName(user)}</span>
                </div>
            </TableCell>

            {/* Email */}
            <TableCell className="text-muted-foreground">
                {user.email}
            </TableCell>

            {/* Role */}
            <TableCell>
                <Select
                    options={roles}
                    onChange={(selectedOption) => onChangeRole(selectedOption?.value)}
                    defaultValue={roles?.filter(role => role?.value === user.role.id)}
                />
            </TableCell>

            {/* Actions */}
            <TableCell className="flex gap-2">
                {/* View */}
                <Link href={`/teacher/users/${user.id}`}>
                    <TableAction type="view" />
                </Link>
                {/* Delete user */}
                <div onClick={() => setIsDeleteModalOpen(true)}>
                    <TableAction type="delete" />
                </div>
            </TableCell>
        </TableRow>

        {/* Delete user modal */}
        <ConfirmActionDialog
            onContinue={() => deleteUser()}
            onCancel={() => setIsDeleteModalOpen(false)}
            isOpen={isDeleteModalOpen}
            description={t("confirmDeleteEntity", { entity: t("user").toLowerCase() })}
        />
    </>

}
