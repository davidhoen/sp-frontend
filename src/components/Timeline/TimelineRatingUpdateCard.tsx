import { getFullName, getStarTitles, getYouOrFullName } from "@/lib";
import { useUser } from "@/providers/UserProvider";
import { EndorsementType, FeedbackType, RatingHistoryType } from "@/types";
import { useFormatter, useTranslations } from "next-intl";
import UserAvatar from "../UserAvatar";
import StarRating from "../StarRating";
import { UserType } from "@/types/auth";

export function TimelineRatingUpdateCard({ ratingUpdate, user }: { ratingUpdate: RatingHistoryType, user: UserType }) {
    const { user: currentUser } = useUser()
    const t = useTranslations("general")

    return (
        <div className="border rounded-lg p-4">
            <span className="font-sans font-bold text">{t("userUpdatedRating", { name: getYouOrFullName(user, t, currentUser) })} </span>
            <StarRating rating={ratingUpdate.rating} showRatingTitle />
        </div>
    )
}
