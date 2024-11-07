import { getFullName, getStarTitles, getYouOrFullName } from "@/lib";
import { useUser } from "@/providers/UserProvider";
import { EndorsementType, FeedbackType, RatingUpdateType } from "@/types";
import { useFormatter, useTranslations } from "next-intl";
import UserAvatar from "../UserAvatar";
import StarRating from "../StarRating";

export function TimelineRatingUpdateCard({ ratingUpdate }: { ratingUpdate: RatingUpdateType }) {
    const { user } = useUser()
    const t = useTranslations("general")

    return (
        <div className="border rounded-lg p-4">
            <span className="font-sans font-bold text">{t("userUpdatedRating", { name: getYouOrFullName(ratingUpdate.user, t, user) })} </span>
            <StarRating rating={ratingUpdate.rating} showRatingTitle />
        </div>
    )
}
