"use client"

import { getFullName, getMostRecentRating } from "@/lib"
import { RequestType } from "@/types"
import { useFormatter, useTranslations } from "next-intl"
import { Chip } from "../Chip"
import AddEndorsementModal from "../Modals/Teacher/AddEndorsementModal"
import ReviewEndorsementModal from "../Modals/Teacher/ReviewEndorsementModal"
import StarRating from "../StarRating"
import { TableAction } from "../TableActions"
import { TableCell, TableRow } from "../ui/table"
import UserAvatar from "../UserAvatar"

export default function EndorsementRequestRow({ request, mutate }: { request: RequestType, mutate: () => void }) {
    const format = useFormatter()

    const rating = request.requestee?.rating || getMostRecentRating(request.skill.ratings)

    return <>
        <TableRow>
            {/* Name */}
            <TableCell>
                <div className="flex items-center gap-2">
                    <UserAvatar user={request.requester} />
                    <div className="flex flex-col">
                        <span className="font-medium">{getFullName(request.requester)}</span>
                        <span className="text-muted-foreground">{request.created_at && format.dateTime(new Date(request.created_at), { dateStyle: "medium" })}</span>
                    </div>
                </div>
            </TableCell>

            {/* Email */}
            <TableCell className="text-muted-foreground">
                {request.requestee?.email || request.requester.email}
            </TableCell>

            {/* Skill */}
            <TableCell>
                <Chip>{request.skill.title}</Chip>
            </TableCell>

            {/* Event */}
            <TableCell>
                {request.title}
            </TableCell>

            {/* Rating */}
            <TableCell>
                {rating && <StarRating rating={rating} approved={request.requestee?.rating ? true : false} />}
            </TableCell>

            {/* Actions */}
            <TableCell className="flex gap-2">
                {/* Requests without requestees are internal, teacher writes the endorsment */}
                {request.requestee ?
                    <ReviewEndorsementModal request={request}>
                        <div><TableAction type="review" /></div>
                    </ReviewEndorsementModal>
                    :
                    <AddEndorsementModal request={request}>
                        <div><TableAction type="reply" /></div>
                    </AddEndorsementModal>
                }
            </TableCell>
        </TableRow >
    </>

}
