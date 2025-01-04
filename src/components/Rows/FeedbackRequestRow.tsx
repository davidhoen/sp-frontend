"use client"

import { getFullName } from "@/lib"
import { RequestType } from "@/types"
import { useFormatter, useTranslations } from "next-intl"
import { Chip } from "../Chip"
import AddFeedbackModal from "../Modals/AddFeedbackModal"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
import UserAvatar from "../UserAvatar"

export default function FeedbackRequestRow({ request, mutate }: { request: RequestType, mutate: () => void }) {
    const t = useTranslations("general")
    const format = useFormatter()

    return <>
        <TableRow>
            {/* Name */}
            <TableCell>
                <div className="flex items-center gap-2">
                    <UserAvatar user={request.requester} />
                    <div className="flex flex-col">
                        <span className="font-medium">{getFullName(request.requester)}</span>
                        <span className="text-muted-foreground">{format.dateTime(new Date(request.created_at), { dateStyle: "medium" })}</span>
                    </div>
                </div>
            </TableCell>

            {/* Group */}
            <TableCell>
                {request.group.name}
            </TableCell>

            {/* Skill */}
            <TableCell>
                <Chip>{request.skill.title}</Chip>
            </TableCell>

            {/* Event */}
            <TableCell>
                {request.title}
            </TableCell>

            {/* Actions */}
            <TableCell className="flex gap-2">
                {/* Reply to request */}
                <AddFeedbackModal request={request}>
                    <div><TableAction type="reply" /></div>
                </AddFeedbackModal>
            </TableCell>
        </TableRow>
    </>

}
