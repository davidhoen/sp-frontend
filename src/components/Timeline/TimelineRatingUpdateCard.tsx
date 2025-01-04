import { getYouOrFullName } from "@/lib";
import { useUser } from "@/providers/UserProvider";
import { RatingType } from "@/types";
import { UserType } from "@/types/auth";
import { useTranslations } from "next-intl";
import StarRating from "../StarRating";

export function TimelineRatingUpdateCard({ ratingUpdate, user }: { ratingUpdate: RatingType, user: UserType }) {
    const { user: currentUser } = useUser()
    const t = useTranslations("general")

    return (
        <div className="border rounded-lg p-4">
            <span className="font-sans font-bold text">{t("userUpdatedRating", { name: getYouOrFullName(user, t, currentUser) })} </span>
            <StarRating rating={ratingUpdate.rating} showRatingTitle approved={false} />
        </div>
    )
}
