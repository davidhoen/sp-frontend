"use client"

import { getFullName, getMostRecentRating, isNewestRatingApproved } from "@/lib";
import { RequestType } from "@/types";
import { GroupIcon, LightbulbIcon, StarIcon, UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Chip } from "./Chip";
import StarRating from "./StarRating";

export const RequestDetails = ({ request }: { request: RequestType }) => {
    const t = useTranslations("general");

    return (
        <div className="flex gap-6 grid-cols-2">
            <div className="font-medium">
                <div className="flex gap-2"><UserIcon size={16} />{t('student')}:</div>
                {request.group && <div className="flex gap-2"><GroupIcon size={16} />{t('group')}:</div>}
                <div className="flex gap-2"><StarIcon size={16} />{t('skill')}:</div>
                <div className="flex gap-2"><LightbulbIcon size={16} />{t('event')}:</div>
            </div>
            <div>
                <div className="flex">{getFullName(request.requester)}</div>
                {request.group && <div>{request.group.name}</div>}
                <div className="flex gap-2">
                    <Chip>{request.skill.title}</Chip>
                    <StarRating rating={getMostRecentRating(request.skill.ratings)} approved={isNewestRatingApproved(request.skill.ratings)} />
                </div>
                <div>{request.title}</div>
            </div>
        </div>
    );
};